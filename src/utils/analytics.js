const DEFAULT_PLAUSIBLE_SRC = 'https://plausible.io/js/script.js'
const DEFAULT_PLAUSIBLE_DOMAIN = 'albertodeveloper.github.io'

let analyticsInitialized = false

function getPlausibleDomain() {
  return import.meta.env.VITE_PLAUSIBLE_DOMAIN || DEFAULT_PLAUSIBLE_DOMAIN
}

function getPlausibleScriptSource() {
  return import.meta.env.VITE_PLAUSIBLE_SCRIPT_SRC || DEFAULT_PLAUSIBLE_SRC
}

export function initializeAnalytics() {
  if (typeof window === 'undefined' || analyticsInitialized) return

  const src = getPlausibleScriptSource()
  const domain = getPlausibleDomain()
  if (!src || !domain) return

  const existing = document.querySelector(`script[data-analytics="plausible"][src="${src}"]`)
  if (existing) {
    analyticsInitialized = true
    return
  }

  const script = document.createElement('script')
  script.defer = true
  script.src = src
  script.setAttribute('data-domain', domain)
  script.setAttribute('data-analytics', 'plausible')
  document.head.appendChild(script)

  analyticsInitialized = true
}

export function trackEvent(eventName, props = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.plausible !== 'function') return

  const safeProps = Object.entries(props).reduce((acc, [key, value]) => {
    if (value == null) return acc
    acc[key] = String(value).slice(0, 120)
    return acc
  }, {})

  if (Object.keys(safeProps).length > 0) {
    window.plausible(eventName, { props: safeProps })
    return
  }

  window.plausible(eventName)
}
