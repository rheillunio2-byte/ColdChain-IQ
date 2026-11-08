import React from 'react'
import { useReducedMotion } from 'framer-motion'
import { Area, AreaChart, CartesianGrid, ReferenceArea, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const COLORS = { normal: '#1f8a68', warning: '#d08a1c', critical: '#c4483f' }
const tick = { fill: '#7a877f', fontSize: 11, fontFamily: 'DM Sans, sans-serif' }

function Tip({ active, payload, label, band }) {
  if (!active || !payload?.length) return null
  const t = payload[0].value
  const ok = t >= band.low && t <= band.high
  return (
    <div className="chart-tip">
      <span className="tip-time">{label}</span>
      <strong>{Number(t).toFixed(1)}°C</strong>
      <span className={`tip-state ${ok ? 'normal' : 'warning'}`}><i />{ok ? 'Within range' : 'Outside range'}</span>
      <small>Limit {band.low}–{band.high}°C</small>
    </div>
  )
}

/** Temperature area chart. The line turns amber wherever it leaves the safe band. */
export default function TempChart({ data, band, id = 'temp', xInterval = 1 }) {
  const reduce = useReducedMotion()
  const vals = data.map((d) => d.temp)
  const dMin = Math.min(...vals)
  const dMax = Math.max(...vals)
  const span = dMax - dMin || 1
  const clamp = (v) => Math.min(1, Math.max(0, v))
  const offHigh = clamp((dMax - band.high) / span)
  const offLow = clamp((dMax - band.low) / span)
  const domain = [Math.floor(Math.min(dMin, band.low) - 1), Math.ceil(Math.max(dMax, band.high) + 1)]
  const pc = (v) => `${(v * 100).toFixed(1)}%`
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 14, right: 12, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id={`${id}-line`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.warning} /><stop offset={pc(offHigh)} stopColor={COLORS.warning} />
            <stop offset={pc(offHigh)} stopColor={COLORS.normal} /><stop offset={pc(offLow)} stopColor={COLORS.normal} />
            <stop offset={pc(offLow)} stopColor={COLORS.warning} /><stop offset="100%" stopColor={COLORS.warning} />
          </linearGradient>
          <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLORS.normal} stopOpacity={0.2} /><stop offset="100%" stopColor={COLORS.normal} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="2 6" vertical={false} stroke="#e4e8e2" />
        <ReferenceArea y1={band.low} y2={band.high} fill={COLORS.normal} fillOpacity={0.07} ifOverflow="extendDomain" />
        <ReferenceLine y={band.high} stroke={COLORS.warning} strokeDasharray="4 4" strokeOpacity={0.8} label={{ value: `${band.high}°C limit`, position: 'insideTopRight', fill: COLORS.warning, fontSize: 10, fontFamily: 'DM Sans, sans-serif' }} />
        <XAxis dataKey="time" tickLine={false} axisLine={false} tick={tick} interval={xInterval} tickMargin={8} />
        <YAxis domain={domain} allowDecimals={false} tickLine={false} axisLine={false} tick={tick} tickFormatter={(v) => `${v}°`} />
        <Tooltip content={<Tip band={band} />} cursor={{ stroke: '#9fb3a9', strokeDasharray: '3 3' }} />
        <Area type="monotone" dataKey="temp" name="Temperature" stroke={`url(#${id}-line)`} strokeWidth={2.75} fill={`url(#${id}-fill)`}
          isAnimationActive={!reduce} animationDuration={900} animationEasing="ease-out"
          activeDot={{ r: 5.5, fill: '#fff', stroke: COLORS.normal, strokeWidth: 2.5 }} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function ChartLegend() {
  return (
    <div className="legend" aria-label="Chart legend">
      <span><i className="lg lg-normal" />Within range</span>
      <span><i className="lg lg-warning" />Outside range</span>
      <span><i className="lg lg-band" />Safe band</span>
    </div>
  )
}
