'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  HiArrowRight, HiCheckCircle, HiMail,
} from 'react-icons/hi'
import {
  FaLinkedin, FaEnvelope,
} from 'react-icons/fa'
import CalendlyModal from '@/components/CalendlyModal'

function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
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

const values = [
  {
    icon: '🔍',
    title: 'Transparency First',
    desc: 'No black boxes. Real-time portfolio tracking, quarterly updates, and open communication with every investor.',
  },
  {
    icon: '🎯',
    title: 'Mission Alignment',
    desc: 'We only invest in companies genuinely advancing longevity or space economy — no mission drift, no generalist portfolio creep.',
  },
  {
    icon: '🤝',
    title: 'Community Over Capital',
    desc: "Investors aren\u2019t just sources of money. They\u2019re domain experts, potential customers, advisors, and advocates who make our portfolio companies stronger.",
  },
  {
    icon: '🔓',
    title: 'Accessibility Without Compromise',
    desc: "\u20AC10,000 minimum doesn\u2019t mean lower quality. We maintain institutional-grade due diligence while opening access.",
  },
  {
    icon: '⏳',
    title: 'Long-Term Orientation',
    desc: "We\u2019re building for decades, not quarters. Patient capital for patient science and infrastructure.",
  },
]

const luxembourgReasons = [
  { label: 'ELTIF 2.0 Hub', desc: 'Leading EU jurisdiction for retail-accessible alternative investment funds' },
  { label: 'Regulatory Excellence', desc: 'CSSF financial regulator provides credibility and investor protection' },
  { label: 'Tax Efficiency', desc: 'Near-zero fund-level taxation preserves returns for LPs' },
  { label: 'European Access', desc: 'EU passport allows fundraising across all 27 member states' },
  { label: 'Mature Ecosystem', desc: 'Mature fund administration, legal, and audit infrastructure' },
  { label: 'ESA Proximity', desc: 'European Space Agency Business Incubation Centre in Luxembourg — direct deal flow' },
  { label: 'Political Stability', desc: 'AAA-rated sovereign with predictable regulatory environment' },
]

const journeyTimeline = [
  {
    date: '2024–2025',
    title: 'Research & Validation',
    desc: 'Alessandro identified the ELTIF 2.0 opportunity and developed the dual-sector investment thesis combining longevity science and space economy. Market research, competitive analysis, and fund structuring completed.',
    current: false,
  },
  {
    date: 'Q1 2026',
    title: 'Market Validation',
    desc: 'Conducting investor research study and building initial deal pipeline. Website launched, fund economics finalized, market validation survey in progress. Pre-launch preparation phase.',
    current: true,
  },
  {
    date: 'Q2 2026',
    title: 'Fund Formation',
    desc: 'Legal entity formation (Luxembourg S.A./SICAV-RAIF), CSSF application submission. First close target: €500K–€1M from 50–100 early investors. Platform development and onboarding systems established.',
    current: false,
  },
  {
    date: 'Q3 2026',
    title: 'Deployment Begins',
    desc: 'ELTIF authorization received from CSSF. First investments deployed (2–3 portfolio companies). Investor onboarding and KYC/AML processes operational. Quarterly reporting and transparency systems initiated.',
    current: false,
  },
  {
    date: 'Q4 2026',
    title: 'Portfolio Expansion',
    desc: 'Rolling closes continue toward €3–5M total fund size. Portfolio expands to 6–10 companies across longevity and space sectors. Community engagement activities launched. Advisory board formation.',
    current: false,
  },
  {
    date: '2027–2030',
    title: 'Portfolio Maturation',
    desc: 'Full deployment across 15–20 companies. Active portfolio support, follow-on investments, and value-add initiatives. First exits expected (Year 5–6). Fund II planning begins with €10–20M target size.',
    current: false,
  },
]

const futurRoles = [
  {
    icon: '🔬',
    title: 'Longevity Sector Lead',
    eta: '2027',
    desc: 'PhD in molecular biology or 5+ years in biotech VC. Will lead longevity deal sourcing and due diligence.',
  },
  {
    icon: '🚀',
    title: 'Space Economy Sector Lead',
    eta: '2027',
    desc: 'Aerospace engineering or space industry operating experience. Will lead space deal flow and technical assessment.',
  },
  {
    icon: '📊',
    title: 'VP Operations & Investor Relations',
    eta: '2026',
    desc: 'Fund operations or VC platform experience. Will manage 300+ LP relationships and community engagement.',
  },
  {
    icon: '💼',
    title: 'Investment Associate',
    eta: '2027',
    desc: 'Finance, consulting, or startup operations. Will support deal analysis and portfolio management.',
  },
]

