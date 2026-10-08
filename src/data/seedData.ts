import type { ArenaDataset, ArenaMap, Match, MatchParticipant, MatchTeam, Player, TierDefinition } from './models'

export const tierDefinitions: TierDefinition[] = [
  { id: 'Bronze', threshold: 0, description: 'Entry clearance for verified arena competitors.', color: '#A66F55' },
  { id: 'Silver', threshold: 1350, description: 'Consistent combat fundamentals under pressure.', color: '#C3BEC7' },
  { id: 'Gold', threshold: 1450, description: 'Advanced match impact and reliable conversion.', color: '#D5B68A' },
  { id: 'Diamond', threshold: 1550, description: 'High-precision decision making across formations.', color: '#A8C9C3' },
  { id: 'Elite', threshold: 1625, description: 'Vanta command tier. Exceptional competitive output.', color: '#A89CC7' },
]

export const arenaMaps: ArenaMap[] = [
  { name: 'Kestrel Array', code: 'KST-07', sector: 'Orbital transfer lattice', configuration: 'cross' },
  { name: 'Sunder Vault', code: 'SNV-12', sector: 'Subsurface containment', configuration: 'vault' },
  { name: 'Halcyon Divide', code: 'HLC-04', sector: 'Polar extraction line', configuration: 'split' },
  { name: 'Obsidian Relay', code: 'OBS-19', sector: 'Signal interception grid', configuration: 'ring' },
  { name: 'Pale Meridian', code: 'PLM-03', sector: 'Desert transit spine', configuration: 'spine' },
  { name: 'Rose Citadel', code: 'RSC-21', sector: 'High-altitude command bastion', configuration: 'ring' },
  { name: 'Glass Narrows', code: 'GLN-09', sector: 'Coastal relay corridor', configuration: 'split' },
]

const seededPlayers: Player[] = [
  ['p01', 'NOCTURNE', 'Mira Vale', 'IN'], ['p02', 'SABLE', 'Rin Okada', 'JP'], ['p03', 'KERNEL', 'Ilya Novak', 'PL'],
  ['p04', 'VANTA', 'Aya Morel', 'FR'], ['p05', 'HEXLINE', 'Dev Arora', 'IN'], ['p06', 'ROOK', 'Mason Reid', 'GB'],
  ['p07', 'CINDER', 'Lena Vos', 'NL'], ['p08', 'PARALLAX', 'Seo Jun', 'KR'], ['p09', 'MORROW', 'Nadia Cole', 'US'],
  ['p10', 'REVENANT', 'Owen Kade', 'CA'], ['p11', 'AURORA', 'Elise Berg', 'NO'], ['p12', 'VECTOR', 'Tomas Silva', 'BR'],
  ['p13', 'NEEDLE', 'Imani Okafor', 'NG'], ['p14', 'DRIFT', 'Luca Bianchi', 'IT'], ['p15', 'WISP', 'Mae Chen', 'SG'],
  ['p16', 'LOCKJAW', 'Jonas Weber', 'DE'], ['p17', 'ECHO', 'Sofia Reyes', 'MX'], ['p18', 'KRAKEN', 'Erik Lund', 'SE'],
  ['p19', 'VEIL', 'Priya Shah', 'IN'], ['p20', 'FABLE', 'Amelie Laurent', 'FR'], ['p21', 'ION', 'Kai Morgan', 'AU'],
  ['p22', 'RIPTIDE', 'Mateo Cruz', 'ES'], ['p23', 'NOMAD', 'Samira Haddad', 'AE'], ['p24', 'ORBIT', 'Alex Petrov', 'UA'],
].map(([id, username, callsign, countryCode], index) => ({ id, username, callsign, countryCode, joinedAt: `2026-${String(1 + Math.floor(index / 4)).padStart(2, '0')}-${String(8 + (index % 4) * 5).padStart(2, '0')}` }))

