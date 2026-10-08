import { BarChart3, Crosshair, Focus, FocusIcon, Gauge, LayoutDashboard, Search, Swords, Trophy, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { matches } from '../data/demoData'
import { useBlacksite } from '../context/BlacksiteContext'
import { BrandMark } from './Brand'
import { CommandPalette, PlayerDrawer } from './BlacksiteSystems'

const navItems = [
  { to: '/', label: 'Overview', code: 'OVR', icon: LayoutDashboard },
  { to: '/matches', label: 'Matches', code: 'MAT', icon: Swords },
  { to: '/players', label: 'Players', code: 'PLR', icon: Users },
  { to: '/rankings', label: 'Rankings', code: 'RNK', icon: Trophy },
  { to: '/analytics', label: 'Analytics', code: 'ANL', icon: BarChart3 },
]

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { focusMode, toggleFocusMode, openCommand, selectedMatchId } = useBlacksite()
  const current = navItems.find((item) => item.to === location.pathname)?.label ?? 'Overview'
  const selectedMatch = matches.find((match) => match.id === selectedMatchId) ?? matches[0]

  return (
    <div className={`app-shell ${focusMode ? 'is-focus-mode' : ''}`}>
      <aside className="command-rail">
        <BrandMark compact />
        <nav className="rail-nav" aria-label="Primary navigation">
          {navItems.map(({ to, label, code, icon: Icon }, index) => (
            <NavLink key={to} to={to} end={to === '/'} data-label={label} aria-label={label} className={({ isActive }) => `rail-link ${isActive ? 'is-active' : ''}`}>
              <span className="rail-index">0{index + 1}</span><Icon size={20} strokeWidth={1.55} aria-hidden="true" /><span className="rail-code">{code}</span>
            </NavLink>
          ))}
        </nav>
        <div className="rail-environment" aria-label="Local demo environment"><span>AP</span><i /><small>01</small></div>
      </aside>

      <div className="app-stage">
        <header className="command-strip">
          <div className="strip-sector"><Crosshair size={16} /><span>Sector</span><strong>{current}</strong></div>
          <div className="strip-record"><span>Selected record</span><strong>{selectedMatch.id}</strong><em>{selectedMatch.map}</em></div>
          <div className="strip-actions">
            <span className="demo-stamp">Simulated data</span>
            <button className="command-trigger" onClick={openCommand} aria-label="Open command palette"><Search size={15} /><span>Command</span><kbd>Ctrl K</kbd></button>
            <button className={`focus-trigger ${focusMode ? 'is-active' : ''}`} onClick={toggleFocusMode} aria-label={focusMode ? 'Exit focus mode' : 'Enter focus mode'}>{focusMode ? <FocusIcon size={17} /> : <Focus size={17} />}<span>{focusMode ? 'Exit focus' : 'Focus'}</span></button>
          </div>
        </header>
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 7 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} transition={{ duration: .2, ease: 'easeOut' }}>{children}</motion.div>
          </AnimatePresence>
        </main>
      </div>
      <CommandPalette />
      <PlayerDrawer />
      <div className="shell-corner" aria-hidden="true"><Gauge size={13} /><span>BLACKSITE // GNS-01</span></div>
    </div>
  )
}
