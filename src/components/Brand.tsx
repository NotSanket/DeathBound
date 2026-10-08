import { motion } from 'motion/react'

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`} aria-label="DEATHBOUND">
      <motion.svg
        className="brand-mark"
        viewBox="0 0 48 48"
        role="img"
        aria-label="Deathbound insignia"
        initial={{ opacity: 0, rotate: -8 }}
        animate={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 0.45 }}
      >
        <path className="brand-mark__frame" d="M24 2 44 14v20L24 46 4 34V14L24 2Z" />
        <path className="brand-mark__core" d="M13 13h12c7 0 12 4 12 11s-5 11-12 11H13l6-6h6c3 0 5-2 5-5s-2-5-5-5h-6l-6-6Z" />
        <path className="brand-mark__slash" d="m28 7 4 2-13 32-4-2L28 7Z" />
      </motion.svg>
      <div className="brand-copy">
        <span className="brand-name">DEATHBOUND</span>
        {!compact && <span className="brand-subtitle">Competitive Intelligence</span>}
      </div>
    </div>
  )
}

export function RankEmblem({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      className={`rank-emblem ${className}`}
      viewBox="0 0 180 210"
      role="img"
      aria-label="Apex tier competitive emblem"
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.15 }}
    >
      <defs>
        <linearGradient id="goldEdge" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#FFF0B8" />
          <stop offset="0.48" stopColor="#E7BD71" />
          <stop offset="1" stopColor="#8A6430" />
        </linearGradient>
        <linearGradient id="darkCore" x1="0" x2="0" y1="0" y2="1">
          <stop stopColor="#243243" />
          <stop offset="1" stopColor="#0A0D13" />
        </linearGradient>
      </defs>
      <path className="emblem-wing" d="M9 58 53 28l13 15-32 26 25 12-10 18L9 80Z" />
      <path className="emblem-wing" d="m171 58-44-30-13 15 32 26-25 12 10 18 40-19Z" />
      <path fill="url(#darkCore)" stroke="url(#goldEdge)" strokeWidth="5" d="m90 15 48 34-9 86-39 54-39-54-9-86 48-34Z" />
      <path fill="none" stroke="#E7BD71" strokeOpacity=".36" d="m90 30 33 24-8 74-25 40-25-40-8-74 33-24Z" />
      <path fill="url(#goldEdge)" d="m90 45 27 72-27-15-27 15 27-72Z" />
      <path fill="#111821" d="m90 65 9 36-9-6-9 6 9-36Z" />
      <path className="emblem-glyph" d="m54 147-24 16 36 11m60-27 24 16-36 11" />
      <circle cx="90" cy="141" r="4" fill="#F1EEE6" />
    </motion.svg>
  )
}

export function MiniTierMark({ tier }: { tier: string }) {
  return (
    <span className={`mini-tier mini-tier--${tier.toLowerCase()}`} aria-hidden="true">
      <i />
    </span>
  )
}
