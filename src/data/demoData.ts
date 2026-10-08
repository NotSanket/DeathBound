import type { ArenaMap, LeaderboardEntry, Match, MatchParticipant, MatchTeam, PerformancePoint, Player, SkillTier, TierDefinition } from './models'

export const players: Player[] = [
  { id: 'p01', username: 'NOCTURNE', callsign: 'Mira Vale', countryCode: 'IN', joinedAt: '2026-01-12' },
  { id: 'p02', username: 'SABLE', callsign: 'Rin Okada', countryCode: 'JP', joinedAt: '2026-01-19' },
  { id: 'p03', username: 'KERNEL', callsign: 'Ilya Novak', countryCode: 'PL', joinedAt: '2026-02-03' },
  { id: 'p04', username: 'VANTA', callsign: 'Aya Morel', countryCode: 'FR', joinedAt: '2026-02-11' },
  { id: 'p05', username: 'HEXLINE', callsign: 'Dev Arora', countryCode: 'IN', joinedAt: '2026-02-16' },
  { id: 'p06', username: 'ROOK', callsign: 'Mason Reid', countryCode: 'GB', joinedAt: '2026-03-02' },
  { id: 'p07', username: 'CINDER', callsign: 'Lena Vos', countryCode: 'NL', joinedAt: '2026-03-14' },
  { id: 'p08', username: 'PARALLAX', callsign: 'Seo Jun', countryCode: 'KR', joinedAt: '2026-04-01' },
]

export const matches: Match[] = [
  { id: 'DB-7319', map: 'Kestrel Array', playedAt: '2026-10-07T20:42:00+05:30', durationSeconds: 2184, mvpPlayerId: 'p01' },
  { id: 'DB-7296', map: 'Sunder Vault', playedAt: '2026-10-06T22:18:00+05:30', durationSeconds: 1948, mvpPlayerId: 'p05' },
  { id: 'DB-7261', map: 'Halcyon Divide', playedAt: '2026-10-05T19:07:00+05:30', durationSeconds: 2316, mvpPlayerId: 'p02' },
  { id: 'DB-7224', map: 'Obsidian Relay', playedAt: '2026-10-03T23:11:00+05:30', durationSeconds: 2071, mvpPlayerId: 'p08' },
  { id: 'DB-7188', map: 'Pale Meridian', playedAt: '2026-10-02T18:36:00+05:30', durationSeconds: 1855, mvpPlayerId: 'p01' },
  { id: 'DB-7142', map: 'Kestrel Array', playedAt: '2026-09-30T21:25:00+05:30', durationSeconds: 2240, mvpPlayerId: 'p06' },
]

export const matchTeams: MatchTeam[] = [
  { id: 't7319a', matchId: 'DB-7319', name: 'WRAITH UNIT', side: 'A', score: 13, result: 'victory' },
  { id: 't7319b', matchId: 'DB-7319', name: 'IRON VEIL', side: 'B', score: 9, result: 'defeat' },
  { id: 't7296a', matchId: 'DB-7296', name: 'EMBER SIX', side: 'A', score: 11, result: 'defeat' },
  { id: 't7296b', matchId: 'DB-7296', name: 'NULL CROWN', side: 'B', score: 13, result: 'victory' },
  { id: 't7261a', matchId: 'DB-7261', name: 'WRAITH UNIT', side: 'A', score: 13, result: 'victory' },
  { id: 't7261b', matchId: 'DB-7261', name: 'EMBER SIX', side: 'B', score: 7, result: 'defeat' },
  { id: 't7224a', matchId: 'DB-7224', name: 'IRON VEIL', side: 'A', score: 12, result: 'defeat' },
  { id: 't7224b', matchId: 'DB-7224', name: 'NULL CROWN', side: 'B', score: 14, result: 'victory' },
  { id: 't7188a', matchId: 'DB-7188', name: 'WRAITH UNIT', side: 'A', score: 13, result: 'victory' },
  { id: 't7188b', matchId: 'DB-7188', name: 'IRON VEIL', side: 'B', score: 5, result: 'defeat' },
  { id: 't7142a', matchId: 'DB-7142', name: 'EMBER SIX', side: 'A', score: 13, result: 'victory' },
  { id: 't7142b', matchId: 'DB-7142', name: 'NULL CROWN', side: 'B', score: 10, result: 'defeat' },
]

