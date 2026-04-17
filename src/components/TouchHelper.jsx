import React, { useEffect, useState } from 'react'
import { Paperclip } from 'lucide-react'

function isTouchScreenDevice() {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false

  return (
    window.matchMedia?.('(pointer: coarse)').matches ||
    window.matchMedia?.('(any-pointer: coarse)').matches ||
    navigator.maxTouchPoints > 0
  )
}

export default function TouchHelper() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(isTouchScreenDevice())
  }, [])

  if (!isVisible) return null

  return (
    <aside className="clippy-helper" role="dialog" aria-live="polite" aria-label="Touch screen movement tip">
      <div className="clippy-helper__bubble">
        <p>in touch screen you can drag windows around by holding the blue title bar</p>
        <button type="button" className="xp-button clippy-helper__ok" onClick={() => setIsVisible(false)}>
          <span className="xp-button__inner">OK</span>
        </button>
      </div>

      <div className="clippy-helper__assistant" aria-hidden="true">
        <div className="clippy-helper__assistant-body">
          <Paperclip size={38} strokeWidth={2.2} />
        </div>
        <span className="clippy-helper__eye clippy-helper__eye--left" />
        <span className="clippy-helper__eye clippy-helper__eye--right" />
      </div>
    </aside>
  )
}
