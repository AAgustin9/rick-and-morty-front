"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Image from "next/image"
import { getStatusColor, getStatusBadgeVariant } from "@/utils/character"
import type { Character } from "@/types/character"
import "./character-list-item.css"

interface CharacterListItemProps {
  character: Character
  onClick: () => void
}

export function CharacterListItem({ character, onClick }: CharacterListItemProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card
      className="character-list-item bg-slate-800 border-slate-700 hover:border-emerald-400 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          {/* Image Section */}
          <div className="relative flex-shrink-0 w-full sm:w-32 md:w-40 lg:w-48">
            {!imageError ? (
              <Image
                src={character.image}
                alt={character.name}
                width={800}
                height={600}
                className="w-full h-32 sm:h-full sm:min-h-32 object-cover transition-transform duration-300 group-hover:scale-105 rounded-l-lg"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-32 sm:h-full sm:min-h-32 bg-slate-700 flex items-center justify-center rounded-l-lg">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-slate-600 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

          {/* Content Section */}
          <div className="flex-1 p-4 sm:p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <h3 className="font-bold text-xl text-white group-hover:text-emerald-400 transition-colors duration-300">
                {character.name}
              </h3>
              <div className="text-sm text-slate-500">
                ID: {character.id}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-slate-500 font-medium">Species</p>
                <p className="text-slate-300">{character.species}</p>
              </div>
              
              <div className="space-y-1">
                <p className="text-slate-500 font-medium">Gender</p>
                <p className="text-slate-300">{character.gender}</p>
              </div>

              <div className="space-y-1">
                <p className="text-slate-500 font-medium">Episodes</p>
                <p className="text-slate-300">{character.episode.length}</p>
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-1">
                <p className="text-slate-500 font-medium">Origin</p>
                <p className="text-slate-300 truncate">{character.origin.name}</p>
              </div>

              <div className="space-y-1 sm:col-span-2 lg:col-span-2">
                <p className="text-slate-500 font-medium">Last known location</p>
                <p className="text-slate-300 truncate">{character.location.name}</p>
              </div>
            </div>

            {character.type && (
              <div className="text-sm">
                <p className="text-slate-500 font-medium">Type</p>
                <p className="text-slate-300">{character.type}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 