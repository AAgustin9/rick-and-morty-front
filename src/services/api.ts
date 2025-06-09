import type { ApiResponse } from "@/types/character"
import type { Filters } from "@/types/filters"

const BASE_URL = "https://rickandmortyapi.com/api"

export const characterService = {
  async getCharacters(page: number, filters: Filters): Promise<ApiResponse> {
    const params = new URLSearchParams()
    params.append("page", page.toString())

    if (filters.status) params.append("status", filters.status)
    if (filters.species) params.append("species", filters.species)
    if (filters.gender) params.append("gender", filters.gender)
    if (filters.searchTerm) params.append("name", filters.searchTerm)

    const response = await fetch(`${BASE_URL}/character?${params}`)

    if (!response.ok) {
      if (response.status === 404) {
        return {
          info: {
            count: 0,
            pages: 0,
            next: null,
            prev: null,
          },
          results: [],
        }
      }
      throw new Error("Failed to fetch characters")
    }

    return response.json()
  },
}
