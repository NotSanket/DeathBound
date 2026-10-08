import type { ArenaDataset, LeaderboardEntry, MapPerformance, Match, MatchParticipant, MatchSubmission, MatchTeam, PerformancePoint, Player, SkillTier, StoredArenaData, SubmissionResult } from './models'
import { arenaMaps, seedDataset, tierDefinitions } from './seedData'

export const STORAGE_KEY = 'deathbound.arena.v1'
export const STORAGE_VERSION = 1 as const
export const emptyStoredData = (): StoredArenaData => ({ version: STORAGE_VERSION, players: [], matches: [], teams: [], participants: [] })

export const getTier = (rating: number): SkillTier => [...tierDefinitions].reverse().find((tier) => rating >= tier.threshold)?.id ?? 'Bronze'
export const mvpValue = (entry: Pick<MatchParticipant, 'kills' | 'deaths' | 'assists'>) => entry.kills * 2 + entry.assists - entry.deaths

export function getTeamsForMatch(data: ArenaDataset, matchId: string) {
  return data.teams.filter((team) => team.matchId === matchId).sort((a, b) => a.side.localeCompare(b.side))
}

export function getParticipantsForTeam(data: ArenaDataset, matchId: string, teamId: string) {
  return data.participants.filter((entry) => entry.matchId === matchId && entry.teamId === teamId).sort((a, b) => b.kills - a.kills || a.playerId.localeCompare(b.playerId))
}

export function getPlayerMatches(data: ArenaDataset, playerId: string) {
  return data.matches.filter((match) => data.participants.some((entry) => entry.matchId === match.id && entry.playerId === playerId)).sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime())
}

export function buildLeaderboard(data: ArenaDataset): LeaderboardEntry[] {
  return data.players.map((player) => {
    const records = data.participants.filter((entry) => entry.playerId === player.id)
    const kills = records.reduce((sum, entry) => sum + entry.kills, 0)
    const deaths = records.reduce((sum, entry) => sum + entry.deaths, 0)
    const assists = records.reduce((sum, entry) => sum + entry.assists, 0)
    const wins = records.filter((entry) => data.teams.find((team) => team.id === entry.teamId)?.result === 'victory').length
    const matches = records.length
    const rating = 1200 + wins * 18 + Math.round(kills * .42) - Math.round(deaths * .16)
    return { ...player, rank: 0, rating, tier: getTier(rating), kills, deaths, assists, matches, wins, losses: matches - wins, kd: Number((kills / Math.max(deaths, 1)).toFixed(2)), kda: Number(((kills + assists) / Math.max(deaths, 1)).toFixed(2)), winRate: matches ? Math.round((wins / matches) * 100) : 0, averageKills: matches ? Number((kills / matches).toFixed(1)) : 0 }
  }).sort((a, b) => b.rating - a.rating || b.kills - a.kills || a.username.localeCompare(b.username)).map((entry, index) => ({ ...entry, rank: index + 1 }))
}

export function getPlayerTrend(data: ArenaDataset, playerId: string): PerformancePoint[] {
  const chronological = [...getPlayerMatches(data, playerId)].reverse()
  let kills = 0
  let deaths = 0
  let wins = 0
  return chronological.map((match, index) => {
    const record = data.participants.find((entry) => entry.matchId === match.id && entry.playerId === playerId)!
    kills += record.kills
    deaths += record.deaths
    if (data.teams.find((team) => team.id === record.teamId)?.result === 'victory') wins += 1
    return { label: `M${index + 1}`, matchId: match.id, kd: Number((kills / Math.max(deaths, 1)).toFixed(2)), rating: 1200 + wins * 18 + Math.round(kills * .42) - Math.round(deaths * .16), winRate: Math.round((wins / (index + 1)) * 100) }
  })
}

