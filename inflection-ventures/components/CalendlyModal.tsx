'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX } from 'react-icons/hi'

// Replace with your actual Calendly URL once you have one.
// e.g. 'https://calendly.com/inflection-ventures/intro-call'
const CALENDLY_URL = 'https://calendly.com/inflection-ventures/intro-call'

interface Props {
  open: boolean
  onClose: () => void
}

export default function CalendlyModal({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
            style={{ height: 'min(700px, 90vh)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Schedule an intro call</p>
                <p className="text-sm text-slate-500">20 minutes · Zoom · No commitment</p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close"
              >
                <HiX size={18} />
              </button>
            </div>

            {/* Calendly iframe */}
            <iframe
              src={`${CALENDLY_URL}?embed_type=Inline&hide_gdpr_banner=1&primary_color=10b981`}
              className="w-full"
              style={{ height: 'calc(100% - 65px)', border: 'none' }}
              title="Schedule a call with Inflection Ventures"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
