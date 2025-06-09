"use client"

import { useState, useEffect } from "react"
import { characterService } from "@/services/api"
import type { Character } from "@/types/character"
import type { Filters } from "@/types/filters"

export function useCharacters(filters: Filters) {
  const [characters, setCharacters] = useState<Character[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    fetchCharacters(1, true)
  }, [filters])

  const fetchCharacters = async (page: number, reset = false) => {
    try {
      setLoading(true)

      const data = await characterService.getCharacters(page, filters)

      if (reset || page === 1) {
        setCharacters(data.results)
        setCurrentPage(1)
      } else {
        setCharacters((prev) => [...prev, ...data.results])
      }

      setTotalPages(data.info.pages)
    } catch (error) {
      console.error("Error fetching characters:", error)
      setCharacters([])
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      fetchCharacters(nextPage, false)
    }
  }

  return {
    characters,
    loading,
    currentPage,
    totalPages,
    loadMore,
  }
}
