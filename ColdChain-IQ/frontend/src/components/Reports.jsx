import React from 'react'
import { motion } from 'framer-motion'
import { Download, ShieldCheck } from 'lucide-react'
import { rise, stagger } from '../lib/motion'

const STATS = [['Compliance rate', '98.4%', 'Across completed shipments'], ['Reports available', '128', 'Last 90 days'], ['Excursions logged', '07', 'Across all product types']]

export default function Reports({ onExport }) {
  return (
    <motion.section className="panel report-panel" variants={stagger} initial="initial" animate="animate">
      <motion.div variants={rise} className="report-art">
        <div className="report-art-icon"><ShieldCheck size={34} /></div>
        <span>COMPLIANCE INTELLIGENCE</span>
        <h2>Confidence in every delivery.</h2>
        <p>Generate a shipment-level temperature compliance report, complete with excursion windows, sensor readings, and route details.</p>
        <button className="button button-light" onClick={onExport}><Download size={16} /> Export shipment report</button>
      </motion.div>
      <div className="report-stats">
        {STATS.map(([label, value, sub]) => <motion.div key={label} variants={rise}><span>{label}</span><strong>{value}</strong><small>{sub}</small></motion.div>)}
      </div>
    </motion.section>
  )
}
