import React from 'react'
import { Minus, X } from 'lucide-react'
import '../styles/TitlebarControlButton.css'

const iconByType = {
  minimize: Minus,
  close: X,
}

const labelByType = {
  minimize: 'Minimize window',
  close: 'Close window',
}

export default function TitlebarControlButton({
  type,
  onClick,
  className = '',
  ariaLabel,
  disabled = false,
  compact = false,
}) {
  const Icon = iconByType[type]
  if (!Icon) return null

  const classes = [
    'titlebar-control',
    `titlebar-control--${type}`,
    compact ? 'titlebar-control--compact' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" onClick={onClick} className={classes} aria-label={ariaLabel || labelByType[type]} disabled={disabled}>
      <Icon size={compact ? 12 : 14} />
    </button>
  )
}