export default function AboutPage() {
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  return (
    <>
      <CalendlyModal open={calendlyOpen} onClose={() => setCalendlyOpen(false)} />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 min-h-[420px] flex items-center">
        <div className="container-xl text-center w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              About GenSeed Capital
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Democratizing frontier
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                technology investing
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              We're building the first retail-accessible venture capital fund focused exclusively on
              longevity and space economy — the two sectors that will define the next century.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Founder Story ─────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <div className="max-w-4xl mx-auto">
            <FadeIn className="text-center mb-16">
              <span className="section-badge mb-4">Founder Story</span>
              <h2 className="section-title mb-4">Why We Started This</h2>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Photo & stats */}
              <FadeIn className="flex flex-col items-center gap-6">
                <div
                  className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shadow-2xl shadow-blue-700/20 grayscale hover:grayscale-0 transition-all duration-500 cursor-default"
                  aria-label="Founder photo placeholder"
                >
                  <span className="text-white text-5xl font-black select-none">A</span>
                </div>
                <p className="text-xs italic text-slate-400 mt-1 text-center">Professional photo coming soon</p>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 w-full space-y-3 text-sm">
                  {[
                    { k: 'Age', v: '25' },
                    { k: 'Background', v: 'Finance & Fund Management' },
                    { k: 'Based', v: 'Luxembourg, EU' },
                    { k: 'Mission', v: 'Democratize frontier tech investing' },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex justify-between gap-4">
                      <span className="text-slate-500 font-medium shrink-0">{k}</span>
                      <span className="text-slate-800 font-semibold text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* Story text */}
              <FadeIn delay={0.1} className="lg:col-span-2 space-y-5 text-slate-700 leading-relaxed">
                <p>
                  GenSeed Capital was founded by Alessandro, a 25-year-old finance professional
                  who saw firsthand how the most exciting investment opportunities remain locked behind
                  institutional walls.
                </p>
                <p>
                  After working in finance and fund management, Alessandro witnessed the disconnect:
                  breakthrough technologies in longevity science and space economy were attracting billions
                  from ultra-wealthy investors and institutions, while talented professionals, domain experts,
                  and mission-driven individuals were completely shut out.
                </p>
                <p>
                  The traditional venture capital model requires €500,000 to €5 million minimum investments —
                  accessible to perhaps 0.1% of Europeans. Meanwhile, retail investors are limited to either
                  crowdfunding platforms with no portfolio diversification, public markets where frontier tech
                  companies rarely list, or missing out entirely on early-stage opportunities.
                </p>
                <p>
                  This made no sense. If you're a biotech researcher who understands longevity science, or an
                  aerospace engineer who sees the space economy's potential, why shouldn't you be able to invest
                  alongside the billionaires?
                </p>
                <p>
                  The launch of ELTIF 2.0 in 2024 changed everything. For the first time, EU regulation allows
                  retail-accessible venture capital with proper investor protection. We saw the opportunity and acted.
                </p>
                <p className="font-semibold text-slate-900">
                  GenSeed Capital is our answer: professional VC quality, retail accessibility, and a community
                  of engaged investors who bring expertise, not just capital.
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ──────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Purpose</span>
            <h2 className="section-title mb-4">Vision & Mission</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <FadeIn delay={0.1}>
              <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 text-2xl flex items-center justify-center mb-5">🎯</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Mission</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  Make frontier technology investing accessible to everyone who believes in extending human
                  life and expanding human reach — not just the ultra-wealthy.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-white border border-slate-200 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 text-2xl flex items-center justify-center mb-5">🔭</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Our Vision</h3>
                <p className="text-slate-700 leading-relaxed text-sm">
                  By 2030, thousands of Europeans will have participated in financing the longevity and space
                  revolutions through GenSeed Capital. Our portfolio companies will be extending healthy
                  lifespan and building space infrastructure.
                </p>
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.1}>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">Our Values</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="text-2xl mb-3 block">{v.icon}</span>
                  <h4 className="font-bold text-slate-900 mb-2">{v.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">People</span>
            <h2 className="section-title mb-4">The Team</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 lg:p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
              <div className="shrink-0">
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shadow-xl shadow-blue-700/20 grayscale hover:grayscale-0 transition-all duration-500"
                  aria-label="Alessandro founder photo"
                >
                  <span className="text-white text-4xl font-black select-none">A</span>
                </div>
                <p className="text-xs italic text-slate-400 mt-1 text-center">Professional photo coming soon</p>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <div className="mb-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Founder & Fund Manager</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">Alessandro</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-5">
                  25-year-old finance professional with background in fund management and financial analysis.
                  Based in Luxembourg. Responsible for fund strategy, deal sourcing, investor relations, and
                  portfolio management.
                </p>
                <div className="flex gap-3 justify-center sm:justify-start">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center hover:bg-blue-600 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={16} />
                  </a>
                  <a
                    href="mailto:hello@genseed.vc"
                    className="w-9 h-9 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition-colors"
                    aria-label="Email"
                  >
                    <FaEnvelope size={14} />
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Future Team ───────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="section-badge mb-4">Growth</span>
            <h2 className="section-title mb-4">We're Growing</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              As GenSeed Capital scales, we're building a team of domain experts and operators.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            {futurRoles.map((role, i) => (
              <FadeIn key={role.title} delay={i * 0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-2xl">{role.icon}</span>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{role.eta}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{role.title}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{role.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn>
            <div className="bg-blue-950 rounded-2xl p-6 text-center">
              <HiMail className="text-blue-400 mx-auto mb-3" size={24} />
              <p className="font-bold text-white mb-1">Interested in joining?</p>
              <p className="text-slate-400 text-sm mb-4">
                We're looking for mission-driven professionals who want to democratize frontier tech investing.
              </p>
              <a
                href="mailto:careers@genseed.vc"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-semibold text-sm transition-colors"
              >
                careers@genseed.vc <HiArrowRight size={14} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Why Luxembourg ────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl max-w-4xl mx-auto">
          <FadeIn className="text-center mb-12">
            <span className="section-badge mb-4">Home Base</span>
            <h2 className="section-title mb-4">Why Luxembourg?</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Luxembourg isn't just our legal domicile — it's strategically central to what we're building.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {luxembourgReasons.map((r, i) => (
              <FadeIn key={r.label} delay={i * 0.08}>
                <div className="flex gap-3 items-start p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <HiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{r.label}</p>
                    <p className="text-slate-500 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Journey Timeline ──────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl max-w-3xl mx-auto">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Timeline</span>
            <h2 className="section-title mb-4">Our Journey</h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 -translate-x-1/2" />

            <div className="space-y-10">
              {journeyTimeline.map((item, i) => {
                const isRight = i % 2 === 0
                return (
                  <FadeIn key={item.date} delay={i * 0.08}>
                    <div className={`relative flex items-start gap-6 ${isRight ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                      {/* Node */}
                      <div className={`absolute left-6 sm:left-1/2 -translate-x-1/2 rounded-full border-2 border-white shadow z-10 mt-1 ${item.current ? 'w-5 h-5 bg-emerald-500 animate-pulse' : 'w-4 h-4 bg-blue-600'}`} />

                      {/* Content */}
                      <div className={`ml-14 sm:ml-0 sm:w-[calc(50%-2rem)] ${isRight ? 'sm:pr-8 sm:text-right' : 'sm:pl-8'}`}>
                        <div className={`flex items-center gap-2 ${isRight ? 'sm:justify-end' : ''}`}>
                          <span className={`text-xs font-bold uppercase tracking-wider ${item.current ? 'text-emerald-600' : 'text-blue-600'}`}>{item.date}</span>
                          {item.current && (
                            <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Current</span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 mt-0.5 mb-1">{item.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 dot-pattern" />
        <div className="container-xl relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Join us in building the future
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-10 leading-relaxed">
              Whether as an investor, advisor, or team member — there's a place for you at GenSeed Capital.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/invest-now" className="btn-primary text-base px-8 py-4">
                Invest in Fund I <HiArrowRight />
              </Link>
              <button
                onClick={() => setCalendlyOpen(true)}
                className="btn-secondary text-base px-8 py-4"
              >
                Schedule a Call
              </button>
              <Link href="/community" className="btn-secondary text-base px-8 py-4">
                Join Our Community
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
