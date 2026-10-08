import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useArenaData } from './ArenaDataContext'

interface BlacksiteState {
  selectedMatchId: string
  selectMatch: (matchId: string) => void
  selectedPlayerId: string | null
  inspectPlayer: (playerId: string) => void
  closePlayer: () => void
  focusMode: boolean
  toggleFocusMode: () => void
  commandOpen: boolean
  openCommand: () => void
  closeCommand: () => void
}

const BlacksiteContext = createContext<BlacksiteState | null>(null)

export function BlacksiteProvider({ children }: { children: ReactNode }) {
  const { matches } = useArenaData()
  const [selectedMatchId, setSelectedMatchId] = useState(matches[0].id)
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null)
  const [focusMode, setFocusMode] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!matches.some((match) => match.id === selectedMatchId)) setSelectedMatchId(matches[0].id)
  }, [matches, selectedMatchId])

  const value = useMemo<BlacksiteState>(() => ({
    selectedMatchId,
    selectMatch: setSelectedMatchId,
    selectedPlayerId,
    inspectPlayer: setSelectedPlayerId,
    closePlayer: () => setSelectedPlayerId(null),
    focusMode,
    toggleFocusMode: () => setFocusMode((active) => !active),
    commandOpen,
    openCommand: () => setCommandOpen(true),
    closeCommand: () => setCommandOpen(false),
  }), [commandOpen, focusMode, selectedMatchId, selectedPlayerId])

  return <BlacksiteContext.Provider value={value}>{children}</BlacksiteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useBlacksite() {
  const context = useContext(BlacksiteContext)
  if (!context) throw new Error('useBlacksite must be used inside BlacksiteProvider')
  return context
}
