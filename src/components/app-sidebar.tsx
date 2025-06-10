"use client"

import { Search, Filter } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Filters } from "@/types/filters"

interface AppSidebarProps {
  filters: Filters
  onFilterChange: (filters: Partial<Filters>) => void
  onClearFilters: () => void
}

const statusOptions = [
  { value: "all", label: "All Status" },
  { value: "alive", label: "Alive" },
  { value: "dead", label: "Dead" },
  { value: "unknown", label: "Unknown" },
]

const speciesOptions = [
  { value: "all", label: "All Species" },
  { value: "human", label: "Human" },
  { value: "alien", label: "Alien" },
  { value: "humanoid", label: "Humanoid" },
  { value: "robot", label: "Robot" },
  { value: "cronenberg", label: "Cronenberg" },
  { value: "disease", label: "Disease" },
  { value: "animal", label: "Animal" },
]

const genderOptions = [
  { value: "all", label: "All Genders" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "genderless", label: "Genderless" },
  { value: "unknown", label: "Unknown" },
]

export function AppSidebar({ filters, onFilterChange, onClearFilters }: AppSidebarProps) {
  const hasActiveFilters = filters.status || filters.species || filters.gender || filters.searchTerm

  return (
    <Sidebar className="border-r border-gray-800">
      <SidebarHeader className="p-4 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">Filters</h2>
          </div>
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
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
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
                {statusOptions.map((option) => (
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
                {speciesOptions.map((option) => (
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
                {genderOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} className="text-white hover:bg-slate-700">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
