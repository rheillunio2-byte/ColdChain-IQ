import React, { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertTriangle, ChevronRight, Clock3, Package, Radio, ShieldCheck, Thermometer, Truck, Zap } from 'lucide-react'
import { shipments, temperatureHistory } from '../data'
import { cx, greeting, toneOf } from '../lib/utils'
import { ease, rise, stagger } from '../lib/motion'
import Metric from './Metric'
import ShipmentTable from './ShipmentTable'
import TempChart, { ChartLegend } from './TempChart'
import { AlertFeed } from './AlertPanel'
import { CountUp, RiskBadge } from './ui'

const RANGES = [['6 h', 6], ['12 h', 12], ['All', temperatureHistory.length]]
const BAND = { low: temperatureHistory[0].safeLow, high: temperatureHistory[0].safeHigh }

function FleetHero({ counts, total, onShipments }) {
  const parts = [['normal', 'Normal', counts.normal], ['warning', 'Warning', counts.warning], ['critical', 'Critical', counts.critical]]
  return (
    <motion.section className="hero" variants={rise}>
      <div className="hero-copy">
        <div className="eyebrow on-dark"><span className="eyebrow-dot" />OPERATIONS CENTER <span className="slash">/</span> OVERVIEW</div>
        <h1>{greeting()}</h1>
        <p>Here’s what’s happening across your cold chain today.</p>
        <button className="button button-light" onClick={onShipments}><Package size={16} /> View shipments <ChevronRight size={15} /></button>
      </div>
      <div className="hero-status" aria-label="Fleet condition">
        <div className="hero-status-top"><span>FLEET CONDITION</span><strong><CountUp value={String(total)} /> shipments tracked</strong></div>
        <div className="fleet-bar" role="img" aria-label={parts.map(([, l, n]) => `${n} ${l.toLowerCase()}`).join(', ')}>
          {parts.filter(([, , n]) => n > 0).map(([tone, , n], i) => (
            <motion.span key={tone} className={`seg ${tone}`} style={{ flexGrow: n }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.1 }} />
          ))}
        </div>
        <div className="fleet-legend">{parts.map(([tone, label, n]) => <span key={tone}><i className={tone} /><b>{n}</b> {label}</span>)}</div>
      </div>
    </motion.section>
  )
}

function RiskRing({ count, total }) {
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className="risk-ring">
      <svg viewBox="0 0 80 80" aria-hidden="true">
        <circle cx="40" cy="40" r={r} className="ring-bg" />
        <motion.circle cx="40" cy="40" r={r} className="ring-fg" strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - count / Math.max(total, 1)) }} transition={{ duration: 1, ease, delay: 0.3 }} />
      </svg>
      <div><strong>{count}</strong><span>shipments</span></div>
    </div>
  )
}

