import { NextResponse } from 'next/server'
import { generatePlatformPost } from '@/lib/groq'
import { getRandomNiche } from '@/lib/utils'
import { fetchTrendingNews } from '@/lib/news'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.email) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const email = session.user.email
  const isAdmin = email === 'temporaryox123@gmail.com'

  try {
    const body = await req.json().catch(() => ({}))
    const { lastNiche } = body
    
    // 0. FETCH USER SETTINGS FROM DB
    const { data: userData } = await supabaseAdmin
      .from('user_settings')
      .select('*')
      .eq('email', email)
      .single()

    const { data: profileData } = await supabaseAdmin
      .from('profiles')
      .select('credits, plan')
      .eq('email', email)
      .single()

    const settings = {
      niches: userData?.niches || ['AI SaaS & Solopreneurship'],
      brand_url: userData?.brand_url || 'https://nichepost.ai',
      tone: userData?.tone || 'Professional',
      credits: profileData?.credits || 0,
      plan: profileData?.plan || 'FREE',
    }
    
    // 1. CREDIT CHECK (Except for Admin)
    if (!isAdmin && settings.credits <= 0) {
      return NextResponse.json({ 
        success: false, 
        error: 'OUT_OF_CREDITS',
        message: 'You have exhausted your AI generation credits. Please upgrade your plan.'
      }, { status: 402 })
    }
    
    // 2. Pick a random niche
    const selectedNiche = getRandomNiche(settings.niches, lastNiche)
    
    // 3. Fetch trending news
    let news: any[] = []
    try {
      news = await fetchTrendingNews(selectedNiche)
    } catch (e) {
      console.error('News fetch failed:', e)
    }
    
    const newsSummary = news.length > 0 
      ? news.map(n => `- ${n.title}: ${n.description}`).join('\n')
      : ''

    // 4. Generate posts for multiple platforms
    const platforms = ['twitter', 'linkedin', 'reddit', 'threads'] as const
    const posts = await Promise.all(
      platforms.map(async (platform) => {
        try {
          const content = await generatePlatformPost({
            niche: selectedNiche,
            tone: settings.tone,
            platform: platform,
            newsContext: newsSummary,
            brandUrl: settings.brand_url,
          })
          return { platform, content, success: true }
        } catch (error: any) {
          return { 
            platform, 
            content: `Failed to generate ${platform} content.`, 
            success: false
          }
        }
      })
    )

    // 5. DECREMENT CREDITS (Except for Admin)
    if (!isAdmin && profileData) {
      await supabaseAdmin
        .from('profiles')
        .update({ credits: profileData.credits - 1 })
        .eq('email', email)
    }

    return NextResponse.json({ 
      success: true, 
      niche: selectedNiche,
      creditsRemaining: isAdmin ? 9999 : settings.credits - 1,
      newsSummary: news.length > 0 ? news[0].title : null,
      posts 
    })
  } catch (error: any) {
    console.error('Global Generation API error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to generate posts' 
    }, { status: 500 })
  }
}
