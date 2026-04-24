import React, { useLayoutEffect, useRef } from 'react'
import { Monitor } from 'lucide-react'
import TitlebarControlButton from './TitlebarControlButton'
import '../styles/Window.css'

export default function Window({
  title,
  children,
  onClose,
  onMinimize,
  onFocus,
  offset = { x: 0, y: 0 },
  centerTrigger = 0,
  zIndex = 1,
  onMove,
}) {
  const dragRef = useRef(null)
  const shellRef = useRef(null)

  useLayoutEffect(() => {
    if (centerTrigger <= 0) return

    const shell = shellRef.current
    if (!shell) return

    const parent = shell.offsetParent
    if (!(parent instanceof HTMLElement)) return

    const parentRect = parent.getBoundingClientRect()
    const shellRect = shell.getBoundingClientRect()
    const maxX = Math.max(parentRect.width - shellRect.width, 0)
    const maxY = Math.max(parentRect.height - shellRect.height, 0)
    const centeredX = (parentRect.width - shellRect.width) / 2
    const centeredY = (parentRect.height - shellRect.height) / 2
    const nextX = Math.round(Math.min(Math.max(centeredX, 0), maxX))
    const nextY = Math.round(Math.min(Math.max(centeredY, 0), maxY))

    if (nextX === offset.x && nextY === offset.y) return
    onMove({ x: nextX, y: nextY })
  }, [centerTrigger])

  const handleTitlebarPointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return
    if (event.target.closest('.titlebar-control')) return

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
      ref={shellRef}
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
          <TitlebarControlButton type="minimize" onClick={onMinimize} />
          <TitlebarControlButton type="close" onClick={onClose} />
        </div>
      </div>
      <div className="window-content">{children}</div>
    </div>
  )
}
