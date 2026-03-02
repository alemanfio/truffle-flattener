'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  HiArrowRight, HiCheckCircle, HiBeaker, HiChip, HiXCircle, HiExclamation,
} from 'react-icons/hi'
import {
  FaDna, FaRocket, FaBrain, FaPills, FaMicroscope, FaHeartbeat,
  FaSatellite, FaMoon, FaShieldAlt, FaEye,
} from 'react-icons/fa'
import DonutChart from '@/components/DonutChart'
import ROICalculator from '@/components/ROICalculator'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

const longevityFocusAreas = [
  { icon: <FaDna size={22} />, title: 'Longevity Therapeutics', desc: 'Senolytics, epigenetic reprogramming, and hallmark-of-aging interventions targeting the biological mechanisms of ageing.' },
  { icon: <FaBrain size={22} />, title: 'Neurodegenerative Disease', desc: 'Early diagnostics and therapeutics for Alzheimer\'s, Parkinson\'s, and ALS — one of the greatest unmet needs of our time.' },
  { icon: <FaPills size={22} />, title: 'Precision Medicine', desc: 'Genomics, proteomics, and AI-driven drug discovery enabling personalised health interventions at scale.' },
  { icon: <FaMicroscope size={22} />, title: 'Diagnostics & Biomarkers', desc: 'Liquid biopsies, wearable sensors, and AI-powered health monitoring for early disease detection.' },
  { icon: <FaHeartbeat size={22} />, title: 'Cardiovascular & Metabolic', desc: 'Novel approaches to heart disease, diabetes, and metabolic syndrome — the leading causes of preventable death.' },
  { icon: <HiBeaker size={22} />, title: 'Regenerative Medicine', desc: 'Stem cell therapies, organoids, and tissue engineering offering the promise of organ regeneration and repair.' },
]

const spaceFocusAreas = [
  { icon: <FaRocket size={22} />, title: 'Launch & Propulsion', desc: 'Next-gen rocket engines, small satellite launchers, and reusable vehicle technology making space access cheaper.' },
  { icon: <FaSatellite size={22} />, title: 'Satellite Constellations', desc: 'Earth observation, broadband connectivity, and IoT satellite networks enabling a data-rich world.' },
  { icon: <HiChip size={22} />, title: 'In-Orbit Manufacturing', desc: 'Zero-gravity production of pharmaceuticals, materials, and semiconductors — impossible to make on Earth.' },
  { icon: <FaMoon size={22} />, title: 'Lunar Economy', desc: 'Infrastructure for lunar resource extraction, surface mobility, and the emerging cislunar supply chain.' },
  { icon: <FaShieldAlt size={22} />, title: 'Space Defense & Security', desc: 'Space domain awareness, cyber resilience for satellite networks, and dual-use defense technologies.' },
  { icon: <FaEye size={22} />, title: 'Earth Observation & AI', desc: 'Analytics platforms turning terabytes of satellite imagery into actionable insights for agriculture, climate, and logistics.' },
]

const longevityTimeline = [
  { year: '2003', event: 'Human Genome Project completed — genomics era begins' },
  { year: '2013', event: 'mTOR pathway identified as longevity target' },
  { year: '2018', event: 'Senolytics enter Phase I clinical trials' },
  { year: '2021', event: 'Altos Labs raises $3B — reprogramming goes mainstream' },
  { year: '2024', event: 'First longevity drugs in Phase II/III trials' },
  { year: '2026', event: 'Longevity-focused biotech IPOs, FDA guidance on aging intervention trials' },
  { year: '2030+', event: 'First approved longevity therapeutics reach market' },
]

const spaceTimeline = [
  { year: '2015', event: 'SpaceX lands first orbital rocket booster' },
  { year: '2019', event: 'Starlink broadband constellation launches' },
  { year: '2022', event: 'James Webb Space Telescope — new era of discovery' },
  { year: '2024', event: 'Commercial lunar landing — private Moon economy begins' },
  { year: '2026', event: 'Crewed Mars mission preparation underway' },
  { year: '2030+', event: 'Permanent lunar outpost, Mars surface operations' },
]

const selectionCriteria = [
  'Proprietary technology with defensible competitive moat',
  'Founding team with domain expertise (PhD or 5+ years operator experience)',
  'Addressable market >€1B within 10 years',
  'Clear regulatory pathway (especially biotech/aerospace)',
  'Evidence of early traction: data, pilots, or letters of intent',
  'Strong alignment with longevity or space economy thesis',
  'Reasonable valuation relative to stage and traction',
  'Potential for 10×+ return in success scenario (3–5× base case)',
  'ESG and ethical research standards met',
  'Institutional-quality due diligence process',
]

