import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  searchTerm?: string
  onSearchChange?: (value: string) => void
}

export function Header({ searchTerm = "", onSearchChange }: HeaderProps) {
  return (
    <div className="flex-1 flex items-center gap-4 min-w-0">
      <div className="flex-shrink-0">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-1">Rick & Morty Explorer</h1>
        <p className="text-gray-400 text-xs md:text-sm">Explore the multiverse</p>
      </div>
      
      {onSearchChange && (
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search characters..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-600 text-white placeholder-slate-400 focus:border-emerald-400 w-full"
            />
          </div>
        </div>
      )}
    </div>
  )
}
