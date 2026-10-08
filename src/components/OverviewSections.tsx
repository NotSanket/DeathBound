import { Activity, ArrowDownUp, ArrowLeft, ArrowRight, Award, CalendarDays, Clock3, Crosshair, Database, MapPinned, Radio, Target, Trophy, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { dashboardTotals, getLeaderboardPlayer, getParticipantsForTeam, getPlayer, getPlayerTrend, getTeamsForMatch, getTopEliminator, leaderboard, matches, participants } from '../data/demoData'
import type { LeaderboardEntry, Match } from '../data/models'
import { MiniTierMark } from './Brand'
import { AnimatedNumber } from './Primitives'

const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
const formatDate = (date: string) => new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }).format(new Date(date)).toUpperCase()

export function TelemetryBand() {
  const metrics = [
    { label: 'Registered operators', value: dashboardTotals.players, code: 'PLR', icon: Users },
    { label: 'Verified matches', value: dashboardTotals.matches, code: 'MAT', icon: Database },
    { label: 'Recorded eliminations', value: dashboardTotals.eliminations, code: 'ELM', icon: Crosshair },
  ]
  return (
    <section className="telemetry-band" aria-label="Arena telemetry">
      <div className="telemetry-band__lead"><span>01 // Archive scope</span><strong>Operational telemetry</strong></div>
      {metrics.map(({ label, value, code, icon: Icon }, index) => <motion.div className="telemetry-cell" key={code} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * .06 }}><span><Icon size={14} />{code}</span><strong><AnimatedNumber value={value} /></strong><small>{label}</small></motion.div>)}
      <div className="telemetry-prime"><span><Trophy size={14} /> Prime seed</span><strong>{dashboardTotals.leader.username}</strong><small>{dashboardTotals.leader.rating} SR // {dashboardTotals.leader.tier}</small></div>
    </section>
  )
}

function CombatantRow({ match, playerId, kills, deaths, assists, maxKills, isMvp, onInspect }: { match: Match; playerId: string; kills: number; deaths: number; assists: number; maxKills: number; isMvp: boolean; onInspect: (playerId: string) => void }) {
  const player = getPlayer(playerId)
  const ranked = getLeaderboardPlayer(playerId)
  return (
    <motion.button className={`combatant-row ${isMvp ? 'is-mvp' : ''}`} onClick={() => onInspect(playerId)} whileHover={{ x: 4 }} aria-label={`Inspect ${player.username} player dossier`}>
      <span className="combatant-id">{player.username.slice(0, 2)}</span>
      <span className="combatant-name"><strong>{player.username}</strong><small>{player.callsign} // {ranked.tier}{isMvp ? ' // MVP' : ''}</small><i><b style={{ width: `${(kills / maxKills) * 100}%` }} /></i></span>
      <span><small>K</small><strong>{kills}</strong></span><span><small>D</small><strong>{deaths}</strong></span><span><small>A</small><strong>{assists}</strong></span><span className="combatant-ratio"><small>K/D</small><strong>{(kills / Math.max(deaths, 1)).toFixed(2)}</strong></span>
      <span className="sr-only">{match.id}</span>
    </motion.button>
  )
}

