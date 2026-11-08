import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, CheckCircle2, ChevronRight, Clock3, Droplets, MapPin, Package, Radio, Thermometer, Truck } from 'lucide-react'
import { temperatureHistory } from '../data'
import { parseLimit, toneOf } from '../lib/utils'
import { ease, rise, stagger } from '../lib/motion'
import TempChart, { ChartLegend } from './TempChart'
import { RangeGauge, RiskBadge } from './ui'

const FALLBACK_BAND = { low: 0, high: 4 }

export default function ShipmentDetail({ shipment: s, onBack }) {
  const tone = toneOf(s.risk)
  const band = parseLimit(s.limit) || FALLBACK_BAND
  return (
    <motion.div className="detail-view stack" variants={stagger} initial="initial" animate="animate">
      <motion.button variants={rise} className="back-link" onClick={onBack}><ArrowLeft size={15} /> Back to operations</motion.button>
      <motion.div variants={rise} className={`detail-top panel tone-${tone}`}>
        <div className="detail-product">
          <span className={`product-icon large ${s.color}`}><Package size={23} /></span>
          <div><div className="section-kicker">{s.id} · {s.category.toUpperCase()}</div><h2>{s.name}</h2><p>{s.origin} <ChevronRight size={13} /> {s.destination}</p></div>
        </div>
        <div className="detail-top-right">
          <RiskBadge value={s.risk} />
          <span className="status-label"><i /> {s.status}</span>
          <span className="sensor-update"><Radio size={13} /> Last sensor update · {s.updated}</span>
        </div>
      </motion.div>
      <section className="detail-metrics">
        <motion.div variants={rise} className={`panel detail-metric temp-feature tone-${tone}`}>
          <div className="dm-label"><Thermometer size={16} /><span>Current temperature</span></div>
          <strong className={`temp-${tone}`}>{s.temp}°C</strong>
          <RangeGauge shipment={s} />
          <small>Safe range {s.limit}</small>
        </motion.div>
        <motion.div variants={rise} className="panel detail-metric"><div className="dm-label"><Droplets size={16} /><span>Relative humidity</span></div><strong>{s.humidity}%</strong><small>Live sensor reading</small></motion.div>
        <motion.div variants={rise} className="panel detail-metric"><div className="dm-label"><Clock3 size={16} /><span>Estimated shelf life</span></div><strong>{s.shelf} days</strong><small>Model estimate</small></motion.div>
        <motion.div variants={rise} className="panel detail-metric"><div className="dm-label"><MapPin size={16} /><span>Estimated arrival</span></div><strong className="eta-value">{s.eta}</strong><small>{s.carrier}</small></motion.div>
      </section>
      <section className="detail-columns">
        <motion.div variants={rise} className="panel chart-panel">
          <div className="section-head">
            <div><div className="section-kicker">SENSOR HISTORY</div><h2>Temperature trend</h2><p>Recorded readings over the last {temperatureHistory.length} hours</p></div>
          </div>
          <div className="chart-wrap detail-chart"><TempChart data={temperatureHistory} band={band} id="detail" xInterval={1} /></div>
          <div className="chart-caption"><ChartLegend /><span>Limits shown for {s.limit}</span></div>
          <p className="chart-note">Sample telemetry series. Connect the API to chart per-shipment sensor history.</p>
        </motion.div>
        <div className="detail-side">
          <motion.div variants={rise} className={`panel risk-assess tone-${tone}`}>
            <div className="section-kicker">RISK ASSESSMENT</div>
            <div className="risk-score"><strong>{s.riskScore}</strong><span>/ 100</span><RiskBadge value={s.risk} /></div>
            <div className="meter" role="img" aria-label={`Risk score ${s.riskScore} out of 100`}><motion.span className={tone} initial={{ width: 0 }} animate={{ width: `${s.riskScore}%` }} transition={{ duration: 0.9, ease, delay: 0.3 }} /></div>
            <p>{s.shelf} days estimated shelf life remaining.</p>
          </motion.div>
          <motion.div variants={rise} className="panel journey-panel">
            <div className="section-kicker">DELIVERY JOURNEY</div><h2>Shipment progress</h2>
            <div className="progress-line"><motion.span initial={{ width: 0 }} animate={{ width: `${s.progress}%` }} transition={{ duration: 1, ease, delay: 0.3 }} /></div>
            <div className="progress-meta"><strong>{s.progress}% complete</strong><span>{s.eta}</span></div>
            <div className="milestones">
              <div className="milestone done"><i><CheckCircle2 size={14} /></i><div><strong>Shipment dispatched</strong><small>{s.origin} · Departure confirmed</small></div></div>
              <div className="milestone active"><i><Truck size={14} /></i><div><strong>In transit</strong><small>{s.vehicle} · GPS tracking active</small></div></div>
              <div className="milestone"><i><MapPin size={14} /></i><div><strong>Delivery destination</strong><small>{s.destination} · Estimated arrival {s.eta}</small></div></div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
