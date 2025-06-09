"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import type { Character } from "@/types/character"
import "./character-card.css"

interface CharacterCardProps {
  character: Character
  onClick: () => void
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Alive":
        return "bg-green-500"
      case "Dead":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Alive":
        return "default" as const
      case "Dead":
        return "destructive" as const
      default:
        return "secondary" as const
    }
  }

  return (
    <Card
      className="character-card bg-slate-800 border-slate-700 hover:border-emerald-400 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden">
        <Image
          src={character.image || "/placeholder.svg"}
          alt={character.name}
          width={300}
          height={300}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
          crossOrigin="anonymous"
        />
        <div className="absolute top-2 right-2">
          <Badge variant={getStatusBadgeVariant(character.status)} className="text-xs">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(character.status)} mr-1`} />
            {character.status}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 text-white group-hover:text-emerald-400 transition-colors duration-300 truncate">
          {character.name}
        </h3>
        <div className="space-y-1 text-sm text-slate-400">
          <p className="truncate">
            <span className="text-slate-500">Species:</span> {character.species}
          </p>
          <p className="truncate">
            <span className="text-slate-500">Origin:</span> {character.origin.name}
          </p>
          <p className="truncate">
            <span className="text-slate-500">Episodes:</span> {character.episode.length}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