const rows: Array<[string, string, string, number, number, number]> = [
  ['DB-7319', 't7319a', 'p01', 28, 14, 7], ['DB-7319', 't7319a', 'p02', 21, 17, 12], ['DB-7319', 't7319a', 'p03', 18, 16, 10],
  ['DB-7319', 't7319b', 'p04', 20, 22, 5], ['DB-7319', 't7319b', 'p05', 17, 21, 8], ['DB-7319', 't7319b', 'p06', 14, 24, 11],
  ['DB-7296', 't7296a', 'p01', 19, 20, 8], ['DB-7296', 't7296a', 'p03', 16, 19, 10], ['DB-7296', 't7296a', 'p07', 15, 21, 7],
  ['DB-7296', 't7296b', 'p05', 27, 15, 9], ['DB-7296', 't7296b', 'p06', 20, 17, 12], ['DB-7296', 't7296b', 'p08', 18, 18, 10],
  ['DB-7261', 't7261a', 'p01', 24, 13, 9], ['DB-7261', 't7261a', 'p02', 26, 15, 8], ['DB-7261', 't7261a', 'p07', 17, 14, 13],
  ['DB-7261', 't7261b', 'p04', 16, 23, 6], ['DB-7261', 't7261b', 'p05', 14, 21, 9], ['DB-7261', 't7261b', 'p08', 13, 23, 7],
  ['DB-7224', 't7224a', 'p02', 23, 22, 10], ['DB-7224', 't7224a', 'p03', 19, 21, 12], ['DB-7224', 't7224a', 'p06', 20, 23, 9],
  ['DB-7224', 't7224b', 'p04', 24, 20, 8], ['DB-7224', 't7224b', 'p07', 21, 20, 14], ['DB-7224', 't7224b', 'p08', 29, 18, 6],
  ['DB-7188', 't7188a', 'p01', 25, 11, 6], ['DB-7188', 't7188a', 'p03', 19, 13, 9], ['DB-7188', 't7188a', 'p05', 18, 15, 11],
  ['DB-7188', 't7188b', 'p04', 14, 21, 5], ['DB-7188', 't7188b', 'p06', 12, 22, 8], ['DB-7188', 't7188b', 'p07', 13, 19, 7],
  ['DB-7142', 't7142a', 'p02', 22, 17, 9], ['DB-7142', 't7142a', 'p06', 26, 16, 11], ['DB-7142', 't7142a', 'p07', 17, 18, 13],
  ['DB-7142', 't7142b', 'p01', 21, 20, 7], ['DB-7142', 't7142b', 'p05', 19, 21, 10], ['DB-7142', 't7142b', 'p08', 16, 22, 9],
]

export const participants: MatchParticipant[] = rows.map(([matchId, teamId, playerId, kills, deaths, assists]) => ({
  matchId, teamId, playerId, kills, deaths, assists,
}))

export const tierDefinitions: TierDefinition[] = [
  { id: 'Bronze', threshold: 0, description: 'Entry clearance for verified arena competitors.', color: '#A66F55' },
  { id: 'Silver', threshold: 1350, description: 'Consistent combat fundamentals under pressure.', color: '#C3BEC7' },
  { id: 'Gold', threshold: 1450, description: 'Advanced match impact and reliable conversion.', color: '#D5B68A' },
  { id: 'Diamond', threshold: 1550, description: 'High-precision decision making across formations.', color: '#A8C9C3' },
  { id: 'Elite', threshold: 1625, description: 'Blacksite command tier. Exceptional competitive output.', color: '#A89CC7' },
]

export const arenaMaps: ArenaMap[] = [
  { name: 'Kestrel Array', code: 'KST-07', sector: 'Orbital transfer lattice', configuration: 'cross' },
  { name: 'Sunder Vault', code: 'SNV-12', sector: 'Subsurface containment', configuration: 'vault' },
  { name: 'Halcyon Divide', code: 'HLC-04', sector: 'Polar extraction line', configuration: 'split' },
  { name: 'Obsidian Relay', code: 'OBS-19', sector: 'Signal interception grid', configuration: 'ring' },
  { name: 'Pale Meridian', code: 'PLM-03', sector: 'Desert transit spine', configuration: 'spine' },
]

