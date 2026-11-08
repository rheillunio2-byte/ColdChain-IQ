import React from 'react'
import { useReducedMotion, motion } from 'framer-motion'
import { Activity, ShieldCheck, Thermometer } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { rise, stagger } from '../lib/motion'

const DATA = [{ day: 'Mon', safe: 94, exc: 6 }, { day: 'Tue', safe: 96, exc: 4 }, { day: 'Wed', safe: 91, exc: 9 }, { day: 'Thu', safe: 97, exc: 3 }, { day: 'Fri', safe: 93, exc: 7 }, { day: 'Sat', safe: 98, exc: 2 }, { day: 'Sun', safe: 96, exc: 4 }]
const AVG = DATA.reduce((a, d) => a + d.safe, 0) / DATA.length
const tick = { fill: '#7a877f', fontSize: 11, fontFamily: 'DM Sans, sans-serif' }

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="chart-tip">
      <span className="tip-time">{label}</span>
      <strong>{d.safe}% compliant</strong>
      <span className="tip-state warning"><i />{d.exc}% outside range</span>
    </div>
  )
}

export default function Analytics() {
  const reduce = useReducedMotion()
  return (
    <motion.div className="analytics-grid" variants={stagger} initial="initial" animate="animate">
      <motion.div variants={rise} className="panel chart-panel">
        <div className="section-head">
          <div><div className="section-kicker">WEEKLY PERFORMANCE</div><h2>Temperature compliance</h2><p>Percentage of readings within each product's configured safe range</p></div>
          <span className="big-stat">{AVG.toFixed(1)}%</span>
        </div>
        <div className="chart-wrap">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 12, right: 8, left: -18, bottom: 0 }} barCategoryGap="28%">
              <CartesianGrid strokeDasharray="2 6" vertical={false} stroke="#e4e8e2" />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tick={tick} tickMargin={8} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={tick} tickFormatter={(v) => `${v}%`} />
              <Tooltip content={<Tip />} cursor={{ fill: '#1f8a6812' }} />
              <ReferenceLine y={AVG} stroke="#d08a1c" strokeDasharray="4 4" label={{ value: 'Weekly average', position: 'insideTopRight', fill: '#d08a1c', fontSize: 10 }} />
              <Bar dataKey="safe" stackId="c" fill="#1f8a68" name="Compliant readings" isAnimationActive={!reduce} animationDuration={800} />
              <Bar dataKey="exc" stackId="c" fill="#e7b9b4" radius={[6, 6, 0, 0]} name="Outside range" isAnimationActive={!reduce} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="chart-caption"><div className="legend"><span><i className="lg lg-normal" />Compliant readings</span><span><i className="lg lg-critical-soft" />Outside range</span></div></div>
      </motion.div>
      <motion.div variants={rise} className="panel analytics-insights">
        <div className="section-kicker">NETWORK INSIGHTS</div><h2>Small shifts. Better outcomes.</h2>
        <div className="insight"><span className="insight-icon"><ShieldCheck /></span><div><strong>98.4% delivery compliance</strong><p>Completed loads stayed within configured limits for most of their journey.</p></div></div>
        <div className="insight"><span className="insight-icon amber"><Thermometer /></span><div><strong>2 loads need intervention</strong><p>Fresh milk and pork cuts are currently outside their safe temperature bands.</p></div></div>
        <div className="insight"><span className="insight-icon blue"><Activity /></span><div><strong>28 sensors reporting</strong><p>Telemetry coverage is healthy across connected transport units.</p></div></div>
      </motion.div>
    </motion.div>
  )
}