export function getMapPerformance(data: ArenaDataset, playerId: string): MapPerformance[] {
  return arenaMaps.map((arena) => {
    const matches = getPlayerMatches(data, playerId).filter((match) => match.map === arena.name)
    const records = matches.map((match) => data.participants.find((entry) => entry.matchId === match.id && entry.playerId === playerId)!).filter(Boolean)
    const wins = records.filter((entry) => data.teams.find((team) => team.id === entry.teamId)?.result === 'victory').length
    const kills = records.reduce((sum, entry) => sum + entry.kills, 0)
    const deaths = records.reduce((sum, entry) => sum + entry.deaths, 0)
    const assists = records.reduce((sum, entry) => sum + entry.assists, 0)
    return { map: arena.name, matches: matches.length, wins, kills, deaths, assists, kd: Number((kills / Math.max(deaths, 1)).toFixed(2)), winRate: matches.length ? Math.round((wins / matches.length) * 100) : 0 }
  }).filter((entry) => entry.matches > 0).sort((a, b) => b.winRate - a.winRate || b.kd - a.kd)
}

export function validateDataset(data: ArenaDataset) {
  const matchIds = new Set(data.matches.map((match) => match.id))
  if (matchIds.size !== data.matches.length || new Set(data.players.map((player) => player.id)).size !== data.players.length) return false
  return data.matches.every((match) => {
    const teams = getTeamsForMatch(data, match.id)
    const entries = data.participants.filter((entry) => entry.matchId === match.id)
    const teamIds = new Set(teams.map((team) => team.id))
    return teams.length === 2 && teams.every((team) => getParticipantsForTeam(data, match.id, team.id).length === 3) && entries.length === 6 && new Set(entries.map((entry) => entry.playerId)).size === 6 && entries.every((entry) => Number.isInteger(entry.kills) && Number.isInteger(entry.deaths) && Number.isInteger(entry.assists) && entry.kills >= 0 && entry.deaths >= 0 && entry.assists >= 0 && teamIds.has(entry.teamId) && data.players.some((player) => player.id === entry.playerId)) && teams.filter((team) => team.result === 'victory').length === 1 && teams[0].score !== teams[1].score && match.mvpPlayerId === [...entries].sort((a, b) => mvpValue(b) - mvpValue(a) || a.playerId.localeCompare(b.playerId))[0].playerId
  })
}

export function validateSubmission(input: MatchSubmission, data: ArenaDataset) {
  const errors: string[] = []
  if (!input.id.trim()) errors.push('Match identifier is required.')
  if (data.matches.some((match) => match.id.toLowerCase() === input.id.trim().toLowerCase())) errors.push('Match identifier already exists.')
  if (!input.playedAt || Number.isNaN(new Date(input.playedAt).getTime())) errors.push('A valid match date is required.')
  if (!arenaMaps.some((map) => map.name === input.map)) errors.push('Select a valid arena map.')
  if (!Number.isInteger(input.durationSeconds) || input.durationSeconds <= 0) errors.push('Duration must be a positive number of seconds.')
  if (!input.teamAName.trim() || !input.teamBName.trim()) errors.push('Both team names are required.')
  if (![input.teamAScore, input.teamBScore].every((score) => Number.isInteger(score) && score >= 0)) errors.push('Scores must be nonnegative integers.')
  if (input.teamAScore === input.teamBScore) errors.push('Completed matches cannot end in a tie.')
  if (input.teamA.length !== 3 || input.teamB.length !== 3) errors.push('Exactly three participants are required per team.')
  const slots = [...input.teamA, ...input.teamB]
  slots.forEach((slot, index) => {
    if (!slot.playerId && !slot.newUsername?.trim()) errors.push(`Participant ${index + 1} requires an existing or new player.`)
    if (slot.playerId && !data.players.some((player) => player.id === slot.playerId)) errors.push(`Participant ${index + 1} references an unknown player.`)
    if (![slot.kills, slot.deaths, slot.assists].every((value) => Number.isInteger(value) && value >= 0)) errors.push(`Participant ${index + 1} K/D/A must use nonnegative integers.`)
  })
  const identities = slots.map((slot) => slot.playerId ? `id:${slot.playerId}` : `new:${slot.newUsername!.trim().toLowerCase()}`)
  if (new Set(identities).size !== 6) errors.push('All six participants must be distinct.')
  const existingNames = new Set(data.players.map((player) => player.username.toLowerCase()))
  slots.filter((slot) => !slot.playerId).forEach((slot) => { if (existingNames.has(slot.newUsername!.trim().toLowerCase())) errors.push(`${slot.newUsername!.trim()} already exists; select that player instead.`) })
  return [...new Set(errors)]
}

