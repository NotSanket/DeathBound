import { Crosshair, ScanLine } from 'lucide-react'
import { useState } from 'react'
import { matches, validateDemoData } from '../data/demoData'
import type { Match } from '../data/models'
import { Leaderboard, MatchActivity, MatchScoreboard, MetricStrip, PerformanceChart, PlayerSpotlight } from '../components/OverviewSections'

export function Overview() {
  if (!validateDemoData()) throw new Error('Demo data violates the 3v3 match contract')
  const [selectedMatch, setSelectedMatch] = useState<Match>(matches[0])
  return (
    <div className="overview-page">
      <header className="command-header">
        <div className="command-header__copy">
          <div className="kicker"><span>Command surface</span><i /> <span>GNS // 01</span></div>
          <h1>Arena <span>Overview</span></h1>
          <p>Competitive performance. Quantified.</p>
        </div>
        <div className="command-geometry" aria-hidden="true">
          <div className="geo-rings"><Crosshair /><span>3V3</span></div>
          <div className="geo-coordinates"><ScanLine size={14} /><span>18.5204° N</span><span>73.8567° E</span></div>
        </div>
      </header>

      <MetricStrip />

      <div className="section-intro"><span>01</span><div><h2>Featured encounter</h2><p>Select a recent arena record to reconstruct its combat telemetry.</p></div><i /></div>

      <div className="overview-grid overview-grid--hero">
        <MatchScoreboard match={selectedMatch} />
        <PlayerSpotlight />
      </div>

      <div className="overview-grid overview-grid--analytics">
        <Leaderboard />
        <PerformanceChart />
      </div>

      <MatchActivity selectedId={selectedMatch.id} onSelect={setSelectedMatch} />
      <footer className="page-footer"><span>DEATHBOUND // COMPETITIVE INTELLIGENCE</span><span>PHASE 1 // LOCAL SIMULATION ENVIRONMENT</span></footer>
    </div>
  )
}
