export type TeamResult = 'victory' | 'defeat'
export type TeamSide = 'A' | 'B'

export interface Player {
  id: string
  username: string
  callsign: string
  countryCode: string
  joinedAt: string
}

export interface Match {
  id: string
  map: string
  playedAt: string
  durationSeconds: number
  mvpPlayerId: string
}

export interface MatchTeam {
  id: string
  matchId: string
  name: string
  side: TeamSide
  score: number
  result: TeamResult
}

export interface MatchParticipant {
  matchId: string
  playerId: string
  teamId: string
  kills: number
  deaths: number
  assists: number
}

export interface PerformancePoint {
  label: string
  kd: number
  rating: number
  winRate: number
  matchId: string
}

export type SkillTier = 'Bronze' | 'Silver' | 'Gold' | 'Diamond' | 'Elite'

export interface TierDefinition {
  id: SkillTier
  threshold: number
  description: string
  color: string
}

export interface ArenaMap {
  name: string
  code: string
  sector: string
  configuration: 'split' | 'ring' | 'cross' | 'vault' | 'spine'
}

export interface LeaderboardEntry extends Player {
  rank: number
  rating: number
  tier: SkillTier
  kills: number
  deaths: number
  assists: number
  matches: number
  wins: number
  losses: number
  kd: number
  kda: number
  winRate: number
  averageKills: number
}

export interface ArenaDataset {
  players: Player[]
  matches: Match[]
  teams: MatchTeam[]
  participants: MatchParticipant[]
}

export interface StoredArenaData extends ArenaDataset {
  version: 1
}

export interface ParticipantSubmission {
  playerId?: string
  newUsername?: string
  kills: number
  deaths: number
  assists: number
}

export interface MatchSubmission {
  id: string
  playedAt: string
  map: string
  durationSeconds: number
  teamAName: string
  teamBName: string
  teamAScore: number
  teamBScore: number
  teamA: ParticipantSubmission[]
  teamB: ParticipantSubmission[]
}

export interface SubmissionResult {
  dataset: ArenaDataset
  createdPlayerIds: string[]
  match: Match
}

export interface MapPerformance {
  map: string
  matches: number
  wins: number
  kills: number
  deaths: number
  assists: number
  kd: number
  winRate: number
}
