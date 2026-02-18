'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import {
  HiArrowRight,
  HiChevronRight,
  HiShieldCheck,
  HiLightningBolt,
  HiGlobeAlt,
  HiUserGroup,
  HiTrendingUp,
  HiLockClosed,
  HiStar,
  HiCheckCircle,
  HiClock,
  HiBadgeCheck,
} from 'react-icons/hi'
import {
  FaDna,
  FaRocket,
  FaChartLine,
  FaHandshake,
  FaLeaf,
  FaSatellite,
} from 'react-icons/fa'

/* ─── Reusable fade-in wrapper ─────────────────────────────────────── */
function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
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

/* ─── Fund card data ────────────────────────────────────────────────── */
const funds = [
  {
    id: 'I',
    status: 'Open',
    statusColor: 'emerald',
    min: '€10,000',
    target: '€3–5M',
    sectors: '50% Longevity / 50% Space',
    returns: '3–5×',
    timeline: '7–10 years',
    focus: 'Seed & Series A',
    open: true,
  },
  {
    id: 'II',
    status: 'Coming 2027',
    statusColor: 'slate',
    min: 'TBD',
    target: 'TBD',
    sectors: 'Longevity Focus',
    returns: 'TBD',
    timeline: '8–10 years',
    focus: 'Series A & B',
    open: false,
  },
  {
    id: 'III',
    status: 'Coming 2028',
    statusColor: 'slate',
    min: 'TBD',
    target: 'TBD',
    sectors: 'Space Economy Focus',
    returns: 'TBD',
    timeline: '8–10 years',
    focus: 'Growth Stage',
    open: false,
  },
  {
    id: 'IV',
    status: 'Coming 2029',
    statusColor: 'slate',
    min: 'TBD',
    target: 'TBD',
    sectors: 'Diversified',
    returns: 'TBD',
    timeline: '10 years',
    focus: 'Multi-Stage',
    open: false,
  },
]

/* ─── Stats data ────────────────────────────────────────────────────── */
const stats = [
  { value: '€600B', label: 'Longevity market by 2025' },
  { value: '€1.8T', label: 'Space economy by 2035' },
  { value: '€10K', label: 'Minimum investment' },
  { value: '3–5×', label: 'Target return multiple' },
]

/* ─── Persona data ──────────────────────────────────────────────────── */
const personas = [
  {
    icon: <FaChartLine className="text-blue-600" size={28} />,
    title: 'The Sophisticated Saver',
    description:
      'You have €10K–€50K to invest beyond your index funds. You want exposure to transformative technology without needing to pick individual stocks.',
    tags: ['€10K–€50K investable', 'Long-term horizon', 'Tech-curious'],
  },
  {
    icon: <FaHandshake className="text-emerald-600" size={28} />,
    title: 'The Impact Investor',
    description:
      'You want your capital to fund science that extends healthy human life and opens the solar system to humanity. Returns and purpose, aligned.',
    tags: ['ESG-aligned', 'Science-driven', 'Legacy-focused'],
  },
  {
    icon: <HiUserGroup className="text-purple-600" size={28} />,
    title: 'The Community Builder',
    description:
      'You see value in the network. You want to contribute expertise, connect founders, and be part of the conversation shaping the future of humanity.',
    tags: ['Network access', 'Expert community', 'Governance voice'],
  },
]

/* ─── Trust signals ─────────────────────────────────────────────────── */
const trustSignals = [
  {
    icon: <HiShieldCheck className="text-blue-600" size={32} />,
    title: 'ELTIF 2.0 Regulated',
    description:
      'Fully regulated under the EU\'s ELTIF 2.0 framework. Supervised by the CSSF in Luxembourg — one of Europe\'s top financial regulators.',
  },
  {
    icon: <HiGlobeAlt className="text-emerald-600" size={32} />,
    title: 'Luxembourg Domicile',
    description:
      'Structured as a Luxembourg SICAV-RAIF — the gold standard for European alternative investment funds with full EU passporting rights.',
  },
  {
    icon: <HiLockClosed className="text-purple-600" size={32} />,
    title: 'Community Governance',
    description:
      'Our Advisory Board and Working Groups give investors a genuine voice. Transparency reports every quarter. No black-box decisions.',
  },
]

/* ─── Solution features ─────────────────────────────────────────────── */
const solutions = [
  {
    icon: <FaDna className="text-emerald-500" size={24} />,
    title: 'Curated Deal Flow',
    description: 'Access the same longevity and space deals that were previously only available to institutional LPs and family offices.',
  },
  {
    icon: <FaRocket className="text-blue-500" size={24} />,
    title: 'Low Minimum Entry',
    description: 'Start with €10,000. ELTIF 2.0 regulatory reform makes this possible — bringing venture returns to a broader audience.',
  },
  {
    icon: <HiLightningBolt className="text-yellow-500" size={24} />,
    title: 'Community Alpha',
    description: 'Our investor community brings domain expertise from medicine, aerospace, and deep tech — actively supporting portfolio companies.',
  },
  {
    icon: <HiTrendingUp className="text-purple-500" size={24} />,
    title: 'Radical Transparency',
    description: 'Quarterly NAV updates, portfolio company reports, and governance minutes. You always know where your money is and why.',
  },
]

