export const getShareLink = (platform: string, content: string) => {
  const encodedContent = encodeURIComponent(content)
  
  const links: Record<string, string> = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedContent}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL || '')}&summary=${encodedContent}`,
    reddit: `https://www.reddit.com/submit?title=${encodedContent}`,
    telegram: `https://t.me/share/url?text=${encodedContent}&url=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL || '')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodedContent}&u=${encodeURIComponent(process.env.NEXT_PUBLIC_APP_URL || '')}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedContent}`,
    threads: `https://www.threads.net/intent/post?text=${encodedContent}`,
  }

  return links[platform.toLowerCase()] || ''
}

export const postToAll = (posts: Record<string, string>) => {
  Object.entries(posts).forEach(([platform, content]) => {
    const url = getShareLink(platform, content)
    if (url) {
      window.open(url, '_blank')
    }
  })
}
