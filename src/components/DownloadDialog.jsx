import React, { useEffect, useMemo, useState } from 'react'
import { Download, FileText } from 'lucide-react'
import TitlebarControlButton from './TitlebarControlButton'
import '../styles/DownloadDialog.css'

export default function DownloadDialog({ isOpen, onClose, fileUrl, fileName }) {
  const [progress, setProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const downloadedSize = useMemo(() => {
    const simulatedMegabytes = (2.26 * progress) / 100
    return `${simulatedMegabytes.toFixed(2)} MB`
  }, [progress])

  useEffect(() => {
    if (!isOpen) {
      setProgress(0)
      setIsDownloading(false)
      setIsComplete(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isDownloading) return undefined

    const timerId = window.setInterval(() => {
      setProgress((value) => {
        const nextValue = Math.min(value + 2, 100)
        if (nextValue >= 100) {
          window.clearInterval(timerId)
          setIsDownloading(false)
          setIsComplete(true)

          const link = document.createElement('a')
          link.href = fileUrl
          link.download = fileName
          link.rel = 'noopener noreferrer'
          document.body.append(link)
          link.click()
          link.remove()
        }
        return nextValue
      })
    }, 45)

    return () => window.clearInterval(timerId)
  }, [isDownloading, fileUrl, fileName])

  if (!isOpen) return null

  return (
    <div className="download-dialog-overlay" role="presentation" onClick={onClose}>
      <div
        className="download-dialog-window"
        role="dialog"
        aria-modal="true"
        aria-label="Download CV PDF"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="download-dialog-titlebar">
          <span>{isComplete ? 'Download complete' : 'Download file'}</span>
          <TitlebarControlButton type="close" onClick={onClose} compact ariaLabel="Close dialog" />
        </div>

        <div className="download-dialog-body">
          <div className="download-dialog-main">
            <div className="download-dialog-icon-wrap">
              <FileText size={26} />
            </div>
            <div>
              <p className="download-dialog-heading">
                {isComplete ? 'Download Complete' : 'Prepare CV Download'}
              </p>
              <p className="download-dialog-subtext">Saved: {fileName}</p>
            </div>
          </div>

          <div className="download-progress">
            <div className="download-progress__fill" style={{ width: `${progress}%` }} />
          </div>

          <div className="download-stats">
            <p>
              Downloaded: <span>{downloadedSize} / 2.26 MB</span>
            </p>
            <p>
              Download to: <span>Downloads/{fileName}</span>
            </p>
            <p>
              Transfer rate: <span>~514 KB/sec</span>
            </p>
          </div>
        </div>

        <div className="download-dialog-actions">
          <button
            type="button"
            className="xp-button"
            onClick={() => {
              if (isDownloading || isComplete) return
              setProgress(0)
              setIsComplete(false)
              setIsDownloading(true)
            }}
            disabled={isDownloading || isComplete}
          >
            <span className="xp-button__inner">
              <Download size={14} />
              {isDownloading ? 'Downloading...' : isComplete ? 'Downloaded' : 'Download'}
            </span>
          </button>
          <button type="button" className="xp-button" onClick={onClose}>
            <span className="xp-button__inner">Cancel</span>
          </button>
        </div>
      </div>
    </div>
  )
}
