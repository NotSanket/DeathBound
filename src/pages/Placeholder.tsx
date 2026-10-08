import { ArrowLeft, Construction, ScanLine } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Placeholder({ title, code }: { title: string; code: string }) {
  return (
    <div className="placeholder-page">
      <div className="placeholder-visual" aria-hidden="true"><ScanLine /><span>{code}</span><i /></div>
      <span className="kicker"><Construction size={13} /> Phase 02 allocation</span>
      <h1>{title}</h1>
      <p>This operational module is staged for Phase 2. The visual foundation and navigation contract are active; live controls remain intentionally offline.</p>
      <Link to="/"><ArrowLeft size={15} /> Return to arena overview</Link>
    </div>
  )
}
