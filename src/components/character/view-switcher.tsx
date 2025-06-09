"use client"

import { Button } from "@/components/ui/button"
import { Grid3X3, List } from "lucide-react"
import { cn } from "@/lib/utils"

export type ViewMode = "grid" | "list"

interface ViewSwitcherProps {
  view: ViewMode
  onViewChange: (view: ViewMode) => void
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-slate-400 text-sm font-medium hidden md:inline">View:</span>
      <div className="flex bg-slate-800 border border-slate-600 rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("grid")}
          className={cn(
            "text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200 h-8 px-2 md:px-3",
            view === "grid" && "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
          )}
          aria-label="Grid view"
        >
          <Grid3X3 className="h-4 w-4" />
          <span className="ml-1 hidden md:inline">Grid</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewChange("list")}
          className={cn(
            "text-slate-400 hover:text-white hover:bg-slate-700 transition-all duration-200 h-8 px-2 md:px-3",
            view === "list" && "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
          )}
          aria-label="List view"
        >
          <List className="h-4 w-4" />
          <span className="ml-1 hidden md:inline">List</span>
        </Button>
      </div>
    </div>
  )
} 