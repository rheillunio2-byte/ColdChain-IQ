import React from 'react'
import { motion } from 'framer-motion'
import { ArrowDownRight } from 'lucide-react'
import { rise } from '../lib/motion'
import { CountUp } from './ui'

export default function Metric({ label, value, unit, change, sub, icon: Icon, tone = 'green' }) {
  return (
    <motion.div className="metric panel" variants={rise} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="metric-top"><span>{label}</span><span className={`metric-icon ${tone}`}><Icon size={17} /></span></div>
      <div className="metric-value"><CountUp value={value} /><small>{unit}</small></div>
      <div className="metric-foot"><span className="positive"><ArrowDownRight size={13} />{change}</span><span>{sub}</span></div>
    </motion.div>
  )
}
