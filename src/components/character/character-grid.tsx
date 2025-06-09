"use client"

import { CharacterCard } from "./character-card"
import { Pagination } from "@/components/ui/pagination"
import type { Character } from "@/types/character"
import type { Filters } from "@/types/filters"

interface CharacterGridProps {
  characters: Character[]
  loading: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onCharacterClick: (character: Character) => void
  filters: Filters
}

export function CharacterGrid({
  characters,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onCharacterClick,
  filters,
}: CharacterGridProps) {
  const hasActiveFilters = filters.status || filters.species || filters.gender || filters.searchTerm

  if (loading && characters.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 pt-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-slate-600 border-t-emerald-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-emerald-300 rounded-full animate-spin animation-delay-150"></div>
        </div>
        <p className="text-slate-400 mt-6 text-lg">Loading characters from the multiverse...</p>
        <p className="text-slate-500 mt-2">Please wait while we fetch the data</p>
      </div>
    )
  }

  if (characters.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 pt-20">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-800 flex items-center justify-center">
            <svg className="w-12 h-12 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
              />
            </svg>
          </div>
          <p className="text-xl text-slate-300 mb-2">No characters found</p>
          {hasActiveFilters ? (
            <p className="text-slate-500">Try adjusting your filters or search terms</p>
          ) : (
            <p className="text-slate-500">Something went wrong loading characters</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} onClick={() => onCharacterClick(character)} />
        ))}
      </div>

      <div className="flex flex-col items-center space-y-4 pt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
        
        <div className="text-center text-gray-500 text-sm">
          Showing {characters.length} characters on page {currentPage} of {totalPages}
          {hasActiveFilters && " with current filters"}
        </div>
      </div>
    </div>
  )
}
