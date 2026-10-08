import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/Shell'
import { Overview } from './pages/Overview'
import { Placeholder } from './pages/Placeholder'

export default function App() {
  return (
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
  )
}
