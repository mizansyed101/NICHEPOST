export interface NewsItem {
  title: string
  description: string
  url: string
  source: string
}

export async function fetchTrendingNews(niche: string): Promise<NewsItem[]> {
  const apiKey = process.env.NEWS_API_KEY
  
  if (!apiKey) {
    console.warn('NEWS_API_KEY is missing. Falling back to mock news.')
    return [
      {
        title: `Latest breakthroughs in ${niche}`,
        description: `Significant advancements have been reported in the ${niche} sector today, marking a shift in industry standards.`,
        url: '#',
        source: 'NicheDaily'
      },
      {
        title: `How ${niche} is reshaping the future`,
        description: `Experts discuss the long-term impact of current ${niche} trends on the global economy.`,
        url: '#',
        source: 'TechPulse'
      }
    ]
  }

  try {
    // Using NewsAPI.org as an example
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(niche)}&sortBy=publishedAt&pageSize=3&apiKey=${apiKey}`
    )
    const data = await response.json()
    
    if (data.status === 'ok') {
      return data.articles.map((a: any) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        source: a.source.name
      }))
    }
  } catch (error) {
    console.error('Failed to fetch news:', error)
  }

  return []
}
