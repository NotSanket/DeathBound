import { motion } from 'motion/react'
import { useId } from 'react'
import type { SkillTier } from '../data/models'

const tierColor: Record<SkillTier, string> = {
  Bronze: '#B47B55',
  Silver: '#B7B4A8',
  Gold: '#D7B56D',
  Diamond: '#AA91F5',
  Elite: '#DCFC54',
}

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`brand-lockup ${compact ? 'brand-lockup--compact' : ''}`} aria-label="DEATHBOUND Blacksite">
      <motion.svg className="brand-mark" viewBox="0 0 56 64" role="img" aria-label="Deathbound Blacksite insignia" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
        <path className="brand-mark__frame" d="M28 2 52 15v34L28 62 4 49V15L28 2Z" />
        <path className="brand-mark__cut" d="M10 18h28l8 8v21L28 57 10 47V18Z" />
        <path className="brand-mark__core" d="M18 16h10c10 0 17 6 17 16s-7 16-17 16H18l7-8h4c5 0 8-3 8-8s-3-8-8-8h-4l-7-8Z" />
        <path className="brand-mark__slash" d="m31 7 6 3-17 47-6-3L31 7Z" />
      </motion.svg>
      {!compact && <div className="brand-copy"><span className="brand-name">DEATHBOUND</span><span className="brand-subtitle">Blacksite intelligence</span></div>}
    </div>
  )
}

export function RankEmblem({ tier, size = 'medium', label = true }: { tier: SkillTier; size?: 'small' | 'medium' | 'large'; label?: boolean }) {
  const gradientId = `rank-${useId().replace(/:/g, '')}`
  const color = tierColor[tier]
  const complexity = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Elite'].indexOf(tier) + 1
  return (
    <motion.div className={`rank-insignia rank-insignia--${size}`} initial={{ opacity: 0, scale: .88, rotate: -3 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: .38 }}>
      <svg viewBox="0 0 140 160" role="img" aria-label={`${tier} competitive rank insignia`}>
        <defs>
          <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#F1ECDD" stopOpacity=".88" />
            <stop offset=".32" stopColor={color} />
            <stop offset="1" stopColor={color} stopOpacity=".48" />
          </linearGradient>
        </defs>
        {complexity >= 3 && <path className="rank-wing" style={{ stroke: color }} d="M9 52 41 29l10 15-22 17 18 9-9 17L9 71Zm122 0L99 29 89 44l22 17-18 9 9 17 29-16Z" />}
        {complexity >= 4 && <path className="rank-orbit" style={{ stroke: color }} d="M20 103 4 119l38 13m78-29 16 16-38 13" />}
        <path className="rank-shield" style={{ stroke: `url(#${gradientId})` }} d="m70 9 39 25-7 74-32 42-32-42-7-74L70 9Z" />
        <path className="rank-shield-inner" style={{ stroke: color }} d="m70 24 25 17-6 59-19 29-19-29-6-59 25-17Z" />
        <path className="rank-spire" style={{ fill: `url(#${gradientId})` }} d="m70 36 21 69-21-17-21 17 21-69Z" />
        <path className="rank-void" d="m70 57 7 31-7-7-7 7 7-31Z" />
        {complexity >= 2 && <path className="rank-chevron" style={{ stroke: color }} d="m52 116 18 21 18-21" />}
        {complexity >= 5 && <><circle cx="70" cy="16" r="4" fill={color} /><path className="rank-crown" style={{ stroke: color }} d="m49 22 7-14 14 9L84 8l7 14" /></>}
      </svg>
      {label && <span style={{ color }}>{tier}</span>}
    </motion.div>
  )
}

export function MiniTierMark({ tier }: { tier: SkillTier }) {
  return <RankEmblem tier={tier} size="small" label={false} />
}
