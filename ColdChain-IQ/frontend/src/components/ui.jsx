import React from 'react'
import { motion } from 'framer-motion'
import { cx, parseLimit, toneOf } from '../lib/utils'
import { ease, useCountUp } from '../lib/motion'

export function RiskBadge({ value }) {
  return <span className={`risk risk-${toneOf(value)}`}><i />{value} risk</span>
}

/** Numeric text that counts up once on mount. `value` is the display string, e.g. "02" or "91.7". */
export function CountUp({ value }) {
  const text = String(value)
  const num = parseFloat(text)
  const [int, frac = ''] = text.split('.')
  const n = useCountUp(Number.isFinite(num) ? num : 0, frac.length)
  if (!Number.isFinite(num)) return <>{text}</>
  const [i, f] = n.split('.')
  return <>{i.padStart(int.length, '0')}{f ? `.${f}` : ''}</>
}

/** Safe-range track with a marker at the current temperature. */
export function RangeGauge({ shipment: s, compact }) {
  const lim = parseLimit(s.limit)
  if (!lim) return null
  const lo = Math.min(lim.low, s.temp) - 1.5
  const hi = Math.max(lim.high, s.temp) + 1.5
  const span = hi - lo
  const pct = (v) => `${(((v - lo) / span) * 100).toFixed(2)}%`
  return (
    <div className={cx('gauge', compact && 'gauge-compact')} role="img" aria-label={`${s.temp}°C, safe range ${s.limit}`}>
      <div className="gauge-track">
        <span className="gauge-band" style={{ left: pct(lim.low), width: `${((lim.high - lim.low) / span) * 100}%` }} />
        <motion.span className={`gauge-marker ${toneOf(s.risk)}`} initial={{ left: pct(lim.low) }} animate={{ left: pct(s.temp) }} transition={{ duration: 0.9, ease, delay: 0.2 }} />
      </div>
      {!compact && <div className="gauge-scale"><span>{lim.low}°</span><span>Safe range</span><span>{lim.high}°</span></div>}
    </div>
  )
}

export function Skeleton({ h = 16, w = '100%', r }) {
  return <div className="skeleton" style={{ height: h, width: w, borderRadius: r }} aria-hidden="true" />
}

export function PageSkeleton() {
  return (
    <div className="page-skeleton" role="status" aria-label="Loading">
      <Skeleton h={28} w="34%" r={8} /><Skeleton h={14} w="52%" r={6} />
      <div className="skeleton-grid">{[0, 1, 2, 3].map((i) => <Skeleton key={i} h={110} r={18} />)}</div>
      <Skeleton h={300} r={18} />
    </div>
  )
}

export function EmptyState({ icon: Icon, title, text, action }) {
  return (
    <motion.div className="empty-state" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease }}>
      <span className="empty-icon"><Icon size={22} /></span>
      <strong>{title}</strong>
      <p>{text}</p>
      {action}
    </motion.div>
  )
}
