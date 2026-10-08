import { ChevronRight, Command, Crosshair, ScanLine } from 'lucide-react'
import { dashboardTotals, matches, validateDemoData } from '../data/demoData'
import { useBlacksite } from '../context/BlacksiteContext'
import { MapIntelligence, RankProgression } from '../components/BlacksiteSystems'
import { ArenaScoreboard, BlacksiteLeaderboard, CombatActivity, CombatTelemetry, TelemetryBand } from '../components/OverviewSections'

export function Overview() {
  if (!validateDemoData()) throw new Error('Demo data violates the 3v3 match contract')
  const { selectedMatchId, selectMatch, inspectPlayer, selectedPlayerId, focusMode, openCommand } = useBlacksite()
  const selectedIndex = Math.max(0, matches.findIndex((match) => match.id === selectedMatchId))
  const selectedMatch = matches[selectedIndex]
  const cycle = (direction: number) => selectMatch(matches[(selectedIndex + direction + matches.length) % matches.length].id)

  return (
    <div className={`blacksite-overview ${focusMode ? 'is-focused' : ''}`}>
      <header className="blacksite-briefing">
        <div className="briefing-code"><span>DB</span><strong>01</strong><i /></div>
        <div className="briefing-copy"><span className="overline">Arena operations // Blacksite intelligence</span><h1>Combat<br /><em>overview</em></h1><p>Completed 3v3 records distilled into competitive intelligence.</p></div>
        <div className="briefing-command">
          <div className="target-mark" aria-hidden="true"><Crosshair /><span>3V3</span></div>
          <dl><div><dt>Operation</dt><dd>GENESIS // 01</dd></div><div><dt>Data mode</dt><dd>LOCAL SIMULATION</dd></div><div><dt>Integrity</dt><dd>6 / 6 VERIFIED</dd></div></dl>
          <button onClick={openCommand}><Command size={15} /> Open command field <ChevronRight size={14} /></button>
        </div>
        <ScanLine className="briefing-scan" aria-hidden="true" />
      </header>

      <div className="overview-secondary"><TelemetryBand /></div>

      <div className="record-switcher" role="group" aria-label="Select match record">
        <span>Active archive record</span>
        {matches.map((match, index) => <button key={match.id} className={match.id === selectedMatch.id ? 'is-selected' : ''} onClick={() => selectMatch(match.id)} aria-pressed={match.id === selectedMatch.id}><small>0{index + 1}</small><strong>{match.id}</strong><em>{match.map}</em></button>)}
      </div>

      <div className="arena-layout">
        <ArenaScoreboard match={selectedMatch} onPrevious={() => cycle(-1)} onNext={() => cycle(1)} onInspectPlayer={inspectPlayer} />
        <MapIntelligence match={selectedMatch} />
      </div>

      <div className="overview-secondary intelligence-grid">
        <BlacksiteLeaderboard selectedPlayerId={selectedPlayerId} onInspect={inspectPlayer} />
        <RankProgression playerId={dashboardTotals.leader.id} />
      </div>

      <div className="overview-secondary analysis-grid">
        <CombatTelemetry />
        <CombatActivity selectedId={selectedMatch.id} onSelect={(match) => selectMatch(match.id)} />
      </div>

      <footer className="blacksite-footer"><span>DEATHBOUND // BLACKSITE COMPETITIVE INTELLIGENCE</span><span>PHASE 1.5 // SIMULATED DATA // {matches.length} VERIFIED RECORDS</span></footer>
    </div>
  )
}
