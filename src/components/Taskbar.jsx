import React from 'react'
import { Menu } from 'lucide-react'
import StartMenu from './StartMenu'

export default function Taskbar({ startOpen, setStartOpen, minimizedWindows, restoreWindow, clock, openWindow }) {
  return (
    <div className="taskbar">
      <div className="taskbar__left">
        <div className="taskbar__start-wrap">
          <button onClick={() => setStartOpen((value) => !value)} className="start-button">
            <Menu size={18} />
            <span>start</span>
          </button>

          <StartMenu isOpen={startOpen} onClose={() => setStartOpen(false)} onOpenWindow={openWindow} />
        </div>

        {minimizedWindows.map(([id, config]) => (
          <button key={id} onClick={() => restoreWindow(id)} className="taskbar-window-tab">
            {config.title}
          </button>
        ))}
      </div>

      <div className="taskbar__clock">{clock}</div>
    </div>
  )
}
