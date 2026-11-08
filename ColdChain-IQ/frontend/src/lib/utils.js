export const cx = (...v) => v.filter(Boolean).join(' ')

/** "−2–2°C" or "1–5°C" -> { low, high } (null if it can't be parsed). */
export function parseLimit(text) {
  const parts = String(text).replace(/−/g, '-').replace(/°C/g, '').split('–').map(Number)
  return parts.length === 2 && parts.every(Number.isFinite) ? { low: parts[0], high: parts[1] } : null
}

/** Maps the existing risk levels onto the three visual states used across the UI. */
const TONES = { Low: 'normal', High: 'warning', Critical: 'critical' }
export const toneOf = (risk) => TONES[risk] || 'normal'

export const shipmentIdFrom = (text = '') => (text.match(/CC-\d+/) || [])[0]

export function greeting(date = new Date()) {
  const h = date.getHours()
  return h < 12 ? 'Good morning, team.' : h < 18 ? 'Good afternoon, team.' : 'Good evening, team.'
}

const csvCell = (v) => {
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}
export const toCsv = (rows) => rows.map((r) => r.map(csvCell).join(',')).join('\n')
