import { NextResponse } from 'next/server'
import { generatePlatformPost } from '@/lib/groq'
import { getRandomNiche } from '@/lib/utils'
import { fetchTrendingNews } from '@/lib/news'

// In a real app, you'd fetch user settings from Supabase here
const mockUserSettings = {
  niches: ['AI SaaS & Solopreneurship', 'Web3 Security', 'Sustainable Living', 'Legal Tech'],
  brand_url: 'https://nichepost.ai',
  tone: 'Professional',
  credits: 5,
  plan: 'FREE',
  time_slots: ['09:00 AM', '02:00 PM'],
}

export async function POST(req: Request) {
  console.log('--- Generation Request Start ---')
  try {
    const body = await req.json().catch(() => ({}))
    const { lastNiche } = body
    
    // 0. CREDIT CHECK
    if (mockUserSettings.credits <= 0) {
      console.warn('User out of credits')
      return NextResponse.json({ 
        success: false, 
        error: 'OUT_OF_CREDITS',
        message: 'You have exhausted your AI generation credits. Please upgrade your plan.'
      }, { status: 402 })
    }
    
    // 1. Pick a random niche
    const selectedNiche = getRandomNiche(mockUserSettings.niches, lastNiche)
    console.log('Selected Niche:', selectedNiche)
    
    // 2. Fetch trending news
    console.log('Fetching news for:', selectedNiche)
    let news: any[] = []
    try {
      news = await fetchTrendingNews(selectedNiche)
    } catch (e) {
      console.error('News fetch failed:', e)
    }
    
    const newsSummary = news.length > 0 
      ? news.map(n => `- ${n.title}: ${n.description}`).join('\n')
      : ''
    
    console.log('News Summary Length:', newsSummary.length)

    // 3. Generate posts for multiple platforms
    const platforms = ['twitter', 'linkedin', 'reddit', 'threads'] as const
    const posts = await Promise.all(
      platforms.map(async (platform) => {
        try {
          console.log(`Generating for platform: ${platform}`)
          const content = await generatePlatformPost({
            niche: selectedNiche,
            tone: mockUserSettings.tone,
            platform: platform,
            newsContext: newsSummary,
            brandUrl: mockUserSettings.brand_url,
          })
          return { platform, content, success: true }
        } catch (error: any) {
          console.error(`Generation failed for ${platform}:`, error.message)
          return { 
            platform, 
            content: `Failed to generate ${platform} content. Please try again.`, 
            success: false,
            error: error.message 
          }
        }
      })
    )

    // 4. DECREMENT CREDITS (In a real app, update DB)
    mockUserSettings.credits -= 1
    console.log('Credits remaining:', mockUserSettings.credits)

    console.log('--- Generation Request Complete ---')
    return NextResponse.json({ 
      success: true, 
      niche: selectedNiche,
      creditsRemaining: mockUserSettings.credits,
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
