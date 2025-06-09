"use client"

import { Search, Filter, X, Keyboard } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { STATUS_OPTIONS, SPECIES_OPTIONS, GENDER_OPTIONS } from "@/utils/constants"
import type { Filters } from "@/types/filters"

interface AppSidebarProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  onClearFilters: () => void
}

export function AppSidebar({ filters, onFilterChange, onClearFilters }: AppSidebarProps) {
  const hasActiveFilters = filters.status || filters.species || filters.gender || filters.searchTerm
  const { toggleSidebar, isMobile } = useSidebar()

  return (
    <Sidebar className="border-r border-gray-800 bg-slate-900">
      <SidebarHeader className="p-4 border-b border-gray-800 bg-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFilters}
                className="bg-white text-slate-800 hover:bg-slate-100 hover:text-slate-900 border-white text-xs px-3 py-1 h-auto"
              >
                Clear
              </Button>
            )}
            {!isMobile && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleSidebar}
                      className="h-8 w-8 text-slate-400 hover:text-white hover:bg-slate-700"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="bg-slate-800 text-white border-slate-600">
                    <p>Close Sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4 bg-slate-900">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-3">Search</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search characters..."
                value={filters.searchTerm}
                onChange={(e) => onFilterChange({ searchTerm: e.target.value })}
                className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400"
              />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-3">Status</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) => onFilterChange({ status: value === "all" ? "" : value })}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-3">Species</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={filters.species || "all"}
              onValueChange={(value) => onFilterChange({ species: value === "all" ? "" : value })}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {SPECIES_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300 mb-3">Gender</SidebarGroupLabel>
          <SidebarGroupContent>
            <Select
              value={filters.gender || "all"}
              onValueChange={(value) => onFilterChange({ gender: value === "all" ? "" : value })}
            >
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-800 bg-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Keyboard className="h-3 w-3" />
          <span>Press Ctrl/⌘ + B to toggle</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
