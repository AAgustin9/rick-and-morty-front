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
    setCurrentPage(1)
    fetchCharacters(1)
  }, [filters])

  const fetchCharacters = async (page: number) => {
    try {
      setLoading(true)

      const data = await characterService.getCharacters(page, filters)

      setCharacters(data.results)
      setCurrentPage(page)
      setTotalPages(data.info.pages)
    } catch (error) {
      console.error("Error fetching characters:", error)
      setCharacters([])
      setTotalPages(0)
    } finally {
      setLoading(false)
    }
  }

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      fetchCharacters(page)
    }
  }

  return {
    characters,
    loading,
    currentPage,
    totalPages,
    goToPage,
  }
}
