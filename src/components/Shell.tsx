import { Activity, BarChart3, Crosshair, LayoutDashboard, Swords, Trophy, Users } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { BrandMark } from './Brand'

const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/matches', label: 'Matches', icon: Swords },
  { to: '/players', label: 'Players', icon: Users },
  { to: '/rankings', label: 'Rankings', icon: Trophy },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const current = navItems.find((item) => item.to === location.pathname)?.label ?? 'Overview'

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <BrandMark />
        <div className="nav-label"><span>01</span> Arena Operations</div>
        <nav className="primary-nav" aria-label="Primary navigation">
          {navItems.map(({ to, label, icon: Icon }, index) => (
            <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => `nav-item ${isActive ? 'is-active' : ''}`}>
              <span className="nav-index">0{index + 1}</span>
              <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
              <span>{label}</span>
              <span className="nav-chevron" aria-hidden="true" />
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-system">
          <div className="system-signal"><Activity size={13} /><span>System nominal</span><i /></div>
          <dl>
            <div><dt>Region</dt><dd>AP-SOUTH</dd></div>
            <div><dt>Build</dt><dd>GEN.01.6</dd></div>
            <div><dt>Sync</dt><dd>LOCAL</dd></div>
          </dl>
        </div>
      </aside>

      <div className="app-stage">
        <header className="topbar">
          <div className="topbar-section">
            <Crosshair size={15} aria-hidden="true" />
            <span className="eyebrow">Current sector</span>
            <strong>{current}</strong>
          </div>
          <div className="topbar-meta">
            <span>OP // GNS-01</span>
            <span className="mode-indicator"><i /> Analysis Mode</span>
            <span className="demo-badge">Demo Data</span>
          </div>
        </header>
        <main className="main-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