const featuredMatches: Match[] = [
  { id: 'DB-7319', map: 'Kestrel Array', playedAt: '2026-10-07T20:42:00+05:30', durationSeconds: 2184, mvpPlayerId: 'p01' },
  { id: 'DB-7296', map: 'Sunder Vault', playedAt: '2026-10-06T22:18:00+05:30', durationSeconds: 1948, mvpPlayerId: 'p05' },
  { id: 'DB-7261', map: 'Halcyon Divide', playedAt: '2026-10-05T19:07:00+05:30', durationSeconds: 2316, mvpPlayerId: 'p02' },
  { id: 'DB-7224', map: 'Obsidian Relay', playedAt: '2026-10-03T23:11:00+05:30', durationSeconds: 2071, mvpPlayerId: 'p08' },
  { id: 'DB-7188', map: 'Pale Meridian', playedAt: '2026-10-02T18:36:00+05:30', durationSeconds: 1855, mvpPlayerId: 'p01' },
  { id: 'DB-7142', map: 'Kestrel Array', playedAt: '2026-09-30T21:25:00+05:30', durationSeconds: 2240, mvpPlayerId: 'p06' },
]

const featuredTeams: MatchTeam[] = [
  ['t7319a', 'DB-7319', 'WRAITH UNIT', 'A', 13, 'victory'], ['t7319b', 'DB-7319', 'IRON VEIL', 'B', 9, 'defeat'],
  ['t7296a', 'DB-7296', 'EMBER SIX', 'A', 11, 'defeat'], ['t7296b', 'DB-7296', 'NULL CROWN', 'B', 13, 'victory'],
  ['t7261a', 'DB-7261', 'WRAITH UNIT', 'A', 13, 'victory'], ['t7261b', 'DB-7261', 'EMBER SIX', 'B', 7, 'defeat'],
  ['t7224a', 'DB-7224', 'IRON VEIL', 'A', 12, 'defeat'], ['t7224b', 'DB-7224', 'NULL CROWN', 'B', 14, 'victory'],
  ['t7188a', 'DB-7188', 'WRAITH UNIT', 'A', 13, 'victory'], ['t7188b', 'DB-7188', 'IRON VEIL', 'B', 5, 'defeat'],
  ['t7142a', 'DB-7142', 'EMBER SIX', 'A', 13, 'victory'], ['t7142b', 'DB-7142', 'NULL CROWN', 'B', 10, 'defeat'],
].map(([id, matchId, name, side, score, result]) => ({ id: String(id), matchId: String(matchId), name: String(name), side: side as 'A' | 'B', score: Number(score), result: result as 'victory' | 'defeat' }))

const featuredRows: Array<[string, string, string, number, number, number]> = [
  ['DB-7319', 't7319a', 'p01', 28, 14, 7], ['DB-7319', 't7319a', 'p02', 21, 17, 12], ['DB-7319', 't7319a', 'p03', 18, 16, 10], ['DB-7319', 't7319b', 'p04', 20, 22, 5], ['DB-7319', 't7319b', 'p05', 17, 21, 8], ['DB-7319', 't7319b', 'p06', 14, 24, 11],
  ['DB-7296', 't7296a', 'p01', 19, 20, 8], ['DB-7296', 't7296a', 'p03', 16, 19, 10], ['DB-7296', 't7296a', 'p07', 15, 21, 7], ['DB-7296', 't7296b', 'p05', 27, 15, 9], ['DB-7296', 't7296b', 'p06', 20, 17, 12], ['DB-7296', 't7296b', 'p08', 18, 18, 10],
  ['DB-7261', 't7261a', 'p01', 24, 13, 9], ['DB-7261', 't7261a', 'p02', 26, 15, 8], ['DB-7261', 't7261a', 'p07', 17, 14, 13], ['DB-7261', 't7261b', 'p04', 16, 23, 6], ['DB-7261', 't7261b', 'p05', 14, 21, 9], ['DB-7261', 't7261b', 'p08', 13, 23, 7],
  ['DB-7224', 't7224a', 'p02', 23, 22, 10], ['DB-7224', 't7224a', 'p03', 19, 21, 12], ['DB-7224', 't7224a', 'p06', 20, 23, 9], ['DB-7224', 't7224b', 'p04', 24, 20, 8], ['DB-7224', 't7224b', 'p07', 21, 20, 14], ['DB-7224', 't7224b', 'p08', 29, 18, 6],
  ['DB-7188', 't7188a', 'p01', 25, 11, 6], ['DB-7188', 't7188a', 'p03', 19, 13, 9], ['DB-7188', 't7188a', 'p05', 18, 15, 11], ['DB-7188', 't7188b', 'p04', 14, 21, 5], ['DB-7188', 't7188b', 'p06', 12, 22, 8], ['DB-7188', 't7188b', 'p07', 13, 19, 7],
  ['DB-7142', 't7142a', 'p02', 22, 17, 9], ['DB-7142', 't7142a', 'p06', 26, 16, 11], ['DB-7142', 't7142a', 'p07', 17, 18, 13], ['DB-7142', 't7142b', 'p01', 21, 20, 7], ['DB-7142', 't7142b', 'p05', 19, 21, 10], ['DB-7142', 't7142b', 'p08', 16, 22, 9],
]

