import { ArrowRight, BarChart3, Focus, Gauge, LayoutDashboard, Map, Search, Shield, Swords, Trophy, User, Users, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getLeaderboardPlayer, getMap, getPlayerMatches, getPlayerTrend, getTeamsForMatch, matches, participants, players, tierDefinitions } from '../data/demoData'
import type { Match, SkillTier } from '../data/models'
import { useBlacksite } from '../context/BlacksiteContext'
import { RankEmblem } from './Brand'

const navActions = [
  { id: 'nav-overview', label: 'Arena overview', meta: 'Navigate', path: '/', icon: LayoutDashboard },
  { id: 'nav-matches', label: 'Match archive', meta: 'Navigate', path: '/matches', icon: Swords },
  { id: 'nav-players', label: 'Player registry', meta: 'Navigate', path: '/players', icon: Users },
  { id: 'nav-rankings', label: 'Rank operations', meta: 'Navigate', path: '/rankings', icon: Trophy },
  { id: 'nav-analytics', label: 'Combat analytics', meta: 'Navigate', path: '/analytics', icon: BarChart3 },
]

export function CommandPalette() {
  const navigate = useNavigate()
  const { commandOpen, closeCommand, inspectPlayer, selectMatch, toggleFocusMode, focusMode } = useBlacksite()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const actions = useMemo(() => [
    ...navActions.map((action) => ({ ...action, keywords: action.label, run: () => navigate(action.path) })),
    ...players.map((player) => ({ id: `player-${player.id}`, label: player.username, meta: `${player.callsign} // Player dossier`, keywords: `${player.username} ${player.callsign}`, icon: User, run: () => { inspectPlayer(player.id); navigate('/') } })),
    ...matches.map((match) => ({ id: `match-${match.id}`, label: match.id, meta: `${match.map} // Match record`, keywords: `${match.id} ${match.map}`, icon: Map, run: () => { selectMatch(match.id); navigate('/') } })),
    { id: 'focus', label: focusMode ? 'Exit focus mode' : 'Enter focus mode', meta: 'Interface command', keywords: 'focus immersive scoreboard', icon: Focus, run: toggleFocusMode },
  ], [focusMode, inspectPlayer, navigate, selectMatch, toggleFocusMode])

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return actions.filter((action) => !needle || `${action.label} ${action.meta} ${action.keywords}`.toLowerCase().includes(needle)).slice(0, 9)
  }, [actions, query])

  useEffect(() => {
    if (!commandOpen) return
    const focusTimer = window.setTimeout(() => {
      setQuery('')
      setActiveIndex(0)
      inputRef.current?.focus()
    }, 20)
    return () => window.clearTimeout(focusTimer)
  }, [commandOpen])

  const runAction = (index: number) => {
    const action = filtered[index]
    if (!action) return
    action.run()
    closeCommand()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') closeCommand()
    if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, filtered.length - 1)) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)) }
    if (event.key === 'Enter') { event.preventDefault(); runAction(activeIndex) }
  }

  return (
    <AnimatePresence>
      {commandOpen && (
        <motion.div className="command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="overlay-dismiss" onClick={closeCommand} aria-label="Close command palette" />
          <motion.div className="command-palette" role="dialog" aria-modal="true" aria-label="Blacksite command palette" initial={{ opacity: 0, y: -18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .99 }}>
            <div className="command-palette__head"><span>CMD</span><strong>Blacksite quick action</strong><kbd>ESC</kbd></div>
            <label className="command-search"><Search size={19} /><input ref={inputRef} value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} onKeyDown={onKeyDown} placeholder="Search operators, records, or commands…" aria-label="Search commands" /></label>
            <div className="command-results" role="listbox" aria-label="Available commands">
              {filtered.map((action, index) => {
                const Icon = action.icon
                return <button key={action.id} className={activeIndex === index ? 'is-active' : ''} role="option" aria-selected={activeIndex === index} onMouseEnter={() => setActiveIndex(index)} onClick={() => runAction(index)}><Icon size={17} /><span><strong>{action.label}</strong><small>{action.meta}</small></span><ArrowRight size={14} /></button>
              })}
              {!filtered.length && <div className="command-empty">No Blacksite record matches that query.</div>}
            </div>
            <div className="command-palette__foot"><span><kbd>↑↓</kbd> Select</span><span><kbd>↵</kbd> Execute</span><span>Demo database // {players.length} players // {matches.length} matches</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function PlayerDrawer() {
  const { selectedPlayerId, closePlayer } = useBlacksite()
  const closeRef = useRef<HTMLButtonElement>(null)
  const player = selectedPlayerId ? getLeaderboardPlayer(selectedPlayerId) : null
  const history = player ? getPlayerMatches(player.id).slice(0, 4) : []
  const trend = player ? getPlayerTrend(player.id) : []

  useEffect(() => {
    if (!selectedPlayerId) return
    closeRef.current?.focus()
    const onKeyDown = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape') closePlayer() }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [closePlayer, selectedPlayerId])

  return (
    <AnimatePresence>
      {player && (
        <motion.div className="drawer-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button className="drawer-scrim" onClick={closePlayer} aria-label="Close player dossier" />
          <motion.aside className="player-drawer" role="dialog" aria-modal="true" aria-labelledby="dossier-title" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: .28, ease: [0.22, 1, .36, 1] }}>
            <header className="dossier-head"><div><span>Operator dossier</span><strong>DB // {player.id.toUpperCase()}</strong></div><button ref={closeRef} onClick={closePlayer} aria-label="Close dossier"><X size={19} /></button></header>
            <div className="dossier-identity">
              <div className="dossier-monogram">{player.username.slice(0, 2)}</div>
              <div><span>{player.callsign} // {player.countryCode}</span><h2 id="dossier-title">{player.username}</h2><p>Ranked competitor record</p></div>
              <RankEmblem tier={player.tier} size="medium" />
            </div>
            <div className="dossier-rankline"><div><span>Global seed</span><strong>#{String(player.rank).padStart(2, '0')}</strong></div><div><span>Skill rating</span><strong>{player.rating}</strong></div><div><span>Clearance</span><strong className="tier-text">{player.tier}</strong></div></div>
            <section className="dossier-section"><div className="dossier-section__title"><span>01</span><h3>Lifetime telemetry</h3></div><div className="dossier-stats"><div><span>Matches</span><strong>{player.matches}</strong></div><div><span>Wins</span><strong>{player.wins}</strong></div><div><span>Kills</span><strong>{player.kills}</strong></div><div><span>Deaths</span><strong>{player.deaths}</strong></div><div><span>Assists</span><strong>{player.assists}</strong></div><div><span>K / D</span><strong>{player.kd.toFixed(2)}</strong></div><div className="dossier-stat--wide"><span>Win conversion</span><strong>{player.winRate}%</strong><i><b style={{ width: `${player.winRate}%` }} /></i></div></div></section>
            <section className="dossier-section"><div className="dossier-section__title"><span>02</span><h3>Performance vector</h3></div><div className="dossier-vector" aria-label="Player rating progression">{trend.map((point) => <i key={point.matchId} style={{ height: `${28 + ((point.rating - 1200) / 450) * 72}%` }}><span>{point.rating}</span></i>)}</div></section>
            <section className="dossier-section"><div className="dossier-section__title"><span>03</span><h3>Recent records</h3></div><div className="dossier-history">{history.map((match) => { const record = participants.find((entry) => entry.matchId === match.id && entry.playerId === player.id)!; const team = getTeamsForMatch(match.id).find((entry) => entry.id === record.teamId)!; return <div key={match.id}><span className={`history-result history-result--${team.result}`}>{team.result === 'victory' ? 'W' : 'L'}</span><span><strong>{match.id}</strong><small>{match.map}</small></span><span>{record.kills}/{record.deaths}/{record.assists}</span></div> })}</div></section>
            <footer>Simulated competitor intelligence // Local demo records</footer>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function MapIntelligence({ match }: { match: Match }) {
  const map = getMap(match.map)
  return (
    <section className="map-intel" aria-label={`Map intelligence for ${map.name}`}>
      <header><div><span>02 // Map intelligence</span><h2>{map.name}</h2></div><strong>{map.code}</strong></header>
      <div className="map-canvas">
        <svg viewBox="0 0 320 230" role="img" aria-label={`Abstract top-down schematic of ${map.name}`}>
          <path className="map-boundary" d="M33 38 93 15h135l59 38v124l-68 37H83l-50-43Z" />
          {map.configuration === 'cross' && <><path d="M60 92h72V40h57v52h72v50h-72v49h-57v-49H60Z" /><path d="m91 67 138 102M229 67 91 169" /></>}
          {map.configuration === 'vault' && <><rect x="58" y="45" width="204" height="141" rx="3" /><rect x="91" y="72" width="138" height="87" /><path d="M160 45v141M58 115h204" /></>}
          {map.configuration === 'split' && <><path d="M53 48h96v54H89v80H53Zm214 0h-96v54h60v80h36Z" /><path d="M149 72h22v90h-22Z" /></>}
          {map.configuration === 'ring' && <><circle cx="160" cy="115" r="76" /><circle cx="160" cy="115" r="38" /><path d="M84 115H42m236 0h-42M160 39V15m0 200v-24" /></>}
          {map.configuration === 'spine' && <><path d="m55 162 42-94 36 22 31-52 42 54 58-23 8 93-61-17-47 45-43-47Z" /><path d="m82 139 165-47M114 83l98 66" /></>}
          <circle className="map-node" cx="64" cy="115" r="5" /><circle className="map-node" cx="256" cy="115" r="5" /><circle className="map-core" cx="160" cy="115" r="7" />
        </svg>
        <div className="map-scanline" />
        <span className="map-a">A</span><span className="map-b">B</span>
      </div>
      <dl><div><dt>Configuration</dt><dd>{map.configuration}</dd></div><div><dt>Sector</dt><dd>{map.sector}</dd></div><div><dt>Record</dt><dd>{match.id}</dd></div></dl>
      <p>Abstract arena plan // informational schematic // no positional telemetry</p>
    </section>
  )
}

export function RankProgression({ playerId }: { playerId: string }) {
  const player = getLeaderboardPlayer(playerId)
  const [inspected, setInspected] = useState<SkillTier>(player.tier)
  const currentIndex = tierDefinitions.findIndex((tier) => tier.id === player.tier)
  const current = tierDefinitions[currentIndex]
  const next = tierDefinitions[currentIndex + 1]
  const previousThreshold = current.threshold
  const span = next ? next.threshold - previousThreshold : 1
  const progress = next ? Math.min(100, ((player.rating - previousThreshold) / span) * 100) : 100
  const inspectedTier = tierDefinitions.find((tier) => tier.id === inspected)!
  return (
    <section className="rank-progression" aria-label="Rank ascension system">
      <header><span>Rank ascension // Demo thresholds</span><h2>Clearance ladder</h2></header>
      <div className="rank-current"><RankEmblem tier={player.tier} size="large" /><div><span>Current clearance</span><h3>{player.tier}</h3><strong>{player.rating} SR</strong><p>{next ? `${next.threshold - player.rating} SR to ${next.id}` : 'Maximum demo tier secured'}</p></div></div>
      <div className="rank-meter"><i><motion.b initial={{ width: 0 }} whileInView={{ width: `${progress}%` }} viewport={{ once: true }} /></i><span>{previousThreshold}</span><span>{next?.threshold ?? 'MAX'}</span></div>
      <div className="tier-ladder" role="group" aria-label="Inspect rank tiers">{tierDefinitions.map((tier) => <button key={tier.id} className={`${tier.id === inspected ? 'is-selected' : ''} ${tier.id === player.tier ? 'is-current' : ''}`} onClick={() => setInspected(tier.id)} aria-pressed={tier.id === inspected}><RankEmblem tier={tier.id} size="small" label={false} /><span>{tier.id}</span></button>)}</div>
      <div className="tier-description"><Shield size={15} /><div><strong>{inspectedTier.id} // {inspectedTier.threshold}+ SR</strong><p>{inspectedTier.description}</p></div></div>
      <footer><Gauge size={13} /> Prototype ranking thresholds are demonstrative, not official matchmaking logic.</footer>
    </section>
  )
}
