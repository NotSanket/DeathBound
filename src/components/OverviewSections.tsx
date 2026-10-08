import { Activity, ArrowDownUp, Award, CalendarDays, Clock3, Crosshair, MapPinned, Target, TrendingUp, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import {
  dashboardTotals,
  getParticipantsForTeam,
  getPlayer,
  getTeamsForMatch,
  leaderboard,
  matches,
  ratingHistory,
} from '../data/demoData'
import type { LeaderboardEntry, Match } from '../data/models'
import { MiniTierMark, RankEmblem } from './Brand'
import { AnimatedNumber, PanelHeader, TacticalPanel } from './Primitives'

const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
const formatDate = (date: string) => new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit' }).format(new Date(date)).toUpperCase()

export function MetricStrip() {
  const metrics = [
    { label: 'Registered players', value: dashboardTotals.players, code: 'PLR', accent: 'intel', icon: Users },
    { label: 'Matches recorded', value: dashboardTotals.matches, code: 'MAT', accent: 'mint', icon: Target },
    { label: 'Total eliminations', value: dashboardTotals.eliminations, code: 'ELM', accent: 'coral', icon: Crosshair },
  ]
  return (
    <section className="metric-strip" aria-label="Arena telemetry">
      {metrics.map(({ label, value, code, accent, icon: Icon }, index) => (
        <motion.div className={`metric-cell accent-${accent}`} key={label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
          <div className="metric-cell__meta"><Icon size={14} /><span>{code}</span></div>
          <strong><AnimatedNumber value={value} /></strong>
          <span>{label}</span>
        </motion.div>
      ))}
      <div className="metric-cell metric-cell--leader accent-gold">
        <div className="metric-cell__meta"><Award size={14} /><span>RANK 01</span></div>
        <strong>{dashboardTotals.leader.username}</strong>
        <span>Highest-ranked competitor</span>
      </div>
    </section>
  )
}

function PlayerRow({ entry, match, isMvp }: { entry: ReturnType<typeof getParticipantsForTeam>[number]; match: Match; isMvp: boolean }) {
  const player = getPlayer(entry.playerId)
  return (
    <motion.div className={`score-player ${isMvp ? 'is-mvp' : ''}`} whileHover={{ x: 3 }} transition={{ duration: 0.15 }}>
      <span className="player-avatar">{player.username.slice(0, 2)}</span>
      <div className="score-player__identity">
        <strong>{player.username}</strong>
        <span>{player.callsign}{isMvp ? ' // MATCH MVP' : ''}</span>
      </div>
      <span>{entry.kills}</span><span>{entry.deaths}</span><span>{entry.assists}</span>
      <span className="score-player__kd">{(entry.kills / Math.max(entry.deaths, 1)).toFixed(2)}</span>
      <span className="sr-only">{match.id}</span>
    </motion.div>
  )
}

export function MatchScoreboard({ match }: { match: Match }) {
  const teams = getTeamsForMatch(match.id)
  const winner = teams.find((team) => team.result === 'victory')!
  return (
    <TacticalPanel className="scoreboard" label={`Featured match ${match.id}`}>
      <div className="scoreboard-topline">
        <div><span className="live-pip" /> Finalized encounter</div>
        <span>{match.id} // VERIFIED</span>
      </div>
      <div className="match-stage">
        <div className="team-title team-title--a">
          <span>Attacking formation</span><strong>{teams[0]?.name}</strong><em>{teams[0]?.result}</em>
        </div>
        <div className="central-score">
          <div className="score-numbers"><motion.strong key={`${match.id}-a`} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{teams[0]?.score}</motion.strong><span>:</span><motion.strong key={`${match.id}-b`} initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>{teams[1]?.score}</motion.strong></div>
          <div className="match-location"><MapPinned size={14} />{match.map}</div>
          <div className="match-time"><Clock3 size={12} /> {formatDuration(match.durationSeconds)}</div>
        </div>
        <div className="team-title team-title--b">
          <span>Defensive formation</span><strong>{teams[1]?.name}</strong><em>{teams[1]?.result}</em>
        </div>
      </div>
      <div className="winner-ribbon"><span>Winning unit</span><strong>{winner.name}</strong><i /></div>
      <div className="score-tables">
        {teams.map((team) => (
          <div className={`team-table team-table--${team.result}`} key={team.id}>
            <div className="score-head"><span>Combatant</span><span>K</span><span>D</span><span>A</span><span>K/D</span></div>
            {getParticipantsForTeam(match.id, team.id).map((entry) => (
              <PlayerRow key={entry.playerId} entry={entry} match={match} isMvp={entry.playerId === match.mvpPlayerId} />
            ))}
          </div>
        ))}
      </div>
    </TacticalPanel>
  )
}

export function PlayerSpotlight() {
  const player = leaderboard[0]
  const recent = ratingHistory.map((point) => point.rating)
  const min = Math.min(...recent)
  const max = Math.max(...recent)
  return (
    <TacticalPanel className="spotlight" label="Elite player spotlight">
      <PanelHeader index="02" title="Elite player" aside={<span>Season 01</span>} />
      <div className="spotlight-emblem-wrap"><RankEmblem /></div>
      <div className="spotlight-rank"><span>Global position</span><strong>#0{player.rank}</strong></div>
      <div className="spotlight-name"><span>{player.callsign}</span><h3>{player.username}</h3><div><MiniTierMark tier={player.tier} /> {player.tier} // Prime</div></div>
      <div className="spotlight-stats">
        <div><span>Rating</span><strong>{player.rating}</strong></div>
        <div><span>K / D</span><strong>{player.kd.toFixed(2)}</strong></div>
        <div><span>Win rate</span><strong>{player.winRate}%</strong></div>
      </div>
      <div className="trend-block">
        <div><span>Recent performance vector</span><strong><TrendingUp size={13} /> +{max - min} SR</strong></div>
        <div className="spark-bars" aria-label="Rising recent performance trend">
          {recent.map((value, index) => <i key={value} style={{ height: `${24 + ((value - min) / Math.max(max - min, 1)) * 76}%` }}><span>Week {index + 1}</span></i>)}
        </div>
      </div>
    </TacticalPanel>
  )
}

type SortKey = 'rating' | 'winRate' | 'kd'
export function Leaderboard() {
  const [sort, setSort] = useState<SortKey>('rating')
  const ranked = useMemo(() => [...leaderboard].sort((a, b) => b[sort] - a[sort]).slice(0, 5), [sort])
  return (
    <TacticalPanel className="leaderboard-panel" label="Competitive leaderboard">
      <PanelHeader index="03" title="Competitive leaderboard" aside={<div className="sort-control"><ArrowDownUp size={12} /><span>Sort</span>{(['rating', 'winRate', 'kd'] as SortKey[]).map((key) => <button className={sort === key ? 'is-selected' : ''} onClick={() => setSort(key)} key={key}>{key === 'winRate' ? 'Win %' : key.toUpperCase()}</button>)}</div>} />
      <div className="leaderboard-head"><span>Pos</span><span>Competitor</span><span>Tier</span><span>Rating</span><span>Win</span><span>K/D</span></div>
      <div className="leaderboard-body">
        {ranked.map((player, index) => <LeaderboardRow player={player} displayPosition={index + 1} key={player.id} />)}
      </div>
    </TacticalPanel>
  )
}

function LeaderboardRow({ player, displayPosition }: { player: LeaderboardEntry; displayPosition: number }) {
  return (
    <motion.div className={`leader-row ${player.rank === 1 ? 'is-top' : ''}`} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} whileHover={{ x: 3 }}>
      <span className="leader-pos">{String(displayPosition).padStart(2, '0')}</span>
      <div className="leader-player"><span>{player.username.slice(0, 2)}</span><div><strong>{player.username}</strong><small>{player.callsign}</small></div></div>
      <span className="tier-cell"><MiniTierMark tier={player.tier} />{player.tier}</span>
      <strong className="numeric">{player.rating}</strong><span className="numeric">{player.winRate}%</span><span className="numeric">{player.kd.toFixed(2)}</span>
    </motion.div>
  )
}

type ChartMetric = 'kd' | 'rating'
export function PerformanceChart() {
  const [metric, setMetric] = useState<ChartMetric>('rating')
  const color = metric === 'rating' ? '#52D6C4' : '#97ABDA'
  const domain = metric === 'rating' ? ['dataMin - 35', 'dataMax + 25'] : [0.8, 2]
  return (
    <TacticalPanel className="chart-panel" label="Performance intelligence">
      <PanelHeader index="04" title="Performance intelligence" aside={<div className="metric-switch" role="group" aria-label="Chart metric">{(['rating', 'kd'] as ChartMetric[]).map((key) => <button key={key} className={metric === key ? 'is-selected' : ''} onClick={() => setMetric(key)}>{key === 'rating' ? 'Rating progression' : 'K/D trend'}</button>)}</div>} />
      <div className="chart-context"><span><i style={{ background: color }} />{metric === 'rating' ? 'Skill rating' : 'Elimination ratio'}</span><strong>{metric === 'rating' ? leaderboard[0]?.rating : leaderboard[0]?.kd.toFixed(2)}</strong></div>
      <div className="chart-wrap">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={ratingHistory} margin={{ top: 10, right: 8, left: -22, bottom: 0 }}>
            <defs><linearGradient id={`chart-${metric}`} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity={0.28} /><stop offset="100%" stopColor={color} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid stroke="#2A3543" strokeOpacity={0.58} vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: '#748091', fontSize: 10, fontFamily: 'Manrope' }} dy={8} />
            <YAxis domain={domain} axisLine={false} tickLine={false} tick={{ fill: '#748091', fontSize: 10, fontFamily: 'Manrope' }} width={56} />
            <Tooltip content={<ChartTooltip metric={metric} />} cursor={{ stroke: '#526170', strokeDasharray: '3 3' }} />
            <Area type="monotone" dataKey={metric} stroke={color} strokeWidth={2.4} fill={`url(#chart-${metric})`} activeDot={{ r: 5, fill: '#0A0D13', stroke: color, strokeWidth: 2 }} animationDuration={500} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </TacticalPanel>
  )
}

