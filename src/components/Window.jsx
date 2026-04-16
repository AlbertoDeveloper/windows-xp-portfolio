import React from 'react'
import { Minus, Monitor, X } from 'lucide-react'

export default function Window({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  offset = { x: 0, y: 0 },
  zIndex = 1,
  onMove,
}) {
  const handleTitlebarMouseDown = (event) => {
    if (event.button !== 0) return
    if (event.target.closest('.titlebar-btn')) return

    onFocus()

    const startMouseX = event.clientX
    const startMouseY = event.clientY
    const startOffsetX = offset.x
    const startOffsetY = offset.y

    const handleMouseMove = (moveEvent) => {
      onMove({
        x: startOffsetX + (moveEvent.clientX - startMouseX),
        y: startOffsetY + (moveEvent.clientY - startMouseY),
      })
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      document.body.style.userSelect = ''
    }

    document.body.style.userSelect = 'none'
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div
      className="window-shell"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, zIndex }}
      onMouseDown={onFocus}
    >
      <div className="window-titlebar" onMouseDown={handleTitlebarMouseDown}>
        <div className="window-titlebar__left">
          <Monitor size={15} />
          <span>{title}</span>
        </div>
        <div className="window-titlebar__actions">
          <button onClick={onMinimize} className="titlebar-btn titlebar-btn--minimize" aria-label="Minimize window">
            <Minus size={14} />
          </button>
          <button onClick={onClose} className="titlebar-btn titlebar-btn--close" aria-label="Close window">
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  )
}
