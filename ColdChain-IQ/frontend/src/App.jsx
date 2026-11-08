import React, { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, ChevronRight, Download, Leaf, Package, Search, X } from 'lucide-react'
import { alerts as allAlerts, shipments } from './data'
import { cx, toCsv } from './lib/utils'
import { pageVariants, spring } from './lib/motion'
import TopBar from './components/TopBar'
import Overview from './components/Overview'
import ShipmentTable from './components/ShipmentTable'
import Reports from './components/Reports'
import { AlertPopover } from './components/AlertPanel'
import { PageSkeleton } from './components/ui'

const ShipmentDetail = lazy(() => import('./components/ShipmentDetail'))
const Analytics = lazy(() => import('./components/Analytics'))

const TABS = ['Overview', 'Shipments', 'Analytics', 'Reports']
const FILTERS = ['All shipments', 'In transit', 'At risk']
const BLURBS = {
  Shipments: 'Track conditions and delivery progress across every active load.',
  Analytics: 'Compliance trends and network insights across your cold chain.',
  Reports: 'Export compliance reports for completed and active shipments.',
}

function App() {
  const [tab, setTab] = useState('Overview')
  const [selected, setSelected] = useState(null)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All shipments')
  const [showAlerts, setShowAlerts] = useState(false)
  const [dismissed, setDismissed] = useState(() => new Set())

  const alerts = useMemo(() => allAlerts.filter((a) => !dismissed.has(a.id)), [dismissed])
  const alertCount = alerts.filter((a) => a.type !== 'info').length
  const visible = useMemo(() => shipments.filter((s) =>
    (filter === 'All shipments' || (filter === 'At risk' && s.risk !== 'Low') || (filter === 'In transit' && s.status === 'In transit')) &&
    `${s.id} ${s.name} ${s.origin} ${s.destination}`.toLowerCase().includes(query.toLowerCase())), [filter, query])

  const chooseTab = useCallback((t) => { setTab(t); setSelected(null); setShowAlerts(false) }, [])
  const openShipment = useCallback((s) => { setShowAlerts(false); setSelected(s) }, [])
  const dismiss = useCallback((id) => setDismissed((d) => new Set(d).add(id)), [])
  const resetFilters = () => { setQuery(''); setFilter('All shipments') }

  // Close the alerts popover on Escape or when clicking outside it.
  useEffect(() => {
    if (!showAlerts) return undefined
    const onKey = (e) => e.key === 'Escape' && setShowAlerts(false)
    const onDown = (e) => { if (!e.target.closest('[data-alerts-root]')) setShowAlerts(false) }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDown)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown) }
  }, [showAlerts])

  useEffect(() => { window.scrollTo({ top: 0 }) }, [tab, selected])

  const exportCsv = () => {
    const rows = [['Shipment', 'Product', 'Origin', 'Destination', 'Temperature °C', 'Humidity %', 'Risk', 'Shelf life days'],
      ...shipments.map((s) => [s.id, s.name, s.origin, s.destination, s.temp, s.humidity, s.risk, s.shelf])]
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([toCsv(rows)], { type: 'text/csv' }))
    a.download = 'coldchain-shipment-report.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const toggleAlerts = () => setShowAlerts((v) => !v)
  const pageKey = selected ? `detail-${selected.id}` : tab
  const showHeading = selected || tab !== 'Overview'

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <TopBar tabs={TABS} tab={tab} onTab={chooseTab} alertCount={alertCount} alertsOpen={showAlerts} onToggleAlerts={toggleAlerts}
        popover={<AlertPopover open={showAlerts} alerts={alerts} onClose={() => setShowAlerts(false)} onOpen={openShipment} onDismiss={dismiss} />} />
      <main className="main-content" id="main">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={pageKey} variants={pageVariants} initial="initial" animate="animate" exit="exit">
            {showHeading && (
              <div className="page-heading">
                <div>
                  <div className="eyebrow"><span className="eyebrow-dot" />OPERATIONS CENTER <span className="slash">/</span> {selected ? 'SHIPMENT' : tab.toUpperCase()}</div>
                  <h1>{selected ? 'Shipment overview' : tab}</h1>
                  <p>{selected ? `Live conditions and journey details for ${selected.id}.` : BLURBS[tab]}</p>
                </div>
                <div className="heading-actions">
                  <button className="button button-quiet" onClick={toggleAlerts} data-alerts-root><Bell size={16} /> Alerts {alertCount > 0 && <span className="alert-count">{alertCount}</span>}</button>
                  {(selected || tab !== 'Shipments') && <button className="button button-dark" onClick={() => chooseTab('Shipments')}><Package size={16} /> View shipments <ChevronRight size={15} /></button>}
                </div>
              </div>
            )}
            <Suspense fallback={<PageSkeleton />}>
              {selected ? <ShipmentDetail shipment={selected} onBack={() => setSelected(null)} />
                : tab === 'Overview' ? (
                  <Overview alerts={alerts} onSelect={openShipment} onTab={chooseTab} onDismiss={dismiss}
                    onAtRisk={() => { setFilter('At risk'); setTab('Shipments') }} onOpenShipments={() => chooseTab('Shipments')} />
                ) : tab === 'Shipments' ? (
                  <section className="panel shipments-panel full-table">
                    <div className="section-head">
                      <div><div className="section-kicker">FLEET MANAGEMENT</div><h2>All shipments</h2><p>Track conditions and delivery progress in one place</p></div>
                      <button className="button button-dark" onClick={exportCsv}><Download size={16} /> Export report</button>
                    </div>
                    <div className="table-controls">
                      <div className="search-box">
                        <Search size={16} />
                        <input placeholder="Search shipment, product, route..." aria-label="Search shipments" value={query} onChange={(e) => setQuery(e.target.value)} />
                        {query && <button className="clear-search" onClick={() => setQuery('')} aria-label="Clear search"><X size={14} /></button>}
                      </div>
                      <div className="filter-tabs" role="group" aria-label="Filter shipments">
                        {FILTERS.map((f) => (
                          <button key={f} className={cx(filter === f && 'selected-filter')} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                            {filter === f && <motion.span layoutId="filter-pill" className="filter-pill" transition={spring} />}<span>{f}</span>
                          </button>
                        ))}
                      </div>
                      <span className="result-count">{visible.length} of {shipments.length}</span>
                    </div>
                    <ShipmentTable rows={visible} onSelect={openShipment} onReset={resetFilters} />
                  </section>
                ) : tab === 'Analytics' ? <Analytics /> : <Reports onExport={exportCsv} />}
            </Suspense>
          </motion.div>
        </AnimatePresence>
        <footer><span>© 2026 ColdChain IQ</span><span><span className="footer-live" /> All systems operational</span><span>Built for a safer supply chain <Leaf size={13} /></span></footer>
      </main>
    </div>
  )
}
export default App
