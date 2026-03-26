import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export type Platform = 'twitter' | 'linkedin' | 'reddit' | 'telegram' | 'facebook' | 'whatsapp' | 'threads'

interface GeneratePostParams {
  niche: string
  subNiche?: string
  tone: string
  platform: Platform
  newsContext?: string
  brandUrl?: string
  postNumber?: number
  totalPerDay?: number
}

export const generatePlatformPost = async ({
  niche,
  subNiche,
  tone,
  platform,
  newsContext,
  brandUrl,
  postNumber = 1,
  totalPerDay = 1,
}: GeneratePostParams) => {
  const platformRules = {
    twitter: "Max 280 chars. Punchy hook. 2-3 hashtags. End with CTA.",
    linkedin: "3 short paragraphs. Professional insight. No hashtag spam. End with a question.",
    reddit: "Conversational. No marketing speak. Helpful angle. Community-aware.",
    telegram: "Casual tone. Use 2-3 emojis. Short paragraphs. Shareable.",
    facebook: "Friendly. Story-driven. Shareable. 1-2 hashtags.",
    whatsapp: "Personal tone. Very short. Direct value. No hashtags.",
    threads: "Max 500 chars. Conversational and friendly. Use 1-2 relevant hashtags. Focus on engagement.",
  }

  const prompt = `
    You are a social media expert for the "${niche}"${subNiche ? ` and sub-niche "${subNiche}"` : ''}.
    Tone: ${tone}
    Platform: ${platform}
    Rules: ${platformRules[platform]}
    
    ${brandUrl ? `BRAND WEBSITE: ${brandUrl}\n` : ''}
    ${newsContext ? `CURRENT TRENDING NEWS:\n${newsContext}\n` : ''}
    
    STRATEGY: 
    - If news is provided, decide if it's better to:
        A) Create a pure News-jacking post (Authority/Timely).
        B) Create a product-focused post (Marketing).
        C) Create a HYBRID post that connects the news to the brand/niche value proposition.
    - If no news is provided, focus on high-value Niche marketing ${brandUrl ? `using the Brand Website: ${brandUrl}` : ''}.

    Format:
    - ${platformRules[platform]}
    - Return ONLY the post text. Start with a [TYPE] tag (e.g., [NEWS], [MARKETING], or [HYBRID]).
  `

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    })

    return chatCompletion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('Error generating post:', error)
    throw error
  }
}