export default function Overview({ alerts, onSelect, onTab, onAtRisk, onOpenShipments, onDismiss }) {
  const [range, setRange] = useState(RANGES[2][0])
  const counts = useMemo(() => shipments.reduce((a, s) => ({ ...a, [toneOf(s.risk)]: a[toneOf(s.risk)] + 1 }), { normal: 0, warning: 0, critical: 0 }), [])
  const atRisk = shipments.filter((s) => s.risk !== 'Low')
  const n = RANGES.find(([l]) => l === range)[1]
  const data = useMemo(() => temperatureHistory.slice(-n), [n])
  const avg = data.reduce((a, d) => a + d.temp, 0) / data.length
  const latest = data[data.length - 1].temp
  const inBand = latest >= BAND.low && latest <= BAND.high
  return (
    <motion.div variants={stagger} initial="initial" animate="animate" className="stack">
      <FleetHero counts={counts} total={shipments.length} onShipments={onOpenShipments} />
      <section className="metric-grid">
        <Metric label="Active shipments" value="24" change="8.2%" sub="vs. last 7 days" icon={Truck} tone="green" />
        <Metric label="Within safe range" value="91.7" unit="%" change="2.4%" sub="vs. last 7 days" icon={ShieldCheck} tone="blue" />
        <Metric label="At-risk shipments" value={String(atRisk.length).padStart(2, '0')} change="1 shipment" sub="needs attention" icon={AlertTriangle} tone="amber" />
        <Metric label="Avg. temperature" value="3.8" unit="°C" change="0.3°C" sub="network average" icon={Thermometer} tone="violet" />
      </section>
      <section className="dashboard-grid">
        <motion.div className="panel chart-panel" variants={rise}>
          <div className="section-head">
            <div><div className="section-kicker">ENVIRONMENTAL TELEMETRY</div><h2>Temperature overview</h2><p>Network-wide temperature readings across active shipments</p></div>
            <div className="segmented" role="group" aria-label="Chart range">
              {RANGES.map(([l]) => (
                <button key={l} className={cx(range === l && 'is-on')} aria-pressed={range === l} onClick={() => setRange(l)}>
                  {range === l && <motion.span layoutId="range-pill" className="seg-pill" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}<span>{l}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="chart-summary">
            <strong>{avg.toFixed(1)}°C</strong><small>Average this period</small>
            <span className={cx('state-chip', inBand ? 'normal' : 'warning')}><i />Latest {latest.toFixed(1)}°C · {inBand ? 'within range' : 'outside range'}</span>
          </div>
          <div className="chart-wrap"><TempChart data={data} band={BAND} id="ov" xInterval={n > 12 ? 2 : 1} /></div>
          <div className="chart-caption"><ChartLegend /><span>Updated just now <span className="refresh-dot" /></span></div>
        </motion.div>
        <motion.div className="panel risk-panel" variants={rise}>
          <div className="section-head compact"><div><div className="section-kicker">ATTENTION REQUIRED</div><h2>Risk watch</h2></div><span className="tiny-count">{String(atRisk.length).padStart(2, '0')}</span></div>
          <div className="risk-feature">
            <RiskRing count={atRisk.length} total={shipments.length} />
            <div><strong>Need your attention</strong><p>Temperature excursions detected in {atRisk.length} active loads.</p><button className="text-link" onClick={onAtRisk}>Review at-risk loads <ChevronRight size={14} /></button></div>
          </div>
          {atRisk.map((s) => (
            <button className="risk-item" key={s.id} onClick={() => onSelect(s)}>
              <span className={`risk-mini ${toneOf(s.risk)}`}><Thermometer size={16} /></span>
              <span className="risk-item-copy"><strong>{s.name}</strong><small>{s.id} · {s.temp}°C</small></span>
              <RiskBadge value={s.risk} /><ChevronRight size={15} />
            </button>
          ))}
          <div className="risk-note"><Zap size={14} /> Alerts are evaluated against product-specific thresholds.</div>
        </motion.div>
      </section>
      <motion.section className="panel shipments-panel" variants={rise}>
        <div className="section-head"><div><div className="section-kicker">LIVE FLEET</div><h2>Shipment activity</h2><p>Latest readings from connected cold-chain units</p></div><button className="button button-quiet" onClick={() => onTab('Shipments')}>All shipments <ChevronRight size={15} /></button></div>
        <ShipmentTable rows={shipments.slice(0, 5)} onSelect={onSelect} />
      </motion.section>
      <motion.div variants={rise}><AlertFeed alerts={alerts} onOpen={onSelect} onDismiss={onDismiss} /></motion.div>
      <motion.section className="bottom-strip" variants={rise}>
        <div className="bottom-copy"><div className="bottom-icon"><Activity size={18} /></div><div><strong>Every degree matters.</strong><p>Continuous monitoring helps protect product quality from dispatch to delivery.</p></div></div>
        <div className="bottom-meta"><span><Radio size={15} /> 28 devices connected</span><span><Clock3 size={15} /> Last sync 12 sec ago</span></div>
      </motion.section>
    </motion.div>
  )
}