/* ═══════════════════════════════════════════════════════════════════════ */
/*  MAIN PAGE                                                             */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  /* Live counter */
  const [raised, setRaised] = useState(127400)
  useEffect(() => {
    const interval = setInterval(() => {
      setRaised((prev) => prev + Math.floor(Math.random() * 500 + 100))
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden hero-mesh">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="dot-pattern absolute inset-0" />
        </div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="container-xl relative z-10 pt-24 pb-16"
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-8"
            >
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              ELTIF 2.0 · Luxembourg · Open for Investment
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight mb-6"
            >
              Invest in the{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Science of Living Longer
              </span>{' '}
              and{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Reaching Further
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-10 max-w-2xl mx-auto"
            >
              Inflection Ventures is a Luxembourg ELTIF 2.0 VC fund giving retail investors
              access to venture-stage longevity and space economy companies — from €10,000.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/invest-now" className="btn-primary text-base px-8 py-4">
                Invest Now — from €10K
                <HiArrowRight />
              </Link>
              <Link href="/how-it-works" className="btn-secondary text-base px-8 py-4">
                How It Works
                <HiChevronRight />
              </Link>
            </motion.div>

            {/* Live Raised Ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 inline-flex items-center gap-3 bg-white/5 backdrop-blur border border-white/10 px-5 py-3 rounded-2xl"
            >
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-slate-400 text-sm">Fund I raised so far:</span>
              <span className="text-white font-bold tabular-nums text-sm">
                €{raised.toLocaleString('de-DE')}
              </span>
              <span className="text-slate-500 text-xs">/ €5,000,000 target</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-500 text-xs tracking-wider uppercase">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-10 bg-gradient-to-b from-slate-500 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── THE OPPORTUNITY ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">The Opportunity</span>
            <h2 className="section-title mb-4">
              Two sectors. One century-defining moment.
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Longevity science and the space economy are two of the most profound technological
              shifts of our lifetime. Both are at inflection points. Both require patient,
              mission-driven capital.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Longevity Card */}
            <FadeIn delay={0.1}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-8 lg:p-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/30">
                    <FaDna className="text-white" size={26} />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-emerald-700">€600B</span>
                  </div>
                  <p className="text-emerald-600 font-semibold mb-4">Global longevity market by 2025</p>
                  <p className="text-slate-700 leading-relaxed">
                    The global population aged 60+ will double by 2050. Therapeutics, diagnostics,
                    biotech, and health technology are converging to extend healthy human lifespan.
                    The capital opportunity is generational.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Biotech', 'AI Health', 'Longevity Drugs', 'Diagnostics', 'Wearables'].map((tag) => (
                      <span key={tag} className="text-xs font-medium text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Space Card */}
            <FadeIn delay={0.2}>
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-8 lg:p-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center mb-6 shadow-lg shadow-blue-700/30">
                    <FaRocket className="text-white" size={26} />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-5xl font-black text-blue-700">€1.8T</span>
                  </div>
                  <p className="text-blue-600 font-semibold mb-4">Space economy projected by 2035</p>
                  <p className="text-slate-700 leading-relaxed">
                    Reusable rockets, satellite constellations, in-orbit manufacturing, and
                    lunar commerce are transforming space from government monopoly to commercial
                    frontier. We are at the SpaceX moment for the broader ecosystem.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {['Launch', 'Satellites', 'Propulsion', 'In-Orbit Services', 'Defense'].map((tag) => (
                      <span key={tag} className="text-xs font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ─────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-950">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-full mb-4">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              The access gap is real — and it costs you.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              The best venture returns have historically been locked behind two barriers:
              high minimums and network gatekeeping. ELTIF 2.0 changes everything.
            </p>
          </FadeIn>

          {/* Access Pyramid */}
          <FadeIn>
            <div className="max-w-3xl mx-auto">
              {/* Tier 1 */}
              <div className="flex justify-center mb-2">
                <div className="bg-purple-900/60 border border-purple-700/40 rounded-2xl px-8 py-5 text-center w-72">
                  <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-1">Elite Access</p>
                  <p className="text-white font-bold">Endowments & Family Offices</p>
                  <p className="text-slate-400 text-sm">Minimum €1M+ · Exclusive networks</p>
                </div>
              </div>
              {/* Tier 2 */}
              <div className="flex justify-center mb-2">
                <div className="bg-blue-900/50 border border-blue-700/40 rounded-2xl px-8 py-5 text-center w-96">
                  <p className="text-blue-300 text-xs font-semibold uppercase tracking-wider mb-1">Institutional</p>
                  <p className="text-white font-bold">Pension Funds & Sovereign Wealth</p>
                  <p className="text-slate-400 text-sm">Minimum €250K+ · Extensive due diligence</p>
                </div>
              </div>
              {/* Tier 3 */}
              <div className="flex justify-center mb-2">
                <div className="bg-slate-800/80 border border-slate-600/40 rounded-2xl px-8 py-5 text-center w-full max-w-xl">
                  <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Previously locked out</p>
                  <p className="text-white font-bold text-lg">Retail & Affluent Investors</p>
                  <p className="text-slate-400 text-sm">You — with €10K–€100K to invest wisely</p>
                  <div className="mt-3 inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full">
                    ✓ ELTIF 2.0 opens this door
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── THE SOLUTION ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">The Solution</span>
            <h2 className="section-title mb-4">
              How Inflection Ventures works
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We combine institutional-grade deal sourcing with a regulated retail-accessible
              structure and a community that adds real value.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {solutions.map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className="card p-8">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── AVAILABLE FUNDS ─────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Available Funds</span>
            <h2 className="section-title mb-4">Start investing today, or join the waitlist</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Fund I is open for commitments. Future funds are in planning — secure your
              place in the queue.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {funds.map((fund, i) => (
              <FadeIn key={fund.id} delay={i * 0.1}>
                <div
                  className={`relative rounded-2xl border-2 p-6 flex flex-col h-full transition-all duration-300 ${
                    fund.open
                      ? 'border-emerald-400 bg-white shadow-xl shadow-emerald-500/10 hover:-translate-y-2'
                      : 'border-slate-200 bg-slate-100/60 opacity-80 hover:-translate-y-1'
                  }`}
                >
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-900">Fund {fund.id}</span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        fund.open
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-300 text-slate-600'
                      }`}
                    >
                      {fund.status}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 flex-1 mb-6">
                    {[
                      { label: 'Minimum', value: fund.min },
                      { label: 'Target Size', value: fund.target },
                      { label: 'Allocation', value: fund.sectors },
                      { label: 'Target Return', value: fund.returns },
                      { label: 'Timeline', value: fund.timeline },
                      { label: 'Stage Focus', value: fund.focus },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-2">
                        <span className="text-xs text-slate-500 shrink-0">{label}</span>
                        <span className={`text-xs font-semibold text-right ${fund.open ? 'text-slate-900' : 'text-slate-500'}`}>
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  {fund.open ? (
                    <div className="space-y-2">
                      <Link
                        href="/invest-now"
                        className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors"
                      >
                        Invest Now
                      </Link>
                      <Link
                        href="/invest-now#details"
                        className="block w-full text-center border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium py-2 rounded-lg text-sm transition-colors"
                      >
                        View Details
                      </Link>
                    </div>
                  ) : (
                    <Link
                      href="/invest-now#waitlist"
                      className="block w-full text-center border border-slate-300 text-slate-500 hover:bg-slate-200 font-medium py-2.5 rounded-lg text-sm transition-colors"
                    >
                      Join Waitlist
                    </Link>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900">
        <div className="container-xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <div className="text-4xl lg:text-5xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{stat.label}</div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Who We Serve</span>
            <h2 className="section-title mb-4">Built for investors who think differently</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Inflection Ventures is designed for a new kind of investor — one who combines
              financial ambition with belief in science and humanity's potential.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {personas.map((persona, i) => (
              <FadeIn key={persona.title} delay={i * 0.1}>
                <div className="card p-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                    {persona.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{persona.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-5 text-sm">{persona.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {persona.tags.map((tag) => (
                      <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST SIGNALS ───────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Why Trust Us</span>
            <h2 className="section-title mb-4">Built on regulatory bedrock</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              We chose Luxembourg and the ELTIF 2.0 framework for a reason:
              maximum investor protection, EU-wide access, and institutional credibility.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustSignals.map((signal, i) => (
              <FadeIn key={signal.title} delay={i * 0.1}>
                <div className="text-center p-8">
                  <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center mx-auto mb-5 shadow-sm">
                    {signal.icon}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{signal.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{signal.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Regulatory strip */}
          <FadeIn>
            <div className="mt-16 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-center sm:text-left">
              <HiBadgeCheck className="text-blue-700 shrink-0" size={40} />
              <div>
                <p className="font-semibold text-slate-900">Regulated & Compliant</p>
                <p className="text-sm text-slate-500">
                  Authorised under ELTIF Regulation (EU) 2015/760 as amended by Regulation (EU) 2023/606.
                  Supervised by the Commission de Surveillance du Secteur Financier (CSSF), Luxembourg.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 dot-pattern" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl" />

        <div className="container-xl relative z-10 text-center">
          <FadeIn>
            <span className="section-badge mb-6 border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              Fund I is Open
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight">
              The inflection point is now.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Will you be part of it?
              </span>
            </h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
              Fund I is accepting commitments from €10,000. Join our growing community
              of 200+ investors who believe science is the best asset class.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/invest-now" className="btn-primary text-base px-8 py-4">
                Start Your Investment
                <HiArrowRight />
              </Link>
              <Link href="/community" className="btn-secondary text-base px-8 py-4">
                Join the Community
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
