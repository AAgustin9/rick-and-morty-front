"use client"

import { useState, useEffect } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { CharacterGrid } from "@/components/character/character-grid"
import { CharacterList } from "@/components/character/character-list"
import { CharacterModal } from "@/components/character/character-modal"
import { Header } from "@/components/layout/header"
import { ViewSwitcher, type ViewMode } from "@/components/character/view-switcher"
import { SidebarInset } from "@/components/ui/sidebar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useCharacters } from "@/hooks/use-characters"
import { useFilters } from "@/hooks/use-filters"
import type { Character } from "@/types/character"

export default function RickMortyExplorer() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null)
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const { filters, handleFilterChange, clearFilters } = useFilters()
  const { characters, loading, currentPage, totalPages, goToPage } = useCharacters(filters)

  // Persist view mode preference in localStorage
  useEffect(() => {
    const savedViewMode = localStorage.getItem("rickMortyViewMode") as ViewMode
    if (savedViewMode && (savedViewMode === "grid" || savedViewMode === "list")) {
      setViewMode(savedViewMode)
    }
  }, [])

  const handleViewChange = (newViewMode: ViewMode) => {
    setViewMode(newViewMode)
    localStorage.setItem("rickMortyViewMode", newViewMode)
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat relative"
      style={{
        backgroundImage: "url('/rick-bg.jpg')"
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-slate-900/70 z-0"></div>
      
      <div className="relative z-10">
        <SidebarProvider defaultOpen={false}>
          <AppSidebar filters={filters} onFilterChange={handleFilterChange} onClearFilters={clearFilters} />
          <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 border-b border-slate-700 bg-slate-800">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <SidebarTrigger className="text-white hover:bg-slate-700 hover:text-emerald-400 transition-all duration-200 border border-slate-600 hover:border-emerald-400 flex-shrink-0 p-3 w-12 h-12 [&>svg]:size-6" />
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-slate-800 text-white border-slate-600">
                      <p>Toggle Sidebar (Ctrl/⌘ + B)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Header 
                  searchTerm={filters.searchTerm}
                  onSearchChange={(value) => handleFilterChange({ searchTerm: value })}
                />
              </div>
              <div className="flex-shrink-0">
                <ViewSwitcher view={viewMode} onViewChange={handleViewChange} />
              </div>
            </div>

            <main className="flex-1 p-4 md:p-6 bg-transparent">
              {viewMode === "grid" ? (
                <CharacterGrid
                  characters={characters}
                  loading={loading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onCharacterClick={setSelectedCharacter}
                  filters={filters}
                />
              ) : (
                <CharacterList
                  characters={characters}
                  loading={loading}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={goToPage}
                  onCharacterClick={setSelectedCharacter}
                  filters={filters}
                />
              )}
            </main>
          </div>
        </SidebarInset>


        <CharacterModal
          character={selectedCharacter}
          isOpen={!!selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      </SidebarProvider>
      </div>
    </div>
  )
}
