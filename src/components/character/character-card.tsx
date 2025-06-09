"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { getStatusColor, getStatusBadgeVariant } from "@/utils/character"
import type { Character } from "@/types/character"
import "./character-card.css"

interface CharacterCardProps {
  character: Character
  onClick: () => void
}

export function CharacterCard({ character, onClick }: CharacterCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card
      className="character-card bg-slate-800 border-slate-700 hover:border-emerald-400 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-t-lg">
        {!imageError ? (
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 bg-slate-700 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-slate-600 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <p className="text-slate-400 text-xs">{character.name}</p>
            </div>
          </div>
        )}
        <div className="absolute top-2 right-2">
          <Badge variant={getStatusBadgeVariant(character.status)} className="text-xs hover:bg-current pointer-events-none">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(character.status)} mr-1`} />
            {character.status}
          </Badge>
        </div>
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