export function ArenaScoreboard({ match, onPrevious, onNext, onInspectPlayer }: { match: Match; onPrevious: () => void; onNext: () => void; onInspectPlayer: (playerId: string) => void }) {
  const teams = getTeamsForMatch(match.id)
  const winner = teams.find((team) => team.result === 'victory')!
  const matchParticipants = participants.filter((entry) => entry.matchId === match.id)
  const maxKills = Math.max(...matchParticipants.map((entry) => entry.kills))
  return (
    <section className="arena-scoreboard" aria-label={`Featured match ${match.id}`}>
      <div className="arena-scoreboard__top">
        <div><span>01 // The arena</span><strong>Final encounter report</strong></div>
        <div className="match-cycle"><button onClick={onPrevious} aria-label="Previous recorded match"><ArrowLeft size={16} /></button><span>{match.id}<small>{matches.findIndex((entry) => entry.id === match.id) + 1} / {matches.length}</small></span><button onClick={onNext} aria-label="Next recorded match"><ArrowRight size={16} /></button></div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="arena-scoreboard__content" key={match.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: .2 }}>
          <div className="arena-versus">
            <div className={`versus-team ${teams[0].result === 'victory' ? 'is-winner' : ''}`}><span>Attacking formation</span><strong>{teams[0].name}</strong><em>{teams[0].result}</em></div>
            <div className="versus-score"><div><motion.strong key={`${match.id}-left`} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{teams[0].score}</motion.strong><i>:</i><motion.strong key={`${match.id}-right`} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{teams[1].score}</motion.strong></div><span><MapPinned size={14} />{match.map}</span><small><Clock3 size={12} />{formatDuration(match.durationSeconds)} // COMPLETE</small></div>
            <div className={`versus-team versus-team--right ${teams[1].result === 'victory' ? 'is-winner' : ''}`}><span>Defensive formation</span><strong>{teams[1].name}</strong><em>{teams[1].result}</em></div>
          </div>
          <div className="winner-declaration"><span>Winning formation</span><strong>{winner.name}</strong><i /><span>Match MVP</span><button onClick={() => onInspectPlayer(match.mvpPlayerId)}>{getPlayer(match.mvpPlayerId).username}<Award size={13} /></button></div>
          <div className="team-scoreboards">
            {teams.map((team) => <div className={`team-roster team-roster--${team.result}`} key={team.id}><header><span>{team.side === 'A' ? 'ATK' : 'DEF'}</span><strong>{team.name}</strong><em>{team.result}</em></header>{getParticipantsForTeam(match.id, team.id).map((entry) => <CombatantRow key={entry.playerId} match={match} {...entry} maxKills={maxKills} isMvp={entry.playerId === match.mvpPlayerId} onInspect={onInspectPlayer} />)}</div>)}
          </div>
        </motion.div>
      </AnimatePresence>
      <footer><span><Target size={13} /> Combat performance bars represent eliminations within this match.</span><span>Demo record // relational source</span></footer>
    </section>
  )
}

type SortKey = 'rating' | 'winRate' | 'kd'
export function BlacksiteLeaderboard({ selectedPlayerId, onInspect }: { selectedPlayerId: string | null; onInspect: (id: string) => void }) {
  const [sort, setSort] = useState<SortKey>('rating')
  const ranked = useMemo(() => [...leaderboard].sort((a, b) => b[sort] - a[sort]).slice(0, 5), [sort])
  return (
    <section className="blacksite-leaderboard" aria-label="Competitive leaderboard">
      <header className="section-cap"><div><span>04</span><h2>Competitive order</h2></div><div className="sort-control"><ArrowDownUp size={14} />{(['rating', 'winRate', 'kd'] as SortKey[]).map((key) => <button key={key} className={sort === key ? 'is-selected' : ''} onClick={() => setSort(key)}>{key === 'winRate' ? 'WIN %' : key.toUpperCase()}</button>)}</div></header>
      <div className="leader-grid-head"><span>Seed</span><span>Operator</span><span>Clearance</span><span>SR</span><span>Win</span><span>K/D</span></div>
      <div className="leader-list">{ranked.map((player, index) => <LeaderboardRow key={player.id} player={player} displayPosition={index + 1} selected={player.id === selectedPlayerId} onInspect={onInspect} />)}</div>
    </section>
  )
}

function LeaderboardRow({ player, displayPosition, selected, onInspect }: { player: LeaderboardEntry; displayPosition: number; selected: boolean; onInspect: (id: string) => void }) {
  return <motion.button className={`leader-row ${player.rank <= 3 ? `is-podium is-podium-${player.rank}` : ''} ${selected ? 'is-selected' : ''}`} layout onClick={() => onInspect(player.id)} aria-label={`Inspect ${player.username} player dossier`}><span className="leader-seed">{String(displayPosition).padStart(2, '0')}</span><span className="leader-identity"><i>{player.username.slice(0, 2)}</i><span><strong>{player.username}</strong><small>{player.callsign}</small></span></span><span className="leader-tier"><MiniTierMark tier={player.tier} /><strong>{player.tier}</strong></span><strong>{player.rating}</strong><span>{player.winRate}%</span><span>{player.kd.toFixed(2)}</span></motion.button>
}

