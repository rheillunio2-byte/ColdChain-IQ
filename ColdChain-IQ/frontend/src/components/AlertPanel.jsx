import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertTriangle, BellOff, CheckCircle2, ChevronRight, Clock3, Thermometer, X } from 'lucide-react'
import { shipments } from '../data'
import { cx, shipmentIdFrom } from '../lib/utils'
import { ease } from '../lib/motion'
import { EmptyState, RangeGauge } from './ui'

const ICONS = { critical: AlertTriangle, warning: Thermometer, info: CheckCircle2 }
const LABELS = { critical: 'Critical', warning: 'Warning', info: 'Info' }

export function AlertCard({ alert: a, compact, onOpen, onDismiss }) {
  const ship = shipments.find((s) => s.id === shipmentIdFrom(a.detail))
  const Icon = ICONS[a.type] || CheckCircle2
  return (
    <motion.article
      className={cx('alert-card', a.type, compact && 'compact')}
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.4, ease } }}
      exit={{ opacity: 0, x: 36, transition: { duration: 0.2 } }}
    >
      <span className="alert-symbol"><Icon size={16} /></span>
      <div className="alert-body">
        <div className="alert-head"><strong>{a.title}</strong><span className="alert-sev">{LABELS[a.type]}</span></div>
        <p>{a.detail}</p>
        {ship && a.type !== 'info' && <RangeGauge shipment={ship} compact />}
        <div className="alert-foot">
          <small><Clock3 size={11} /> {a.time}</small>
          {ship && <button className="text-link" onClick={() => onOpen(ship)}>View shipment <ChevronRight size={13} /></button>}
        </div>
      </div>
      <button className="alert-dismiss" aria-label={`Dismiss: ${a.title}`} onClick={() => onDismiss(a.id)}><X size={14} /></button>
    </motion.article>
  )
}

export function AlertPopover({ open, alerts, onClose, onOpen, onDismiss }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="alert-popover" role="dialog" aria-label="Recent alerts"
          initial={{ opacity: 0, y: -8, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.25, ease } }}
          exit={{ opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.15 } }}>
          <div className="popover-head"><strong>Recent alerts</strong><button className="icon-button" onClick={onClose} aria-label="Close alerts"><X size={16} /></button></div>
          <div className="popover-list">
            <AnimatePresence initial={false}>
              {alerts.map((a) => <AlertCard key={a.id} alert={a} compact onOpen={(s) => { onClose(); onOpen(s) }} onDismiss={onDismiss} />)}
            </AnimatePresence>
            {alerts.length === 0 && <EmptyState icon={BellOff} title="All clear" text="No active alerts right now." />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function AlertFeed({ alerts, onOpen, onDismiss }) {
  return (
    <section className="panel alert-feed">
      <div className="section-head">
        <div><div className="section-kicker">ALERT FEED</div><h2>Latest alerts</h2><p>Evaluated against each product's configured temperature limits</p></div>
      </div>
      <div className="alert-grid">
        <AnimatePresence initial={false}>
          {alerts.map((a) => <AlertCard key={a.id} alert={a} onOpen={onOpen} onDismiss={onDismiss} />)}
        </AnimatePresence>
      </div>
      {alerts.length === 0 && <EmptyState icon={BellOff} title="All clear" text="No active alerts. New excursions will appear here." />}
    </section>
  )
}