export function applySubmission(data: ArenaDataset, input: MatchSubmission): SubmissionResult {
  const errors = validateSubmission(input, data)
  if (errors.length) throw new Error(errors.join('\n'))
  const createdPlayers: Player[] = []
  let nextUser = data.players.filter((player) => player.id.startsWith('u')).length + 1
  const resolvePlayer = (slot: MatchSubmission['teamA'][number]) => {
    if (slot.playerId) return slot.playerId
    const username = slot.newUsername!.trim().toUpperCase()
    const player: Player = { id: `u${String(nextUser++).padStart(3, '0')}`, username, callsign: 'Local recruit', countryCode: 'LC', joinedAt: input.playedAt.slice(0, 10) }
    createdPlayers.push(player)
    return player.id
  }
  const id = input.id.trim().toUpperCase()
  const teamAId = `${id.toLowerCase().replace(/[^a-z0-9]/g, '')}a`
  const teamBId = `${id.toLowerCase().replace(/[^a-z0-9]/g, '')}b`
  const aWins = input.teamAScore > input.teamBScore
  const teams: MatchTeam[] = [
    { id: teamAId, matchId: id, name: input.teamAName.trim().toUpperCase(), side: 'A', score: input.teamAScore, result: aWins ? 'victory' : 'defeat' },
    { id: teamBId, matchId: id, name: input.teamBName.trim().toUpperCase(), side: 'B', score: input.teamBScore, result: aWins ? 'defeat' : 'victory' },
  ]
  const participants = [...input.teamA.map((slot) => ({ ...slot, playerId: resolvePlayer(slot), teamId: teamAId })), ...input.teamB.map((slot) => ({ ...slot, playerId: resolvePlayer(slot), teamId: teamBId }))].map(({ playerId, teamId, kills, deaths, assists }) => ({ matchId: id, playerId, teamId, kills, deaths, assists }))
  const mvp = [...participants].sort((a, b) => mvpValue(b) - mvpValue(a) || a.playerId.localeCompare(b.playerId))[0]
  const match: Match = { id, playedAt: new Date(input.playedAt).toISOString(), map: input.map, durationSeconds: input.durationSeconds, mvpPlayerId: mvp.playerId }
  const dataset: ArenaDataset = { players: [...data.players, ...createdPlayers], matches: [match, ...data.matches].sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()), teams: [...data.teams, ...teams], participants: [...data.participants, ...participants] }
  if (!validateDataset(dataset)) throw new Error('The completed match failed relational validation.')
  return { dataset, createdPlayerIds: createdPlayers.map((player) => player.id), match }
}

export interface StorageLike { getItem: (key: string) => string | null; setItem: (key: string, value: string) => void; removeItem: (key: string) => void }

export function restoreStoredData(storage: StorageLike | null): StoredArenaData {
  if (!storage) return emptyStoredData()
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return emptyStoredData()
    const parsed = JSON.parse(raw) as StoredArenaData
    if (parsed.version !== STORAGE_VERSION || !Array.isArray(parsed.players) || !Array.isArray(parsed.matches) || !Array.isArray(parsed.teams) || !Array.isArray(parsed.participants)) return emptyStoredData()
    const merged = mergeArenaData(seedDataset, parsed)
    return validateDataset(merged) ? parsed : emptyStoredData()
  } catch { return emptyStoredData() }
}

export function mergeArenaData(seed: ArenaDataset, custom: ArenaDataset): ArenaDataset {
  return { players: [...seed.players, ...custom.players], matches: [...custom.matches, ...seed.matches].sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()), teams: [...seed.teams, ...custom.teams], participants: [...seed.participants, ...custom.participants] }
}

export function persistStoredData(storage: StorageLike | null, custom: StoredArenaData) {
  if (storage) storage.setItem(STORAGE_KEY, JSON.stringify(custom))
}

export function removeStoredData(storage: StorageLike | null) { if (storage) storage.removeItem(STORAGE_KEY) }
