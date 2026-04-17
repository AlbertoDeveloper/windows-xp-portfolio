import React from 'react'
import '../styles/DesktopIcon.css'

export default function DesktopIcon({ item, onLaunch }) {
  const Icon = item.icon

  return (
    <button
      onClick={() => onLaunch(item)}
      className="desktop-icon"
      title={item.type === 'link' ? 'Click to open link' : 'Click to open window'}
    >
      <div className="desktop-icon__badge">
        <Icon size={34} className="desktop-icon__glyph" />
      </div>
      <span className="desktop-icon__label">{item.label}</span>
    </button>
  )
}
