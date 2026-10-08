import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { ArenaDataset, LeaderboardEntry, Match, MatchSubmission, StoredArenaData } from '../data/models'
import { arenaMaps, seedDataset, tierDefinitions } from '../data/seedData'
import { applySubmission, buildLeaderboard, emptyStoredData, getMapPerformance, getParticipantsForTeam, getPlayerMatches, getPlayerTrend, getTeamsForMatch, mergeArenaData, persistStoredData, removeStoredData, restoreStoredData } from '../data/repository'

interface ArenaDataState {
  data: ArenaDataset
  players: ArenaDataset['players']
  matches: ArenaDataset['matches']
  teams: ArenaDataset['teams']
  participants: ArenaDataset['participants']
  leaderboard: LeaderboardEntry[]
  totals: { players: number; matches: number; eliminations: number; leader: LeaderboardEntry }
  arenaMaps: typeof arenaMaps
  tierDefinitions: typeof tierDefinitions
  localMatchCount: number
  submitMatch: (input: MatchSubmission) => Match
  resetLocalData: () => void
  getPlayer: (id: string) => ArenaDataset['players'][number] | undefined
  getLeaderboardPlayer: (id: string) => LeaderboardEntry | undefined
  getMatch: (id: string) => Match | undefined
  getTeamsForMatch: (id: string) => ArenaDataset['teams']
  getParticipantsForTeam: (matchId: string, teamId: string) => ArenaDataset['participants']
  getPlayerMatches: (playerId: string) => Match[]
  getPlayerTrend: (playerId: string) => ReturnType<typeof getPlayerTrend>
  getMapPerformance: (playerId: string) => ReturnType<typeof getMapPerformance>
}

const ArenaDataContext = createContext<ArenaDataState | null>(null)

const browserStorage = () => typeof window === 'undefined' ? null : window.localStorage

export function ArenaDataProvider({ children }: { children: ReactNode }) {
  const [custom, setCustom] = useState<StoredArenaData>(() => restoreStoredData(browserStorage()))
  const data = useMemo(() => mergeArenaData(seedDataset, custom), [custom])
  const leaderboard = useMemo(() => buildLeaderboard(data), [data])

  const submitMatch = useCallback((input: MatchSubmission) => {
    const result = applySubmission(data, input)
    const newPlayers = result.createdPlayerIds.map((id) => result.dataset.players.find((player) => player.id === id)!).filter(Boolean)
    const next: StoredArenaData = {
      version: 1,
      players: [...custom.players, ...newPlayers],
      matches: [result.match, ...custom.matches],
      teams: [...custom.teams, ...result.dataset.teams.filter((team) => team.matchId === result.match.id)],
      participants: [...custom.participants, ...result.dataset.participants.filter((entry) => entry.matchId === result.match.id)],
    }
    persistStoredData(browserStorage(), next)
    setCustom(next)
    return result.match
  }, [custom, data])

  const resetLocalData = useCallback(() => {
    removeStoredData(browserStorage())
    setCustom(emptyStoredData())
  }, [])

  const value = useMemo<ArenaDataState>(() => ({
    data,
    players: data.players,
    matches: data.matches,
    teams: data.teams,
    participants: data.participants,
    leaderboard,
    totals: { players: data.players.length, matches: data.matches.length, eliminations: data.participants.reduce((sum, entry) => sum + entry.kills, 0), leader: leaderboard[0] },
    arenaMaps,
    tierDefinitions,
    localMatchCount: custom.matches.length,
    submitMatch,
    resetLocalData,
    getPlayer: (id) => data.players.find((player) => player.id === id),
    getLeaderboardPlayer: (id) => leaderboard.find((player) => player.id === id),
    getMatch: (id) => data.matches.find((match) => match.id === id),
    getTeamsForMatch: (id) => getTeamsForMatch(data, id),
    getParticipantsForTeam: (matchId, teamId) => getParticipantsForTeam(data, matchId, teamId),
    getPlayerMatches: (playerId) => getPlayerMatches(data, playerId),
    getPlayerTrend: (playerId) => getPlayerTrend(data, playerId),
    getMapPerformance: (playerId) => getMapPerformance(data, playerId),
  }), [custom.matches.length, data, leaderboard, resetLocalData, submitMatch])

  return <ArenaDataContext.Provider value={value}>{children}</ArenaDataContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useArenaData() {
  const context = useContext(ArenaDataContext)
  if (!context) throw new Error('useArenaData must be used inside ArenaDataProvider')
  return context
}
