import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, ChevronDown, Menu, Snowflake, X } from 'lucide-react'
import { cx } from '../lib/utils'
import { ease, spring } from '../lib/motion'

export default function TopBar({ tabs, tab, onTab, alertCount, onToggleAlerts, alertsOpen, popover }) {
  const [menu, setMenu] = useState(false)
  useEffect(() => {
    if (!menu) return undefined
    const onKey = (e) => e.key === 'Escape' && setMenu(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menu])
  const pick = (t) => { setMenu(false); onTab(t) }
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <button className="brand" onClick={() => pick('Overview')} aria-label="ColdChain IQ — Overview">
          <span className="brand-mark"><Snowflake size={20} /></span>
          <span>coldchain<span className="brand-iq">IQ</span></span>
        </button>
        <nav className="main-nav" aria-label="Primary">
          {tabs.map((t) => (
            <button key={t} className={cx(tab === t && 'nav-active')} aria-current={tab === t ? 'page' : undefined} onClick={() => pick(t)}>
              {t}
              {tab === t && <motion.span layoutId="nav-underline" className="nav-underline" transition={spring} />}
            </button>
          ))}
        </nav>
        <div className="top-actions">
          <div className="live-indicator"><i />Systems operational</div>
          <div className="alerts-anchor" data-alerts-root>
            <button className={cx('icon-button notification', alertsOpen && 'is-open')} onClick={onToggleAlerts} aria-label={`Alerts${alertCount ? `, ${alertCount} active` : ''}`} aria-expanded={alertsOpen}>
              <Bell size={18} />{alertCount > 0 && <b />}
            </button>
            {popover}
          </div>
          <div className="avatar" aria-hidden="true">RL</div>
          <div className="profile"><strong>R. Logistics</strong><span>Operations team</span></div>
          <ChevronDown size={15} className="muted profile-caret" aria-hidden="true" />
          <button className="icon-button menu-button" onClick={() => setMenu(!menu)} aria-label={menu ? 'Close menu' : 'Open menu'} aria-expanded={menu}>
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav className="mobile-nav" aria-label="Mobile"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto', transition: { duration: 0.28, ease } }} exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}>
            <div className="mobile-nav-inner">
              {tabs.map((t, i) => (
                <motion.button key={t} className={cx(tab === t && 'nav-active')} onClick={() => pick(t)}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.04 * i, duration: 0.25, ease } }}>{t}</motion.button>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
