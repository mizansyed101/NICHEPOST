/**
 * Picks a random niche from the array.
 * Ensures uniqueness by checking against the last used niche if provided.
 */
export function getRandomNiche(niches: string[], lastNiche?: string): string {
  if (!niches || niches.length === 0) return 'General'
  if (niches.length === 1) return niches[0]
  
  let available = niches
  if (lastNiche) {
    available = niches.filter(n => n !== lastNiche)
    if (available.length === 0) available = niches // Fallback if all are filtered
  }
  
  return available[Math.floor(Math.random() * available.length)]
}
