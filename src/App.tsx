import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/Shell'
import { Overview } from './pages/Overview'
import { Placeholder } from './pages/Placeholder'
import { BlacksiteProvider } from './context/BlacksiteContext'
import { ArenaDataProvider } from './context/ArenaDataContext'

export default function App() {
  return (
    <ArenaDataProvider>
      <BlacksiteProvider>
        <AppShell>
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/matches" element={<Placeholder title="Match Archive" code="MAT" />} />
            <Route path="/players" element={<Placeholder title="Player Registry" code="PLR" />} />
            <Route path="/rankings" element={<Placeholder title="Rank Operations" code="RNK" />} />
            <Route path="/analytics" element={<Placeholder title="Deep Analytics" code="ANL" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AppShell>
      </BlacksiteProvider>
    </ArenaDataProvider>
  )
}
