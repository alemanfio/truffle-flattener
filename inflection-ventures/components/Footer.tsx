'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaLinkedin, FaXTwitter, FaTelegram } from 'react-icons/fa6'
import { HiArrowRight } from 'react-icons/hi'

const footerLinks = {
  'Fund': [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Investment Focus', href: '/investment-focus' },
    { label: 'Community', href: '/community' },
    { label: 'Invest Now', href: '/invest-now' },
  ],
  'Legal': [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Risk Disclosure', href: '#' },
    { label: 'ELTIF Prospectus', href: '#' },
  ],
  'Contact': [
    { label: 'hello@inflection.vc', href: 'mailto:hello@inflection.vc' },
    { label: 'Luxembourg, EU', href: '#' },
    { label: 'Schedule a Call', href: '#' },
    { label: 'Media & Press', href: '#' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Would connect to Formspree or similar
    setSubmitted(true)
    setEmail('')
  }

  return (
    <footer className="bg-slate-950 text-slate-400">
      {/* Main Footer */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center">
                <span className="text-white font-black text-sm">IV</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm">Inflection</span>
                <span className="text-emerald-400 font-semibold text-xs">Ventures</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              A Luxembourg-based ELTIF 2.0 venture capital fund democratising access to longevity
              and space economy investments for retail and professional investors.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <p className="text-white text-sm font-semibold mb-3">Stay updated</p>
              {submitted ? (
                <p className="text-emerald-400 text-sm">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                  />
                  <button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg transition-colors"
                    aria-label="Subscribe"
                  >
                    <HiArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <FaXTwitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-500 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
                aria-label="Telegram"
              >
                <FaTelegram size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold text-sm mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-emerald-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800">
        <div className="container-xl py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Inflection Ventures S.A. All rights reserved.</p>
            <p className="text-center md:text-right leading-relaxed max-w-2xl">
              Inflection Ventures is a regulated ELTIF 2.0 fund registered in Luxembourg.
              Past performance is not indicative of future results. Capital at risk.
              Not available to US persons. EU investors only.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