type ChartMetric = 'rating' | 'kd' | 'winRate'
export function CombatTelemetry() {
  const [metric, setMetric] = useState<ChartMetric>('rating')
  const player = leaderboard[0]
  const data = getPlayerTrend(player.id)
  const config = {
    rating: { label: 'Rating progression', unit: 'SR', color: '#DCFC54', value: player.rating, domain: ['dataMin - 25', 'dataMax + 20'] as [string, string] },
    kd: { label: 'K/D trend', unit: 'K/D', color: '#FF6547', value: player.kd.toFixed(2), domain: [0.6, 2] as [number, number] },
    winRate: { label: 'Win conversion', unit: '%', color: '#AA91F5', value: player.winRate, domain: [0, 100] as [number, number] },
  }[metric]
  return (
    <section className="combat-telemetry" aria-label="Combat telemetry lab">
      <header className="section-cap"><div><span>05</span><h2>Combat telemetry lab</h2></div><div className="metric-switch" role="group" aria-label="Telemetry metric">{(['rating', 'kd', 'winRate'] as ChartMetric[]).map((key) => <button key={key} className={metric === key ? 'is-selected' : ''} onClick={() => setMetric(key)}>{key === 'winRate' ? 'WIN %' : key.toUpperCase()}</button>)}</div></header>
      <div className="telemetry-subhead"><div><span>Prime seed analysis</span><strong>{player.username}</strong></div><div><span>{config.label}</span><strong style={{ color: config.color }}>{config.value}<small>{config.unit}</small></strong></div></div>
      <div className="combat-chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data} margin={{ top: 12, right: 12, left: -12, bottom: 0 }}><defs><linearGradient id={`blacksite-${metric}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor={config.color} stopOpacity={.26} /><stop offset="1" stopColor={config.color} stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#45453F" strokeOpacity={.45} vertical={false} strokeDasharray="2 5" /><XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#858278', fontSize: 10, fontFamily: 'IBM Plex Mono' }} /><YAxis domain={config.domain} axisLine={false} tickLine={false} width={48} tick={{ fill: '#858278', fontSize: 10, fontFamily: 'IBM Plex Mono' }} /><Tooltip content={<TelemetryTooltip metric={metric} unit={config.unit} />} cursor={{ stroke: config.color, strokeOpacity: .5 }} /><Area type="monotone" dataKey={metric} stroke={config.color} strokeWidth={2.5} fill={`url(#blacksite-${metric})`} activeDot={{ r: 5, fill: '#0D0D0B', stroke: config.color, strokeWidth: 2 }} animationDuration={360} /></AreaChart></ResponsiveContainer></div>
      <footer>Derived cumulatively from {data.length} recorded 3v3 appearances.</footer>
    </section>
  )
}

function TelemetryTooltip({ active, payload, label, metric, unit }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; metric: ChartMetric; unit: string }) {
  if (!active || !payload?.length) return null
  return <div className="telemetry-tooltip"><span>{label} // {metric.toUpperCase()}</span><strong>{metric === 'kd' ? payload[0].value.toFixed(2) : payload[0].value}<small>{unit}</small></strong></div>
}

export function CombatActivity({ selectedId, onSelect }: { selectedId: string; onSelect: (match: Match) => void }) {
  const records = matches.map((match) => {
    const teams = getTeamsForMatch(match.id)
    const winner = teams.find((team) => team.result === 'victory')!
    const top = getTopEliminator(match.id)
    return { match, winner, top, mvp: getPlayer(match.mvpPlayerId) }
  })
  return (
    <section className="combat-activity" aria-label="Competitive activity feed">
      <header className="section-cap"><div><span>06</span><h2>Combat record</h2></div><span className="archive-label"><Radio size={13} /> Archived events</span></header>
      <div className="activity-timeline">{records.map(({ match, winner, top, mvp }) => <button key={match.id} className={selectedId === match.id ? 'is-selected' : ''} onClick={() => onSelect(match)} aria-pressed={selectedId === match.id}><span className="activity-time"><CalendarDays size={12} />{formatDate(match.playedAt)}</span><span className="activity-node"><i /></span><span className="activity-copy"><strong>{winner.name} secured {match.map}</strong><small>{match.id} // {getTeamsForMatch(match.id).map((team) => team.score).join('–')} final // {mvp.username} awarded MVP // {getPlayer(top.playerId).username} {top.kills} eliminations</small></span><ArrowRight size={15} /></button>)}</div>
      <footer><Activity size={13} /> Historical demo events only. No live connection is active.</footer>
    </section>
  )
}
