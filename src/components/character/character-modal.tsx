"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Tv } from "lucide-react"
import Image from "next/image"
import { getStatusColor, getStatusBadgeVariant, formatDate } from "@/utils/character"
import { EpisodesModal } from "./episodes-modal"
import type { Character } from "@/types/character"
import "./character-modal.css"

interface CharacterModalProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  const [episodesModalOpen, setEpisodesModalOpen] = useState(false)

  if (!character) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="character-modal bg-slate-800 border-slate-600 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-400">{character.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={character.image || "/placeholder.svg"}
                alt={character.name}
                width={400}
                height={400}
                className="w-full rounded-lg object-cover"
                crossOrigin="anonymous"
              />
              <div className="absolute top-3 right-3">
                <Badge variant={getStatusBadgeVariant(character.status)} className="text-sm">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(character.status)} mr-2`} />
                  {character.status}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Basic Information</h3>
                <div className="space-y-2 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Species:</span>
                    <span>{character.species}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gender:</span>
                    <span>{character.gender}</span>
                  </div>
                  {character.type && (
                    <div className="flex justify-between">
                      <span className="text-slate-500">Type:</span>
                      <span>{character.type}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="bg-slate-600" />

              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Locations
                </h3>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <span className="text-slate-500">Origin:</span>
                    <p className="mt-1">{character.origin.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Last known location:</span>
                    <p className="mt-1">{character.location.name}</p>
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-600" />

              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                  <Tv className="h-4 w-4" />
                  Episodes
                </h3>
                <div className="space-y-3">
                  <div className="text-slate-300">
                    <p>
                      Appeared in <span className="font-semibold text-white">{character.episode.length}</span> episodes
                    </p>
                  </div>
                  {character.episode.length > 0 && (
                    <Button
                      onClick={() => setEpisodesModalOpen(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                      size="sm"
                    >
                      View All
                    </Button>
                  )}
                </div>
              </div>

              <Separator className="bg-slate-600" />

              <div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Created
                </h3>
                <div className="text-slate-300">
                  <p>{formatDate(character.created)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <EpisodesModal
          episodeUrls={character.episode}
          characterName={character.name}
          isOpen={episodesModalOpen}
          onClose={() => setEpisodesModalOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
