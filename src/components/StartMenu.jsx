import React from 'react'
import { Briefcase, Github, Globe, Linkedin, Mail, Phone, Power } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function StartMenu({ isOpen, onClose, onOpenWindow }) {
  if (!isOpen) return null

  return (
    <div className="start-menu">
      <div className="start-menu__header">
        <div className="start-menu__name">{profile.name}</div>
        <div className="start-menu__role">{profile.role}</div>
      </div>

      <div className="start-menu__list">
        <a href={profile.linkedin} target="_blank" rel="noreferrer" className="start-menu__item">
          <Linkedin size={18} className="start-menu__item-icon" /> LinkedIn
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer" className="start-menu__item">
          <Github size={18} className="start-menu__item-icon" /> GitHub
        </a>
        <a href={`mailto:${profile.email}`} className="start-menu__item">
          <Mail size={18} className="start-menu__item-icon" /> Email
        </a>
        <button
          onClick={() => {
            onOpenWindow('contact')
            onClose()
          }}
          className="start-menu__item start-menu__item--button"
        >
          <Phone size={18} className="start-menu__item-icon" /> Phone Number
        </button>
        <button
          onClick={() => {
            onOpenWindow('cv')
            onClose()
          }}
          className="start-menu__item start-menu__item--button"
        >
          <Briefcase size={18} className="start-menu__item-icon" /> Open CV
        </button>
        <button
          onClick={() => {
            onOpenWindow('about')
            onClose()
          }}
          className="start-menu__item start-menu__item--button"
        >
          <Globe size={18} className="start-menu__item-icon" /> About This Site
        </button>
      </div>

      <div className="start-menu__footer">
        <button onClick={onClose} className="xp-button">
          <span className="xp-button__inner">
            <Power size={14} /> Close
          </span>
        </button>
      </div>
    </div>
  )
}
