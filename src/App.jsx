import React, { useEffect, useMemo, useState } from 'react'
import {
  AlertTriangle,
  Atom,
  ChartPie,
  CircleGauge,
  Cloud,
  CloudCog,
  Coffee,
  Cog,
  Database,
  DatabaseZap,
  ExternalLink,
  FileCode2,
  Github,
  Linkedin,
  Mail,
  Phone,
  Sprout,
  TestTube2,
  Waypoints,
  Webhook,
  Workflow,
  X,
} from 'lucide-react'
import DesktopIcon from './components/DesktopIcon'
import Taskbar from './components/Taskbar'
import TouchHelper from './components/TouchHelper'
import Window from './components/Window'
import './styles/App.css'
import { trackEvent } from './utils/analytics'
import {
  certifications,
  cvHeaderLine,
  cvProfessionalSummary,
  cvTechnicalSkills,
  desktopIcons,
  education,
  experience,
  initialWindows,
  profile,
  projects,
  skills,
} from './data/portfolio'

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>
}

const DESKTOP_STATE_KEY = 'xp-portfolio.desktop.v1'

const createDefaultWindowOffsets = () =>
  Object.keys(initialWindows).reduce((acc, id, index) => {
    acc[id] = { x: 90 + index * 30, y: 42 + index * 26 }
    return acc
  }, {})

const createDefaultWindowOrder = (windowsState = initialWindows) =>
  Object.entries(windowsState)
    .filter(([, value]) => value.open)
    .map(([id]) => id)

const sanitizeOffset = (value, fallback) => {
  if (!value || typeof value !== 'object') return fallback

  const x = Number(value.x)
  const y = Number(value.y)

  return {
    x: Number.isFinite(x) ? x : fallback.x,
    y: Number.isFinite(y) ? y : fallback.y,
  }
}

const getPersistedDesktopState = () => {
  if (typeof window === 'undefined') return null

  const raw = window.localStorage.getItem(DESKTOP_STATE_KEY)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null

    const defaultOffsets = createDefaultWindowOffsets()

    const windows = Object.keys(initialWindows).reduce((acc, id) => {
      const fallback = initialWindows[id]
      const saved = parsed.windows?.[id]

      const open = typeof saved?.open === 'boolean' ? saved.open : fallback.open
      const minimized = open && typeof saved?.minimized === 'boolean' ? saved.minimized : false

      acc[id] = { ...fallback, open, minimized }
      return acc
    }, {})

    const orderedOpen = Array.isArray(parsed.windowOrder)
      ? parsed.windowOrder.filter(
          (id, index, source) =>
            typeof id === 'string' &&
            id in initialWindows &&
            windows[id].open &&
            source.indexOf(id) === index
        )
      : []

    const fallbackOrder = createDefaultWindowOrder(windows)
    const windowOrder = [...orderedOpen, ...fallbackOrder.filter((id) => !orderedOpen.includes(id))]

    const windowOffsets = Object.keys(initialWindows).reduce((acc, id) => {
      acc[id] = sanitizeOffset(parsed.windowOffsets?.[id], defaultOffsets[id])
      return acc
    }, {})

    return { windows, windowOrder, windowOffsets }
  } catch {
    return null
  }
}

const techIconsBySkill = {
  Java: Coffee,
  'Spring Boot': Sprout,
  React: Atom,
  JavaScript: FileCode2,
  'GitHub Actions': Workflow,
  Jenkins: Cog,
  PostgreSQL: Database,
  MySQL: DatabaseZap,
  JUnit: TestTube2,
  GCP: Cloud,
  PCF: CloudCog,
  'Pub/Sub': Waypoints,
  'REST APIs': Webhook,
  Grafana: CircleGauge,
  Looker: ChartPie,
}