export const getTier = (rating: number): SkillTier => {
  return [...tierDefinitions].reverse().find((tier) => rating >= tier.threshold)?.id ?? 'Bronze'
}

export const leaderboard: LeaderboardEntry[] = players
  .map((player) => {
    const records = participants.filter((entry) => entry.playerId === player.id)
    const kills = records.reduce((sum, entry) => sum + entry.kills, 0)
    const deaths = records.reduce((sum, entry) => sum + entry.deaths, 0)
    const assists = records.reduce((sum, entry) => sum + entry.assists, 0)
    const wins = records.filter((entry) => matchTeams.find((team) => team.id === entry.teamId)?.result === 'victory').length
    const rating = 1200 + wins * 52 + kills * 3 - deaths
    return {
      ...player,
      rank: 0,
      rating,
      tier: getTier(rating),
      kills,
      deaths,
      assists,
      matches: records.length,
      wins,
      kd: Number((kills / Math.max(deaths, 1)).toFixed(2)),
      winRate: Math.round((wins / records.length) * 100),
    }
  })
  .sort((a, b) => b.rating - a.rating)
  .map((entry, index) => ({ ...entry, rank: index + 1 }))

export const getPlayer = (id: string) => players.find((player) => player.id === id)!
export const getTeamsForMatch = (matchId: string) => matchTeams.filter((team) => team.matchId === matchId).sort((a, b) => a.side.localeCompare(b.side))
export const getParticipantsForTeam = (matchId: string, teamId: string) => participants.filter((entry) => entry.matchId === matchId && entry.teamId === teamId).sort((a, b) => b.kills - a.kills)
export const getMap = (name: string) => arenaMaps.find((map) => map.name === name)!
export const getLeaderboardPlayer = (id: string) => leaderboard.find((player) => player.id === id)!

export const getPlayerMatches = (playerId: string) => matches
  .filter((match) => participants.some((entry) => entry.matchId === match.id && entry.playerId === playerId))
  .sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime())

export const getPlayerTrend = (playerId: string): PerformancePoint[] => {
  const chronological = [...getPlayerMatches(playerId)].reverse()
  let kills = 0
  let deaths = 0
  let wins = 0
  return chronological.map((match, index) => {
    const record = participants.find((entry) => entry.matchId === match.id && entry.playerId === playerId)!
    kills += record.kills
    deaths += record.deaths
    if (matchTeams.find((team) => team.id === record.teamId)?.result === 'victory') wins += 1
    return {
      label: `M${index + 1}`,
      matchId: match.id,
      kd: Number((kills / Math.max(deaths, 1)).toFixed(2)),
      rating: 1200 + wins * 52 + kills * 3 - deaths,
      winRate: Math.round((wins / (index + 1)) * 100),
    }
  })
}

export const getTopEliminator = (matchId: string) => [...participants]
  .filter((entry) => entry.matchId === matchId)
  .sort((a, b) => b.kills - a.kills)[0]

export const dashboardTotals = {
  players: players.length,
  matches: matches.length,
  eliminations: participants.reduce((sum, entry) => sum + entry.kills, 0),
  leader: leaderboard[0],
}

export const validateDemoData = () => matches.every((match) => {
  const teams = getTeamsForMatch(match.id)
  const matchPlayers = participants.filter((entry) => entry.matchId === match.id)
  const teamIds = new Set(teams.map((team) => team.id))
  const nonnegative = matchPlayers.every((entry) => entry.kills >= 0 && entry.deaths >= 0 && entry.assists >= 0)
  const validReferences = matchPlayers.every((entry) => teamIds.has(entry.teamId) && players.some((player) => player.id === entry.playerId))
  const results = teams.filter((team) => team.result === 'victory').length === 1 && teams.filter((team) => team.result === 'defeat').length === 1
  return teams.length === 2 && teams.every((team) => getParticipantsForTeam(match.id, team.id).length === 3) && new Set(matchPlayers.map((entry) => entry.playerId)).size === 6 && nonnegative && validReferences && results
})
