import React from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, Package, SearchX } from 'lucide-react'
import { toneOf } from '../lib/utils'
import { rise, stagger } from '../lib/motion'
import { EmptyState, RangeGauge, RiskBadge } from './ui'

const onKey = (fn) => (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn() } }

export default function ShipmentTable({ rows, onSelect, onReset }) {
  if (rows.length === 0) {
    return (
      <EmptyState icon={SearchX} title="No shipments match" text="Try a different search term or clear the filters."
        action={onReset && <button className="button button-quiet" onClick={onReset}>Clear filters</button>} />
    )
  }
  return (
    <>
      <div className="table-scroll table-desktop">
        <table>
          <caption className="sr-only">Shipments with current temperature, humidity, shelf life and risk</caption>
          <thead><tr><th>SHIPMENT / PRODUCT</th><th>ROUTE</th><th>TEMPERATURE</th><th>HUMIDITY</th><th>SHELF LIFE</th><th>RISK STATUS</th><th><span className="sr-only">Open</span></th></tr></thead>
          <motion.tbody variants={stagger} initial="initial" animate="animate">
            {rows.map((s) => (
              <motion.tr key={s.id} variants={rise} tabIndex={0} onClick={() => onSelect(s)} onKeyDown={onKey(() => onSelect(s))} aria-label={`Open ${s.name}, ${s.id}`}>
                <td><div className="product-cell"><span className={`product-icon ${s.color}`}><Package size={17} /></span><span><strong>{s.name}</strong><small>{s.id} · {s.category}</small></span></div></td>
                <td><div className="route-cell"><strong>{s.origin}</strong><span><i /> {s.destination}</span></div></td>
                <td><div className="temp-cell"><strong className={`temp-${toneOf(s.risk)}`}>{s.temp}°C</strong><RangeGauge shipment={s} compact /></div><small className="cell-sub">Range {s.limit}</small></td>
                <td><strong>{s.humidity}%</strong><small className="cell-sub">Relative humidity</small></td>
                <td><strong>{s.shelf} days</strong><small className="cell-sub">Estimated remaining</small></td>
                <td><RiskBadge value={s.risk} /><small className="cell-sub">Updated {s.updated}</small></td>
                <td><span className="row-arrow" aria-hidden="true"><ChevronRight size={17} /></span></td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>
      <motion.div className="ship-cards" variants={stagger} initial="initial" animate="animate">
        {rows.map((s) => (
          <motion.button key={s.id} variants={rise} className="ship-card" onClick={() => onSelect(s)} aria-label={`Open ${s.name}, ${s.id}`}>
            <div className="ship-card-top">
              <span className={`product-icon ${s.color}`}><Package size={17} /></span>
              <span className="ship-card-title"><strong>{s.name}</strong><small>{s.id} · {s.category}</small></span>
              <RiskBadge value={s.risk} />
            </div>
            <div className="ship-card-temp"><strong className={`temp-${toneOf(s.risk)}`}>{s.temp}°C</strong><span>Range {s.limit}</span></div>
            <RangeGauge shipment={s} compact />
            <div className="ship-card-meta"><span>{s.origin} → {s.destination}</span><span>{s.shelf} d shelf life · {s.humidity}% RH</span></div>
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
