"use client"

import { useState } from "react"
import type { Filters } from "@/types/filters"

export function useFilters() {
  const [filters, setFilters] = useState<Filters>({
    status: "",
    species: "",
    gender: "",
    searchTerm: "",
  })

  const handleFilterChange = (newFilters: Partial<Filters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  const clearFilters = () => {
    setFilters({
      status: "",
      species: "",
      gender: "",
      searchTerm: "",
    })
  }

  return {
    filters,
    handleFilterChange,
    clearFilters,
  }
}
