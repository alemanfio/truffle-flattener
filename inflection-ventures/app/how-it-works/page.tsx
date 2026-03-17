'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useSpring } from 'framer-motion'
import {
  HiArrowRight,
  HiChevronDown,
  HiCheckCircle,
  HiCurrencyEuro,
  HiSearch,
  HiClipboardCheck,
  HiUserGroup,
  HiTrendingUp,
  HiSupport,
  HiEye,
  HiStar,
  HiShieldCheck,
  HiScale,
} from 'react-icons/hi'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const steps = [
  {
    icon: <HiCurrencyEuro size={24} />,
    number: '01',
    title: 'You Invest',
    color: 'emerald',
    summary: 'Commit from €10,000 and become a limited partner in GenSeed Capital Fund I.',
    detail:
      'Complete our online qualification process, sign the subscription agreement electronically, and wire your commitment. ELTIF 2.0 regulations allow EU retail investors to participate with a minimum of €10,000. Professional investors have no minimum. Your commitment is legally binding but capital is only called when investments are ready to close.',
  },
  {
    icon: <HiSearch size={24} />,
    number: '02',
    title: 'We Source',
    color: 'blue',
    summary: 'Our investment team actively scouts longevity and space economy startups across Europe and beyond.',
    detail:
      'We attend 50+ conferences annually, maintain relationships with leading accelerators (Station F, YC, ESA BIC), and work with co-investors to surface the best deals. Our community of 200+ investors also contributes warm introductions and domain expertise to identify companies others miss.',
  },
  {
    icon: <HiClipboardCheck size={24} />,
    number: '03',
    title: 'Due Diligence',
    color: 'purple',
    summary: 'Every investment undergoes rigorous financial, technical, and legal due diligence.',
    detail:
      'We run a 6-8 week process including: financial model review, technology assessment with domain experts, reference calls with 10+ people per company, legal structure review, cap table analysis, and market sizing validation. Our DD checklists are available to investors in our portal.',
  },
  {
    icon: <HiUserGroup size={24} />,
    number: '04',
    title: 'Community Engages',
    color: 'orange',
    summary: 'Our investor community reviews potential investments and contributes expertise.',
    detail:
      'Working Groups organised by sector (Longevity Biology, Space Systems, etc.) engage directly with founders, provide technical feedback, and vote advisory signals. The Investment Committee considers community input but maintains final decision authority to ensure fiduciary duty is met.',
  },
  {
    icon: <HiTrendingUp size={24} />,
    number: '05',
    title: 'We Invest',
    color: 'emerald',
    summary: 'The Investment Committee approves and we deploy capital into selected companies.',
    detail:
      'We typically invest €150K–€500K in seed/Series A rounds alongside co-investors. We take SAFE notes, equity, or preferred shares depending on the round structure. Our target portfolio is 12–18 companies providing meaningful diversification within each sector.',
  },
  {
    icon: <HiSupport size={24} />,
    number: '06',
    title: 'Portfolio Support',
    color: 'blue',
    summary: 'Active support: intros, hiring, regulatory guidance, and follow-on rounds.',
    detail:
      'Post-investment, our Value Creation team works with portfolio companies on business development introductions, talent recruitment (our community is a hiring pipeline), regulatory navigation (especially important in biotech and aerospace), and preparation for Series B fundraising.',
  },
  {
    icon: <HiEye size={24} />,
    number: '07',
    title: 'Transparency',
    color: 'teal',
    summary: 'Quarterly NAV reports, portfolio updates, and governance minutes — always.',
    detail:
      'Every quarter you receive: Net Asset Value statement, portfolio company progress updates, new investment announcements, working group summaries, and audited annual accounts. We maintain a live investor dashboard where you can track your position at any time.',
  },
  {
    icon: <HiStar size={24} />,
    number: '08',
    title: 'Exits & Returns',
    color: 'yellow',
    summary: 'Target exits via M&A, secondary sales, or IPO — returning capital + returns to investors.',
    detail:
      "We target exits in years 5–10. Proceeds from exits are distributed to investors after deducting the management fee and carry. Our target is 3-5× net return on invested capital. We maintain a Secondary Market programme allowing investors to transfer positions to other accredited investors.",
  },
]

const colorMap: Record<string, { bg: string; text: string; border: string; badge: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', badge: 'bg-emerald-500' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', badge: 'bg-blue-600' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', badge: 'bg-purple-600' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200', badge: 'bg-orange-500' },
  teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-teal-200', badge: 'bg-teal-600' },
  yellow: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', badge: 'bg-yellow-500' },
}

const eltifPoints = [
  { icon: <HiShieldCheck />, text: 'Retail investors can now participate with €10,000 minimum' },
  { icon: <HiScale />, text: 'Full EU regulatory protection under CSSF supervision' },
  { icon: <HiCheckCircle />, text: 'EU passport: one fund structure, 27 country distribution' },
  { icon: <HiEye />, text: 'Mandatory transparency and disclosure standards' },
  { icon: <HiUserGroup />, text: 'Eligible assets: private equity, private credit, infrastructure' },
  { icon: <HiTrendingUp />, text: 'Tax advantages available in Luxembourg and key EU states' },
]

const governance = {
  management: [
    'Selects and approves all investments (Investment Committee)',
    'Negotiates deal terms and legal documentation',
    'Manages day-to-day fund operations',
    'Maintains regulatory compliance and reporting',
    'Hires and manages the investment team',
    'Produces quarterly investor reports',
    'Makes final portfolio company decisions',
  ],
  community: [
    'Nominates candidates for the Advisory Board',
    'Participates in Working Group sector reviews',
    'Submits investment leads and warm introductions',
    'Votes on major strategic fund decisions (advisory)',
    'Provides expert DD input on technical matters',
    'Engages directly with portfolio founders',
    'Earns Community Tokens for contributions',
  ],
}

