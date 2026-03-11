'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  HiArrowRight,
  HiCheckCircle,
  HiChevronDown,
} from 'react-icons/hi'

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

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        className="w-full text-left flex items-center justify-between gap-4 p-5 hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
        <HiChevronDown
          className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
          size={18}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-5"
        >
          <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">
            {faq.a}
          </p>
        </motion.div>
      )}
    </div>
  )
}

const focusCards = [
  {
    icon: '🧬',
    title: 'Longevity Science',
    items: [
      'Therapeutics extending healthy lifespan (senolytics, epigenetic reprogramming, NAD+ boosters)',
      'Diagnostics and biomarkers for early disease detection',
      'Precision medicine platforms and AI-driven drug discovery',
      'Neurodegenerative disease interventions',
      'Cardiovascular and metabolic health solutions',
    ],
  },
  {
    icon: '🚀',
    title: 'Space Economy',
    items: [
      'Launch systems and advanced propulsion technology',
      'Satellite infrastructure, constellations, and ground systems',
      'Earth observation and data analytics platforms',
      'In-orbit services and manufacturing',
      'Cislunar economy and lunar infrastructure',
    ],
  },
  {
    icon: '📍',
    title: 'Geographic Focus',
    items: [
      'Primary: EU member states (55%+ of portfolio)',
      'Secondary: United Kingdom (15%)',
      'Opportunistic: United States and global (30%)',
      'Strong preference for companies with EU operations',
    ],
  },
  {
    icon: '💰',
    title: 'Investment Stage & Size',
    items: [
      'Pre-seed: €50K–€100K initial tickets',
      'Seed: €150K–€250K initial tickets (our sweet spot)',
      'Series A: €250K–€400K initial tickets',
      'Follow-on capital reserved for top performers',
    ],
  },
]

const criteria = [
  'Proprietary technology with defensible competitive moat',
  'Founding team with deep domain expertise (PhD or 5+ years sector experience)',
  'Addressable market >€1B within 10 years',
  'Clear regulatory pathway (especially critical for biotech/aerospace)',
  'Evidence of early traction: data, pilots, letters of intent, or revenue',
  'Strong alignment with longevity or space economy thesis',
  'Reasonable valuation relative to stage and traction',
  'Potential for 10×+ return in success scenario (3–5× base case)',
  'ESG and ethical research standards met',
  'Institutional-quality business fundamentals and governance',
]

const processSteps = [
  {
    number: '01',
    title: 'Submit Application',
    desc: 'Complete our startup application form below (10 minutes). We review all submissions.',
  },
  {
    number: '02',
    title: 'Initial Review (1–2 weeks)',
    desc: 'Our team reviews applications and responds to promising fits with next steps.',
  },
  {
    number: '03',
    title: 'First Meeting (30 min)',
    desc: 'Introductory video call to discuss your company, technology, traction, and fundraising.',
  },
  {
    number: '04',
    title: 'Due Diligence (2–4 weeks)',
    desc: 'Deep dive into technology, market opportunity, team background, financials, and cap table.',
  },
  {
    number: '05',
    title: 'Investment Committee',
    desc: 'Presentation to our investment committee for final decision and term sheet preparation.',
  },
  {
    number: '06',
    title: 'Closing (2–3 weeks)',
    desc: 'Legal documentation, KYC/AML compliance, and fund transfer. Welcome to the portfolio.',
  },
]

const faqs = [
  {
    q: 'What stage companies do you invest in?',
    a: 'We focus on pre-seed through Series A startups. Our sweet spot is seed stage with €150K–€250K initial investments. We look for companies that have moved beyond pure concept stage and have some early validation (prototype, pilot customers, or initial data).',
  },
  {
    q: 'Do you lead rounds?',
    a: 'We can lead smaller rounds (€500K–€1M) or co-invest in larger rounds. For rounds above €1M, we typically co-invest alongside other institutional investors. We\'re flexible and focus on what\'s best for the company\'s growth trajectory.',
  },
  {
    q: 'What geographies do you cover?',
    a: 'We primarily invest in EU-based companies, which must represent at least 55% of our portfolio for ELTIF compliance. We also invest in UK companies (15%) and selectively in US or other global companies (30%) that strongly align with our thesis and have cooperation agreements.',
  },
  {
    q: 'How long does the investment process take?',
    a: 'From initial application to term sheet typically takes 4–8 weeks for companies that pass our initial screening. Due diligence depth varies based on stage, sector complexity, and regulatory requirements (biotech often requires more extensive review).',
  },
  {
    q: 'Do you provide follow-on capital?',
    a: 'Yes. We reserve 30% of our fund specifically for follow-on investments in portfolio companies that hit milestones and need growth capital. We aim to support our best companies through multiple rounds.',
  },
  {
    q: 'What makes you different from other VCs?',
    a: 'We combine institutional-quality investment processes with a community of 300+ retail investors who bring domain expertise in biotech, aerospace, medicine, and engineering. Our LPs can become customers, advisors, and advocates for portfolio companies—not just passive capital sources.',
  },
  {
    q: 'Can we apply if we\'re pre-revenue?',
    a: 'Yes. We invest in pre-revenue companies that have strong technical validation, clear path to market, and exceptional founding teams. However, you should have moved beyond pure concept stage—prototype, pilot data, or design partnerships are important.',
  },
  {
    q: 'Do you have exclusions or red lines?',
    a: 'Yes. We do not invest in: companies outside longevity or space sectors, financial services, real estate, consumer software without deep tech moat, companies requiring >€500K initial tickets, or pre-revenue companies more than 18 months from market.',
  },
]

