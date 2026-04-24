import React from 'react'
import '../styles/DesktopIcon.css'

export default function DesktopIcon({ item, onLaunch }) {
  const Icon = item.icon
  const hasImageIcon = typeof item.iconImage === 'string' && item.iconImage.length > 0

  return (
    <button
      onClick={() => onLaunch(item)}
      className={`desktop-icon${hasImageIcon ? ' desktop-icon--custom' : ''}`}
      title={item.type === 'link' ? 'Click to open link' : 'Click to open window'}
    >
      <div className={`desktop-icon__badge${hasImageIcon ? ' desktop-icon__badge--custom' : ''}`}>
        {hasImageIcon ? (
          <img src={item.iconImage} alt="" className="desktop-icon__image desktop-icon__image--custom" />
        ) : (
          <Icon size={34} className="desktop-icon__glyph" />
        )}
      </div>
      <span className="desktop-icon__label">{item.label}</span>
    </button>
  )
}