export default function HowItWorksPage() {
  const [openStep, setOpenStep] = useState<number | null>(null)

  // Scroll-based reading progress bar
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 })

  return (
    <>
      {/* Reading progress bar — fixed at top below navbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 origin-left z-50 shadow-md"
        style={{ scaleX }}
        aria-hidden="true"
      />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              The Process
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              From your commitment
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                to transformative returns
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              An eight-step journey built for transparency, community, and long-term
              value creation — from first investment to successful exit.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, i) => {
              const colors = colorMap[step.color] || colorMap.emerald
              const isOpen = openStep === i
              return (
                <FadeIn key={step.number} delay={i * 0.05}>
                  <div className="flex gap-6 mb-8">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-xl ${colors.badge} text-white flex items-center justify-center shrink-0 shadow-md`}>
                        {step.icon}
                      </div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 bg-slate-200 mt-2 min-h-[40px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex-1 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 mb-2 ${isOpen ? 'ring-2 ring-blue-200' : ''}`}>
                      <button
                        className="w-full text-left flex items-start justify-between gap-4"
                        onClick={() => setOpenStep(isOpen ? null : i)}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-xs font-bold uppercase tracking-wider ${colors.text}`}>
                              Step {step.number}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                          <p className="text-slate-600 text-sm mt-1">{step.summary}</p>
                        </div>
                        <HiChevronDown
                          className={`shrink-0 mt-1 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                          size={20}
                        />
                      </button>

                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-slate-100"
                        >
                          <p className="text-slate-700 leading-relaxed text-sm">{step.detail}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* Governance Model */}
      <section className="py-20 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Governance Model</span>
            <h2 className="section-title mb-4">Management meets community</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              We believe the best investment outcomes happen when professional fund management
              is complemented by genuine community participation.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="bg-white border-2 border-blue-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
                    <HiScale className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Management Responsibilities</h3>
                </div>
                <ul className="space-y-3">
                  {governance.management.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start text-sm text-slate-700">
                      <HiCheckCircle className="text-blue-500 shrink-0 mt-0.5" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white border-2 border-emerald-100 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <HiUserGroup className="text-white" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Community Responsibilities</h3>
                </div>
                <ul className="space-y-3">
                  {governance.community.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start text-sm text-slate-700">
                      <HiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ELTIF 2.0 Explainer */}
      <section className="py-20 bg-white">
        <div className="container-xl">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <span className="section-badge mb-4">Regulatory Framework</span>
                <h2 className="section-title mb-4">What is ELTIF 2.0?</h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  The European Long-Term Investment Fund (ELTIF) 2.0 regulation, effective from
                  January 2024, is the EU's landmark reform democratising access to alternative
                  investments for retail investors.
                </p>
                <p className="text-slate-600 leading-relaxed mb-6">
                  Previously, access to venture capital and private equity was restricted to
                  professional investors with €100K+ minimums. ELTIF 2.0 removes these barriers
                  while maintaining strong investor protections.
                </p>
                <Link href="/invest-now" className="btn-dark">
                  Learn about investing <HiArrowRight />
                </Link>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
                  <h3 className="font-bold text-slate-900 mb-5 text-lg">What ELTIF 2.0 enables:</h3>
                  <div className="space-y-4">
                    {eltifPoints.map((point, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="text-emerald-500 mt-0.5 shrink-0">{point.icon}</div>
                        <p className="text-slate-700 text-sm leading-relaxed">{point.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* 10-Year Timeline */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-4">
              The Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your 10-year investment journey</h2>
            <p className="text-slate-400 max-w-xl mx-auto">From first commitment to exit distributions</p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Line */}
              <div className="absolute top-5 left-0 right-0 h-px bg-gradient-to-r from-emerald-500/50 via-blue-500/50 to-purple-500/50" />

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
                {[
                  { year: 'Y1–2', label: 'Deployment Phase', desc: 'Capital called, investments made in 12–18 companies', color: 'emerald' },
                  { year: 'Y3–5', label: 'Growth Phase', desc: 'Portfolio companies scale, follow-on rounds, community support', color: 'blue' },
                  { year: 'Y6–8', label: 'Maturity Phase', desc: 'Companies reach growth stage, M&A interest, IPO preparation', color: 'purple' },
                  { year: 'Y9–10', label: 'Exit Phase', desc: 'Exits completed, distributions returned to investors', color: 'yellow' },
                ].map((phase, i) => (
                  <FadeIn key={phase.year} delay={i * 0.1}>
                    <div className="relative pt-12 text-center">
                      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg
                        ${phase.color === 'emerald' ? 'bg-emerald-500' :
                          phase.color === 'blue' ? 'bg-blue-600' :
                          phase.color === 'purple' ? 'bg-purple-600' : 'bg-yellow-500'}`}>
                        {i + 1}
                      </div>
                      <p className="text-slate-400 text-xs font-mono mb-1">{phase.year}</p>
                      <p className="text-white font-bold text-sm mb-2">{phase.label}</p>
                      <p className="text-slate-400 text-xs leading-relaxed">{phase.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to start?</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">Fund I is open. Begin your qualification in under 10 minutes.</p>
            <Link href="/invest-now" className="btn-primary text-base px-8 py-4">
              Begin Investment Process <HiArrowRight />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
