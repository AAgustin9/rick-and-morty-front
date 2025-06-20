"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Tv } from "lucide-react"
import Image from "next/image"
import type { Character } from "@/types/character"

interface CharacterModalProps {
  character: Character | null
  isOpen: boolean
  onClose: () => void
}

export function CharacterModal({ character, isOpen, onClose }: CharacterModalProps) {
  if (!character) return null

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

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
                <Badge variant={getStatusBadgeVariant(character.status)} className="text-sm hover:bg-current pointer-events-none">
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
                <div className="text-slate-300">
                  <p>
                    Appeared in <span className="font-semibold text-white">{character.episode.length}</span> episodes
                  </p>
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

        <style jsx>{`
          .character-modal {
            animation: modalSlideIn 0.3s ease-out;
          }
          
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.95) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  )
}
