import { motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

export function TacticalPanel({ children, className = '', label }: { children: ReactNode; className?: string; label?: string }) {
  return (
    <motion.section
      className={`tactical-panel ${className}`}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.38 }}
      aria-label={label}
    >
      <span className="panel-notch panel-notch--a" />
      <span className="panel-notch panel-notch--b" />
      {children}
    </motion.section>
  )
}

export function PanelHeader({ index, title, aside }: { index: string; title: string; aside?: ReactNode }) {
  return (
    <div className="panel-header">
      <div><span className="panel-index">{index}</span><h2>{title}</h2></div>
      {aside && <div className="panel-header__aside">{aside}</div>}
    </div>
  )
}

export function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const reduceMotion = useReducedMotion()
  const [shown, setShown] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!inView || reduceMotion) return
    let frame = 0
    const frames = 30
    const timer = window.setInterval(() => {
      frame += 1
      const eased = 1 - Math.pow(1 - frame / frames, 3)
      setShown(Math.round(value * eased))
      if (frame >= frames) window.clearInterval(timer)
    }, 22)
    return () => window.clearInterval(timer)
  }, [inView, reduceMotion, value])

  return <span ref={ref}>{shown.toLocaleString()}{suffix}</span>
}