const exclusions = [
  'Financial services, fintech, or insurtech companies',
  'Real estate and property technology',
  'Consumer software without deep tech moat',
  'Companies requiring >€500K initial investment',
  'Pre-revenue companies with >18 months to market',
  'Any sector outside longevity or space economy',
]

const portfolioAllocation = [
  { label: 'Longevity', pct: 50, color: 'bg-emerald-500', hex: '#10B981' },
  { label: 'Space Economy', pct: 50, color: 'bg-blue-700', hex: '#1D4ED8' },
]

const stageAllocation = [
  { label: 'Pre-seed', pct: 20, color: 'bg-slate-400', hex: '#94A3B8' },
  { label: 'Seed', pct: 50, color: 'bg-purple-500', hex: '#A855F7' },
  { label: 'Series A', pct: 30, color: 'bg-blue-500', hex: '#3B82F6' },
]

const geoAllocation = [
  { label: 'EU (Continental)', pct: 55, color: 'bg-blue-700', hex: '#1D4ED8' },
  { label: 'UK', pct: 15, color: 'bg-emerald-500', hex: '#10B981' },
  { label: 'US & Other', pct: 30, color: 'bg-purple-500', hex: '#A855F7' },
]

export default function InvestmentFocusPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-950 via-blue-950 to-slate-900">
        <div className="container-xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              Where We Invest
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Science that extends life.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Technology that expands horizons.
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Two sectors. Both at inflection points. Both requiring patient capital and
              domain expertise. Both offering generational return potential.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 px-5 py-3 rounded-2xl">
                <FaDna className="text-emerald-400" size={20} />
                <span className="text-white font-semibold">50% Longevity</span>
              </div>
              <div className="text-slate-500 font-bold">+</div>
              <div className="flex items-center gap-3 bg-blue-500/10 border border-blue-500/30 px-5 py-3 rounded-2xl">
                <FaRocket className="text-blue-400" size={20} />
                <span className="text-white font-semibold">50% Space Economy</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LONGEVITY SECTION */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <FaDna className="text-white" size={26} />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-emerald-600">Sector 1</span>
                <h2 className="text-3xl font-black text-slate-900">Longevity Science</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              {[
                { stat: '€600B+', label: 'Global longevity market by 2030' },
                { stat: '20+', label: 'Biomarkers of ageing identified' },
                { stat: '$50B+', label: 'VC invested in longevity 2020–24' },
                { stat: '2B', label: 'People aged 60+ by 2050' },
              ].map((s) => (
                <div key={s.stat} className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black text-emerald-700 mb-1">{s.stat}</div>
                  <div className="text-xs text-emerald-600 leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-slate-700 leading-relaxed max-w-3xl">
              For the first time in human history, we understand the biology of ageing well enough to
              intervene. From senescent cell clearance to epigenetic reprogramming, the scientific
              toolbox is filling rapidly. We invest in companies translating this science into
              therapies, diagnostics, and health platforms that extend healthy human lifespan.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {longevityFocusAreas.map((area, i) => (
              <FadeIn key={area.title} delay={i * 0.08}>
                <div className="card p-6 h-full border-emerald-100">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                    {area.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{area.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{area.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Example Portfolio Fit — Longevity */}
          <FadeIn className="mb-16">
            <div className="border border-emerald-200 bg-emerald-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📦</span>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-700">Example Portfolio Fit</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                A Cambridge-based biotech developing senolytic therapies targeting p16⁺ senescent cells.
                Phase I clinical data showing 40% reduction in senescent cell burden. Seed stage at €5M
                valuation, founded by former Calico and Genentech scientists with 3 <em>Nature</em> publications.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Why now? The longevity inflection</h3>
            <div className="relative pl-6 border-l-2 border-emerald-200 space-y-4">
              {longevityTimeline.map((point) => (
                <div key={point.year} className="relative">
                  <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow" />
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">{point.year}</span>
                  <p className="text-slate-700 text-sm">{point.event}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SPACE SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center shadow-lg shadow-blue-700/30">
                <FaRocket className="text-white" size={26} />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Sector 2</span>
                <h2 className="text-3xl font-black text-slate-900">Space Economy</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
              {[
                { stat: '€850B+', label: 'Space economy projected by 2030' },
                { stat: '10×', label: 'Launch cost reduction since 2015' },
                { stat: '2,800+', label: 'Active satellites in orbit today' },
                { stat: '$30B+', label: 'Private space investment 2023' },
              ].map((s) => (
                <div key={s.stat} className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
                  <div className="text-3xl font-black text-blue-700 mb-1">{s.stat}</div>
                  <div className="text-xs text-blue-600 leading-relaxed">{s.label}</div>
                </div>
              ))}
            </div>
            <p className="text-slate-700 leading-relaxed max-w-3xl">
              The commercialisation of space is the most significant economic frontier of the 21st
              century. Plummeting launch costs, miniaturised satellites, and growing government
              demand are creating massive opportunity across the value chain — from propulsion to
              in-orbit services to data analytics. We invest in the infrastructure layer of the
              space economy.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {spaceFocusAreas.map((area, i) => (
              <FadeIn key={area.title} delay={i * 0.08}>
                <div className="card p-6 h-full border-blue-100 bg-white">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                    {area.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{area.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{area.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Example Portfolio Fit — Space */}
          <FadeIn className="mb-16">
            <div className="border border-blue-200 bg-blue-50 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">📦</span>
                <span className="text-xs font-bold uppercase tracking-widest text-blue-700">Example Portfolio Fit</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                Berlin-based small satellite manufacturer producing 100 kg Earth observation satellites at
                €2M per unit. Series A at €15M valuation. Two satellites successfully launched, generating
                €5M ARR from ESA and commercial contracts. Proprietary propulsion system with 30% cost advantage.
              </p>
            </div>
          </FadeIn>

          <FadeIn>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Why now? The space inflection</h3>
            <div className="relative pl-6 border-l-2 border-blue-200 space-y-4">
              {spaceTimeline.map((point) => (
                <div key={point.year} className="relative">
                  <div className="absolute -left-[25px] w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{point.year}</span>
                  <p className="text-slate-700 text-sm">{point.event}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Portfolio Strategy */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Portfolio Strategy</span>
            <h2 className="section-title mb-4">How we build the portfolio</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Diversified across sectors, stages, and geographies — targeting 12–18 portfolio companies.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FadeIn delay={0.1}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex justify-center">
                <DonutChart data={portfolioAllocation} title="Sector Split" />
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex justify-center">
                <DonutChart data={stageAllocation} title="Stage Allocation" />
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200 flex justify-center">
                <DonutChart data={geoAllocation} title="Geography" />
              </div>
            </FadeIn>
          </div>

          {/* Selection Criteria */}
          <FadeIn className="mb-8">
            <div className="bg-slate-900 rounded-3xl p-8 lg:p-12">
              <h3 className="text-2xl font-bold text-white mb-8">Our investment selection criteria</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectionCriteria.map((criteria, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <HiCheckCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-slate-300 text-sm">{criteria}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* What We Exclude */}
          <FadeIn>
            <div className="border border-slate-200 rounded-3xl p-8 lg:p-10 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-2">What we don't invest in</h3>
              <p className="text-slate-500 text-sm mb-6">
                To maintain focus and ensure ELTIF compliance, we exclude:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {exclusions.map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <HiXCircle className="text-red-400 shrink-0 mt-0.5" size={18} />
                    <p className="text-slate-600 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-10 bg-white">
        <div className="container-xl">
          <FadeIn>
            <div className="border border-yellow-300 bg-yellow-50 rounded-2xl p-6 flex gap-4">
              <HiExclamation className="text-yellow-500 shrink-0 mt-0.5" size={24} />
              <div>
                <p className="font-bold text-yellow-800 mb-1">Important Investment Considerations</p>
                <p className="text-yellow-700 text-sm leading-relaxed">
                  Venture capital investments are high-risk and illiquid. Typical holding period is 7–10 years
                  with no guarantee of returns. Many portfolio companies will fail. Portfolio returns depend on
                  a small number of successful exits. Only invest capital you can afford to lose and don't need
                  for at least 10 years.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-12">
            <span className="section-badge mb-4">Interactive Tool</span>
            <h2 className="section-title mb-4">Calculate your potential returns</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Adjust the sliders to model different investment scenarios. Projections are illustrative only.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <ROICalculator />
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container-xl text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to be part of the future?</h2>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Fund I invests equally across longevity and space. Starting from €10,000.
            </p>
            <Link href="/invest-now" className="btn-primary text-base px-8 py-4">
              Start Investing <HiArrowRight />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