export default function ApplyPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900 min-h-[420px] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 dot-pattern" />
        <div className="container-xl text-center relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              For Startups
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Raising Capital for Your
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                Frontier Tech Startup?
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-4">
              If you're building breakthrough technology in longevity science or space economy, we want to hear from you.
            </p>
            <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Inflection Ventures invests €150K–€400K in pre-seed to Series A companies advancing human lifespan and expanding humanity's reach. We're currently building our pipeline for Q2 2026 first close.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe49sNVFRjg45EMuZiZwr9IVfU__6rpHxQpSHIInAEOYw9Ezw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4"
              >
                Apply for Funding <HiArrowRight />
              </a>
              <Link href="/invest-now" className="btn-secondary text-base px-8 py-4">
                Invest Now <HiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Investment Focus ───────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-14">
            <span className="section-badge mb-4">Investment Focus</span>
            <h2 className="section-title mb-4">What We Invest In</h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              We back deep-tech founders working at the frontier of longevity science and the space economy.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {focusCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 0.08}>
                <div className="card p-8 h-full">
                  <div className="text-3xl mb-4">{card.icon}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4">{card.title}</h3>
                  <ul className="space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <HiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Investment Criteria ────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-14">
            <span className="section-badge mb-4">Selection Criteria</span>
            <h2 className="section-title mb-4">What We Look For in Companies</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
              {criteria.map((item) => (
                <div key={item} className="flex items-start gap-3 bg-white rounded-xl border border-slate-100 p-4">
                  <HiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={20} />
                  <span className="text-slate-700 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Investment Process ─────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl max-w-3xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-badge mb-4">Process</span>
            <h2 className="section-title mb-4">How It Works</h2>
          </FadeIn>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-blue-100" />

            <div className="space-y-8">
              {processSteps.map((step, i) => (
                <FadeIn key={step.number} delay={i * 0.08}>
                  <div className="relative flex items-start gap-6 pl-16">
                    {/* Step node */}
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20 z-10">
                      <span className="text-white text-xs font-black">{step.number}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{step.title}</h4>
                      <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <FadeIn delay={0.5}>
            <p className="text-center text-slate-500 text-sm mt-12 bg-blue-50 border border-blue-100 rounded-xl px-6 py-4">
              From application to term sheet typically takes <strong>4–8 weeks</strong> for companies that pass initial screening.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Primary CTA ────────────────────────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 dot-pattern" />
        <div className="container-xl relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to raise capital or invest in
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                frontier technology?
              </span>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe49sNVFRjg45EMuZiZwr9IVfU__6rpHxQpSHIInAEOYw9Ezw/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base px-8 py-4"
              >
                Apply for Funding <HiArrowRight />
              </a>
              <Link href="/invest-now" className="btn-primary text-base px-8 py-4">
                Invest Now <HiArrowRight />
              </Link>
            </div>
            <p className="text-slate-400 text-sm mt-6">
              Applications reviewed on a rolling basis • Responses within 2–3 weeks for promising fits
            </p>
            <p className="text-slate-500 text-sm mt-2">
              Questions? Email{' '}
              <a href="mailto:hello@inflection.vc" className="text-emerald-400 hover:text-emerald-300 transition-colors">
                hello@inflection.vc
              </a>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container-xl max-w-3xl mx-auto">
          <FadeIn className="text-center mb-14">
            <span className="section-badge mb-4">FAQ</span>
            <h2 className="section-title mb-4">Frequently Asked Questions</h2>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
