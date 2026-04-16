import React, { useRef } from 'react'
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
  const dragRef = useRef(null)

  const handleTitlebarPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (event.target.closest('.titlebar-btn')) return

    onFocus()

    dragRef.current = {
      pointerId: event.pointerId,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      startOffsetX: offset.x,
      startOffsetY: offset.y,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
    document.body.style.userSelect = 'none'
  }

  const handleTitlebarPointerMove = (event) => {
    const dragState = dragRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    onMove({
      x: dragState.startOffsetX + (event.clientX - dragState.startMouseX),
      y: dragState.startOffsetY + (event.clientY - dragState.startMouseY),
    })
  }

  const handleTitlebarPointerEnd = (event) => {
    const dragState = dragRef.current
    if (!dragState || dragState.pointerId !== event.pointerId) return

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    dragRef.current = null
    document.body.style.userSelect = ''
  }

  return (
    <div
      className="window-shell"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, zIndex }}
      onPointerDown={onFocus}
    >
      <div
        className="window-titlebar"
        onPointerDown={handleTitlebarPointerDown}
        onPointerMove={handleTitlebarPointerMove}
        onPointerUp={handleTitlebarPointerEnd}
        onPointerCancel={handleTitlebarPointerEnd}
      >
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