export default function App() {
  const persistedDesktop = useMemo(() => getPersistedDesktopState(), [])
  const [windows, setWindows] = useState(() => persistedDesktop?.windows ?? initialWindows)
  const [windowOrder, setWindowOrder] = useState(
    () => persistedDesktop?.windowOrder ?? createDefaultWindowOrder()
  )
  const [windowOffsets, setWindowOffsets] = useState(
    () => persistedDesktop?.windowOffsets ?? createDefaultWindowOffsets()
  )
  const [windowCenterTriggers, setWindowCenterTriggers] = useState(() =>
    Object.keys(initialWindows).reduce((acc, id) => {
      acc[id] = persistedDesktop ? 0 : initialWindows[id].open ? 1 : 0
      return acc
    }, {})
  )
  const [startOpen, setStartOpen] = useState(false)
  const [pendingExternalUrl, setPendingExternalUrl] = useState(null)
  const [clock] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

  useEffect(() => {
    if (typeof window === 'undefined') return

    const timeoutId = window.setTimeout(() => {
      const windowsToPersist = Object.keys(initialWindows).reduce((acc, id) => {
        const state = windows[id] ?? initialWindows[id]
        acc[id] = {
          open: Boolean(state.open),
          minimized: Boolean(state.open && state.minimized),
        }
        return acc
      }, {})

      try {
        window.localStorage.setItem(
          DESKTOP_STATE_KEY,
          JSON.stringify({
            version: 1,
            windows: windowsToPersist,
            windowOrder,
            windowOffsets,
          })
        )
      } catch {
        // Ignore persistence failures (private mode/quota) and keep app usable.
      }
    }, 120)

    return () => window.clearTimeout(timeoutId)
  }, [windows, windowOrder, windowOffsets])

  const normalizeUrl = (url) => url.replace(/\/+$/, '')
  const getLinkArea = (linkElement) => {
    if (linkElement.closest('.start-menu')) return 'start_menu'
    if (linkElement.closest('.contact-list')) return 'contact_window'
    return 'desktop'
  }

  const isWarnableExternalUrl = (url) => {
    const normalizedUrl = normalizeUrl(url)
    return normalizedUrl === normalizeUrl(profile.github) || normalizedUrl === normalizeUrl(profile.linkedin)
  }

  const bringToFront = (windowId) => {
    setWindowOrder((prev) => {
      if (prev[prev.length - 1] === windowId) return prev
      return [...prev.filter((id) => id !== windowId), windowId]
    })
  }

  const openWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], open: true, minimized: false },
    }))
    trackEvent('Window Opened', { window: windowId })
    setWindowCenterTriggers((prev) => ({
      ...prev,
      [windowId]: prev[windowId] + 1,
    }))
    bringToFront(windowId)
  }

  const closeWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], open: false, minimized: false },
    }))
    trackEvent('Window Closed', { window: windowId })
    setWindowOrder((prev) => prev.filter((id) => id !== windowId))
  }

  const minimizeWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], minimized: true },
    }))
    trackEvent('Window Minimized', { window: windowId })
  }

  const restoreWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], open: true, minimized: false },
    }))
    trackEvent('Window Restored', { window: windowId })
    bringToFront(windowId)
  }

  const activeWindows = useMemo(
    () =>
      windowOrder
        .filter((id) => windows[id]?.open && !windows[id].minimized)
        .map((id) => [id, windows[id]]),
    [windows, windowOrder]
  )

  const minimizedWindows = useMemo(
    () => Object.entries(windows).filter(([, value]) => value.open && value.minimized),
    [windows]
  )

  const launchIcon = (item) => {
    trackEvent('Desktop Icon Clicked', { icon: item.id, type: item.type })

    if (item.type === 'link') {
      setPendingExternalUrl(item.href)
      return
    }

    openWindow(item.windowId)
  }

  const handleExternalLinkCapture = (event) => {
    const link = event.target.closest('a[href]')
    if (!(link instanceof HTMLAnchorElement)) return

    trackEvent('Link Clicked', {
      area: getLinkArea(link),
      label: link.textContent?.trim() || 'link',
      href: link.getAttribute('href') || link.href,
    })

    if (!isWarnableExternalUrl(link.href)) return

    event.preventDefault()
    trackEvent('External Link Prompted', { href: link.href })
    setPendingExternalUrl(link.href)
  }

  const handleConfirmExternalNavigation = () => {
    if (!pendingExternalUrl) return
    trackEvent('External Link Confirmed', { href: pendingExternalUrl })
    window.open(pendingExternalUrl, '_blank', 'noopener,noreferrer')
    setPendingExternalUrl(null)
  }

  return (
    <div className="xp-desktop" onClickCapture={handleExternalLinkCapture}>
      <div className="xp-desktop__overlay" />

      <main className="desktop-area">
        <div className="desktop-icons-grid">
          {desktopIcons.map((item) => (
            <DesktopIcon key={item.id} item={item} onLaunch={launchIcon} />
          ))}
        </div>
      </main>

      <section className="window-layer">
        <div className="window-stack">
          {activeWindows.map(([id, config], index) => (
            <Window
              key={id}
              title={config.title}
              onClose={() => closeWindow(id)}
              onMinimize={() => minimizeWindow(id)}
              onFocus={() => bringToFront(id)}
              offset={windowOffsets[id]}
              centerTrigger={windowCenterTriggers[id]}
              zIndex={index + 1}
              onMove={(nextOffset) =>
                setWindowOffsets((prev) => ({
                  ...prev,
                  [id]: nextOffset,
                }))
              }
            >
              {id === 'cv' && (
                <div className="window-body">
                  <div>
                    <h1 className="hero-name">{profile.name}</h1>
                    <p className="hero-summary">{cvHeaderLine}</p>
                  </div>

                  <SectionTitle>Professional Summary</SectionTitle>
                  <p className="body-copy">{cvProfessionalSummary}</p>

                  <SectionTitle>Technical Skills</SectionTitle>
                  <div className="card-list">
                    <article className="xp-card">
                      {cvTechnicalSkills.map((skillGroup) => (
                        <p key={skillGroup.category} className="body-copy body-copy--compact">
                          <strong>{skillGroup.category}:</strong> {skillGroup.items}
                        </p>
                      ))}
                    </article>
                  </div>

                  <SectionTitle>Professional Experience</SectionTitle>
                  <div className="card-list">
                    {experience.map((job) => (
                      <article key={`${job.company}-${job.period}`} className="xp-card">
                        <div className="xp-card__header">
                          <div>
                            <div className="xp-card__title">{job.role}</div>
                            <div className="xp-card__subtitle">{job.company}</div>
                          </div>
                          <div className="xp-card__meta">{job.period}</div>
                        </div>
                        <ul className="xp-list">
                          {job.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>

                  <SectionTitle>Education</SectionTitle>
                  <div className="card-list">
                    <article className="xp-card">
                      {education.map((entry) => (
                        <p key={entry} className="body-copy body-copy--compact">
                          {entry}
                        </p>
                      ))}
                    </article>
                  </div>

                  <SectionTitle>Certifications</SectionTitle>
                  <div className="card-list">
                    <article className="xp-card">
                      {certifications.map((entry) => (
                        <p key={entry} className="body-copy body-copy--compact">
                          {entry}
                        </p>
                      ))}
                    </article>
                  </div>
                </div>
              )}

              {id === 'about' && (
                <div className="window-body about-copy">
                  <h1 className="hero-name">About Me</h1>
                  <p>
                    I build practical software that solves business problems. My background includes backend APIs,
                    frontend development, CI/CD modernization, testing, and maintaining enterprise applications.
                  </p>
                  <p>
                    This portfolio uses a Windows XP-inspired UI because a standard portfolio layout would be too easy
                    to forget. This one has more personality and gives recruiters something they will actually remember.
                  </p>
                  <div className="xp-card">
                    <div className="xp-card__title">What this site is meant to show</div>
                    <ul className="xp-list xp-list--tight">
                      <li>My professional background</li>
                      <li>Selected engineering work and impact</li>
                      <li>Fast access to contact details and links</li>
                    </ul>
                  </div>
                </div>
              )}

              {id === 'projects' && (
                <div className="window-body">
                  <h1 className="hero-name">Projects Explorer</h1>
                  <div className="card-list">
                    {projects.map((project) => (
                      <article key={project.name} className="xp-card">
                        <div className="xp-card__title">{project.name}</div>
                        <p className="body-copy body-copy--compact">{project.description}</p>
                        <p className="xp-card__meta">Stack: {project.stack}</p>
                      </article>
                    ))}
                  </div>
                </div>
              )}

              {id === 'skills' && (
                <div className="window-body control-panel">
                  <aside className="control-panel__sidebar">
                    <div className="control-panel-box">
                      <div className="control-panel-box__title">System Tasks</div>
                      <ul className="control-panel-box__list">
                        <li>View stack by category</li>
                        <li>Review tools and platforms</li>
                        <li>Browse engineering capabilities</li>
                      </ul>
                    </div>
                    <div className="control-panel-box">
                      <div className="control-panel-box__title">See Also</div>
                      <ul className="control-panel-box__list">
                        <li>Professional Summary</li>
                        <li>Projects Explorer</li>
                        <li>Contact Information</li>
                      </ul>
                    </div>
                  </aside>

                  <div className="control-panel__main">
                    <h1 className="control-panel__heading">Tech Stack</h1>
                    <p className="control-panel__subheading">Pick a technology</p>

                    <div className="control-panel-grid">
                      {skills.map((skill) => {
                        const SkillIcon = techIconsBySkill[skill] || Cog
                        return (
                          <div key={skill} className="control-panel-item">
                            <div className="control-panel-item__icon">
                              <SkillIcon size={24} />
                            </div>
                            <div className="control-panel-item__label">{skill}</div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {id === 'contact' && (
                <div className="window-body">
                  <h1 className="hero-name">Contact Info</h1>
                  <div className="contact-list">
                    <a href={`mailto:${profile.email}`} className="contact-link">
                      <div className="contact-link__left">
                        <Mail size={18} className="contact-link__icon" />
                        <span>{profile.email}</span>
                      </div>
                      <ExternalLink size={16} />
                    </a>
                    <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="contact-link">
                      <div className="contact-link__left">
                        <Phone size={18} className="contact-link__icon" />
                        <span>{profile.phone}</span>
                      </div>
                      <ExternalLink size={16} />
                    </a>
                    <a href={profile.github} target="_blank" rel="noreferrer" className="contact-link">
                      <div className="contact-link__left">
                        <Github size={18} className="contact-link__icon" />
                        <span>{profile.github.replace(/^https?:\/\//, '')}</span>
                      </div>
                      <ExternalLink size={16} />
                    </a>
                    <a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                      <div className="contact-link__left">
                        <Linkedin size={18} className="contact-link__icon" />
                        <span>{profile.linkedin.replace(/^https?:\/\//, '')}</span>
                      </div>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              )}
            </Window>
          ))}
        </div>
      </section>

      <Taskbar
        startOpen={startOpen}
        setStartOpen={setStartOpen}
        minimizedWindows={minimizedWindows}
        restoreWindow={restoreWindow}
        clock={clock}
        openWindow={openWindow}
      />
      <TouchHelper />

      {pendingExternalUrl && (
        <div className="warning-overlay" role="presentation">
          <div className="warning-window" role="dialog" aria-modal="true" aria-label="External link warning">
            <div className="warning-window__titlebar">
              <span>Warning</span>
              <button
                type="button"
                className="warning-window__close"
                onClick={() => setPendingExternalUrl(null)}
                aria-label="Close warning"
              >
                <X size={12} />
              </button>
            </div>

            <div className="warning-window__body">
              <AlertTriangle size={34} className="warning-window__icon" />
              <div className="warning-window__message">
                <p>This action will redirect you to a different page:</p>
                <p className="warning-window__url">{pendingExternalUrl}</p>
              </div>
            </div>

            <div className="warning-window__actions">
              <button type="button" className="xp-button" onClick={handleConfirmExternalNavigation}>
                <span className="xp-button__inner">Yes</span>
              </button>
              <button type="button" className="xp-button" onClick={() => setPendingExternalUrl(null)}>
                <span className="xp-button__inner">Canel</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