const featuredParticipants: MatchParticipant[] = featuredRows.map(([matchId, teamId, playerId, kills, deaths, assists]) => ({ matchId, teamId, playerId, kills, deaths, assists }))

const teamNames = ['WRAITH UNIT', 'IRON VEIL', 'EMBER SIX', 'NULL CROWN', 'ROSEWARD', 'GLASS REIGN', 'VOID CHOIR', 'PALE ORDER']
const mvpScore = (entry: Pick<MatchParticipant, 'kills' | 'deaths' | 'assists'>) => entry.kills * 2 + entry.assists - entry.deaths

function randomFactory(seed: number) {
  let value = seed >>> 0
  return () => {
    value += 0x6D2B79F5
    let next = value
    next = Math.imul(next ^ (next >>> 15), next | 1)
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61)
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296
  }
}

export function createSeedDataset(): ArenaDataset {
  const random = randomFactory(170317)
  const matches = [...featuredMatches]
  const teams = [...featuredTeams]
  const participants = [...featuredParticipants]
  const baseTime = new Date('2026-09-29T19:30:00+05:30').getTime()

  for (let index = 0; index < 48; index += 1) {
    const id = `DB-${String(7090 - index * 17).padStart(4, '0')}`
    const pool = seededPlayers.map((player) => player.id)
    for (let cursor = pool.length - 1; cursor > 0; cursor -= 1) {
      const target = Math.floor(random() * (cursor + 1))
      ;[pool[cursor], pool[target]] = [pool[target], pool[cursor]]
    }
    const selected = pool.slice(0, 6)
    const aWins = random() > .47
    const winnerScore = 13 + (index % 11 === 0 ? 1 : 0)
    const loserScore = 5 + Math.floor(random() * 8)
    const teamAId = `t${id.slice(3)}a`
    const teamBId = `t${id.slice(3)}b`
    const matchParticipants: MatchParticipant[] = selected.map((playerId, playerIndex) => {
      const winning = playerIndex < 3 ? aWins : !aWins
      return {
        matchId: id,
        teamId: playerIndex < 3 ? teamAId : teamBId,
        playerId,
        kills: 11 + Math.floor(random() * 12) + (winning ? 4 : 0),
        deaths: 11 + Math.floor(random() * 12) + (winning ? 0 : 3),
        assists: 4 + Math.floor(random() * 11),
      }
    })
    const mvp = [...matchParticipants].sort((a, b) => mvpScore(b) - mvpScore(a) || a.playerId.localeCompare(b.playerId))[0]
    matches.push({ id, map: arenaMaps[index % arenaMaps.length].name, playedAt: new Date(baseTime - index * 13 * 60 * 60 * 1000).toISOString(), durationSeconds: 1680 + Math.floor(random() * 840), mvpPlayerId: mvp.playerId })
    teams.push(
      { id: teamAId, matchId: id, name: teamNames[index % teamNames.length], side: 'A', score: aWins ? winnerScore : loserScore, result: aWins ? 'victory' : 'defeat' },
      { id: teamBId, matchId: id, name: teamNames[(index + 3) % teamNames.length], side: 'B', score: aWins ? loserScore : winnerScore, result: aWins ? 'defeat' : 'victory' },
    )
    participants.push(...matchParticipants)
  }

  return { players: seededPlayers.map((player) => ({ ...player })), matches: matches.sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()), teams, participants }
}

export const seedDataset = createSeedDataset()
