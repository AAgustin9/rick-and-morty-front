"use client"

import { useState, useEffect, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tv, Calendar, User, Loader2 } from "lucide-react"
import { episodeService } from "@/services/episode"
import type { Episode } from "@/types/episode"

interface EpisodesModalProps {
  episodeUrls: string[]
  characterName: string
  isOpen: boolean
  onClose: () => void
}

export function EpisodesModal({ episodeUrls, characterName, isOpen, onClose }: EpisodesModalProps) {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [loading, setLoading] = useState(false)

  const fetchEpisodes = useCallback(async () => {
    setLoading(true)
    try {
      const episodeData = await episodeService.getEpisodesByUrls(episodeUrls)
      // Sort episodes by episode number (S01E01, S01E02, etc.)
      const sortedEpisodes = episodeData.sort((a, b) => {
        const aMatch = a.episode.match(/S(\d+)E(\d+)/)
        const bMatch = b.episode.match(/S(\d+)E(\d+)/)
        
        if (aMatch && bMatch) {
          const aSeason = parseInt(aMatch[1])
          const bSeason = parseInt(bMatch[1])
          const aEpisode = parseInt(aMatch[2])
          const bEpisode = parseInt(bMatch[2])
          
          if (aSeason !== bSeason) {
            return aSeason - bSeason
          }
          return aEpisode - bEpisode
        }
        
        return 0
      })
      
      setEpisodes(sortedEpisodes)
    } catch (error) {
      console.error("Error fetching episodes:", error)
      setEpisodes([])
    } finally {
      setLoading(false)
    }
  }, [episodeUrls])

  useEffect(() => {
    if (isOpen && episodeUrls.length > 0) {
      fetchEpisodes()
    }
  }, [isOpen, episodeUrls, fetchEpisodes])

  const formatAirDate = (airDate: string) => {
    const date = new Date(airDate)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const groupEpisodesBySeason = (episodes: Episode[]) => {
    const grouped: { [season: string]: Episode[] } = {}
    
    episodes.forEach(episode => {
      const match = episode.episode.match(/S(\d+)E(\d+)/)
      if (match) {
        const season = `Season ${parseInt(match[1])}`
        if (!grouped[season]) {
          grouped[season] = []
        }
        grouped[season].push(episode)
      }
    })
    
    return grouped
  }

  const seasonGroups = groupEpisodesBySeason(episodes)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800 border-slate-600 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <Tv className="h-6 w-6" />
            Episodes featuring {characterName}
          </DialogTitle>
          <p className="text-slate-400">
            Appeared in {episodeUrls.length} episode{episodeUrls.length !== 1 ? 's' : ''}
          </p>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
            <span className="ml-2 text-slate-300">Loading episodes...</span>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(seasonGroups).map(([season, seasonEpisodes]) => (
              <div key={season}>
                <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                  <Badge variant="outline" className="border-emerald-400 text-emerald-400">
                    {season}
                  </Badge>
                  <span className="text-sm text-slate-400">
                    ({seasonEpisodes.length} episode{seasonEpisodes.length !== 1 ? 's' : ''})
                  </span>
                </h3>
                
                <div className="grid gap-3">
                  {seasonEpisodes.map((episode) => (
                    <div
                      key={episode.id}
                      className="bg-slate-700 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono">
                              {episode.episode}
                            </Badge>
                            <h4 className="font-semibold text-white text-lg">
                              {episode.name}
                            </h4>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-slate-400">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatAirDate(episode.air_date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              <span>{episode.characters.length} characters</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {Object.keys(seasonGroups).indexOf(season) < Object.keys(seasonGroups).length - 1 && (
                  <Separator className="bg-slate-600 mt-6" />
                )}
              </div>
            ))}
            
            {episodes.length === 0 && !loading && (
              <div className="text-center py-8 text-slate-400">
                <Tv className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No episodes found for this character.</p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
} 