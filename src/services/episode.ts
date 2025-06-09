import type { Episode } from "@/types/episode"

const BASE_URL = "https://rickandmortyapi.com/api"

export const episodeService = {
  async getEpisodesByUrls(episodeUrls: string[]): Promise<Episode[]> {
    if (episodeUrls.length === 0) return []

    // Extract episode IDs from URLs
    const episodeIds = episodeUrls.map(url => {
      const parts = url.split('/')
      return parts[parts.length - 1]
    })

    try {
      // Fetch multiple episodes at once using comma-separated IDs
      const response = await fetch(`${BASE_URL}/episode/${episodeIds.join(',')}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch episodes")
      }

      const data = await response.json()
      
      // If single episode, wrap in array
      return Array.isArray(data) ? data : [data]
    } catch (error) {
      console.error("Error fetching episodes:", error)
      return []
    }
  },

  async getEpisode(id: number): Promise<Episode | null> {
    try {
      const response = await fetch(`${BASE_URL}/episode/${id}`)
      
      if (!response.ok) {
        throw new Error("Failed to fetch episode")
      }

      return response.json()
    } catch (error) {
      console.error("Error fetching episode:", error)
      return null
    }
  }
} 