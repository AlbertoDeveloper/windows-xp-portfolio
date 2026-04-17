import React, { useMemo, useState } from 'react'
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
import {
  desktopIcons,
  experience,
  initialWindows,
  profile,
  projects,
  skills,
} from './data/portfolio'

function SectionTitle({ children }) {
  return <h2 className="section-title">{children}</h2>
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
  const [windows, setWindows] = useState(initialWindows)
  const [windowOrder, setWindowOrder] = useState(() =>
    Object.entries(initialWindows)
      .filter(([, value]) => value.open)
      .map(([id]) => id)
  )
  const [windowOffsets, setWindowOffsets] = useState(() =>
    Object.keys(initialWindows).reduce((acc, id, index) => {
      acc[id] = { x: 90 + index * 30, y: 42 + index * 26 }
      return acc
    }, {})
  )
  const [windowCenterTriggers, setWindowCenterTriggers] = useState(() =>
    Object.keys(initialWindows).reduce((acc, id) => {
      acc[id] = 0
      return acc
    }, {})
  )
  const [startOpen, setStartOpen] = useState(false)
  const [pendingExternalUrl, setPendingExternalUrl] = useState(null)
  const [clock] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

  const normalizeUrl = (url) => url.replace(/\/+$/, '')
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
    setWindowOrder((prev) => prev.filter((id) => id !== windowId))
  }

  const minimizeWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], minimized: true },
    }))
  }

  const restoreWindow = (windowId) => {
    setWindows((prev) => ({
      ...prev,
      [windowId]: { ...prev[windowId], open: true, minimized: false },
    }))
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
    if (item.type === 'link') {
      setPendingExternalUrl(item.href)
      return
    }

    openWindow(item.windowId)
  }

  const handleExternalLinkCapture = (event) => {
    const link = event.target.closest('a[href]')
    if (!(link instanceof HTMLAnchorElement)) return

    if (!isWarnableExternalUrl(link.href)) return

    event.preventDefault()
    setPendingExternalUrl(link.href)
  }

  const handleConfirmExternalNavigation = () => {
    if (!pendingExternalUrl) return
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
                    <p className="hero-summary">{profile.summary}</p>
                  </div>

                  <SectionTitle>Professional Summary</SectionTitle>
                  <p className="body-copy">
                    Software engineer with strong experience building and improving enterprise applications,
                    backend APIs, frontend interfaces, automated testing, and CI/CD workflows. Comfortable
                    working across the stack and improving system reliability in large business environments.
                  </p>

                  <SectionTitle>Experience</SectionTitle>
                  <div className="card-list">
                    {experience.map((job) => (
                      <article key={job.company} className="xp-card">
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

                  <SectionTitle>Core Tools</SectionTitle>
                  <div className="tag-wrap">
                    {skills.map((skill) => (
                      <span key={skill} className="skill-tag">
                        {skill}
                      </span>
                    ))}
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