function ChartTooltip({ active, payload, label, metric }: { active?: boolean; payload?: Array<{ value: number }>; label?: string; metric: ChartMetric }) {
  if (!active || !payload?.length) return null
  return <div className="chart-tooltip"><span>{label} // SAMPLE</span><strong>{metric === 'kd' ? payload[0].value.toFixed(2) : payload[0].value}</strong><small>{metric === 'kd' ? 'K/D RATIO' : 'SKILL RATING'}</small></div>
}

export function MatchActivity({ selectedId, onSelect }: { selectedId: string; onSelect: (match: Match) => void }) {
  return (
    <TacticalPanel className="activity-panel" label="Recent arena activity">
      <PanelHeader index="05" title="Recent arena activity" aside={<span className="activity-status"><Activity size={12} /> Local record</span>} />
      <div className="activity-head"><span>Match</span><span>Map / date</span><span>Score</span><span>Result</span><span>MVP</span></div>
      <div className="activity-list">
        {matches.slice(0, 5).map((match) => {
          const teams = getTeamsForMatch(match.id)
          const winner = teams.find((team) => team.result === 'victory')!
          return (
            <button className={`activity-row ${selectedId === match.id ? 'is-selected' : ''}`} onClick={() => onSelect(match)} key={match.id} aria-pressed={selectedId === match.id}>
              <span><i />{match.id}</span>
              <span><strong>{match.map}</strong><small><CalendarDays size={10} />{formatDate(match.playedAt)}</small></span>
              <span className="activity-score">{teams[0]?.score}<em>:</em>{teams[1]?.score}</span>
              <span className="result-label">{winner.name}</span>
              <span className="activity-mvp"><Award size={12} />{getPlayer(match.mvpPlayerId).username}</span>
            </button>
          )
        })}
      </div>
    </TacticalPanel>
  )
}
