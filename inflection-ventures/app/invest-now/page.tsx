'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  HiArrowRight, HiCheckCircle, HiXCircle, HiChevronDown, HiShieldCheck,
  HiLockClosed, HiCurrencyEuro, HiClipboardCheck, HiUserGroup, HiTrendingUp,
  HiStar, HiPhone, HiMail, HiCalendar,
} from 'react-icons/hi'
import { FaDna, FaRocket } from 'react-icons/fa'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

const funds = [
  {
    id: 'I',
    status: 'Open',
    open: true,
    min: '€10,000',
    target: '€3–5M',
    sectors: '50% Longevity / 50% Space',
    returns: '3–5× net MOIC',
    timeline: '7–10 years',
    focus: 'Seed & Series A',
    vintageYear: '2025',
    mgmtFee: '2.0% p.a.',
    carry: '20%',
  },
  { id: 'II', status: 'Coming 2027', open: false, min: 'TBD', target: 'TBD', sectors: 'Longevity Focus', returns: 'TBD', timeline: '8–10 years', focus: 'Series A & B', vintageYear: '2027', mgmtFee: 'TBD', carry: 'TBD' },
  { id: 'III', status: 'Coming 2028', open: false, min: 'TBD', target: 'TBD', sectors: 'Space Economy Focus', returns: 'TBD', timeline: '8–10 years', focus: 'Growth Stage', vintageYear: '2028', mgmtFee: 'TBD', carry: 'TBD' },
  { id: 'IV', status: 'Coming 2029', open: false, min: 'TBD', target: 'TBD', sectors: 'Diversified', returns: 'TBD', timeline: '10 years', focus: 'Multi-Stage', vintageYear: '2029', mgmtFee: 'TBD', carry: 'TBD' },
]

const investmentSteps = [
  { icon: <HiClipboardCheck size={24} />, title: 'Complete Qualification', desc: 'Answer a few questions about your investor status. Takes 5 minutes. No credit check required.' },
  { icon: <HiUserGroup size={24} />, title: 'Intro Call (Optional)', desc: 'Schedule a 20-minute call with our investor relations team to ask questions about Fund I.' },
  { icon: <HiCurrencyEuro size={24} />, title: 'Review & Sign Docs', desc: 'Receive your personalised subscription documents. Review with your legal counsel if desired. Sign electronically.' },
  { icon: <HiTrendingUp size={24} />, title: 'Capital Call', desc: 'Capital is called in tranches as investments are ready to close — you\'ll receive advance notice each time.' },
  { icon: <HiStar size={24} />, title: 'Welcome to the Community', desc: 'Get your community login, join the Slack, and start connecting with fellow investors immediately.' },
]

const canInvest = [
  'EU residents aged 18+ with €10,000+ to invest',
  'Non-EU residents via eligible feeder structures',
  'Professional investors (unlimited amount)',
  'Family offices and wealth managers',
  'High-net-worth individuals (€500K+ investable)',
  'Corporate entities registered in the EU',
  'Pension funds and institutional investors',
]

const cannotInvest = [
  'US persons or US tax residents',
  'Investors from FATF blacklisted jurisdictions',
  'Persons without valid KYC/AML documentation',
  'Minors (under 18 years of age)',
  'Investors unable to lock up capital for 7+ years',
  'Anyone looking for guaranteed returns or capital protection',
]

const faqs = [
  { q: 'What is the minimum investment for Fund I?', a: 'The minimum investment in Fund I is €10,000. This applies to retail investors under the ELTIF 2.0 framework. Professional investors may invest any amount above this minimum.' },
  { q: 'How long is my capital locked up?', a: 'Fund I has a target duration of 7–10 years. ELTIF 2.0 allows for limited liquidity windows, and we maintain a Secondary Market program where investors can seek to transfer positions to other eligible investors, though this cannot be guaranteed.' },
  { q: 'Am I eligible to invest if I live outside the EU?', a: 'Fund I is primarily structured for EU investors. Non-EU investors may be able to participate through eligible feeder structures. Contact us to discuss your specific situation.' },
  { q: 'How are investments selected?', a: 'Our Investment Committee selects investments after a thorough due diligence process. Community Working Groups contribute sector expertise and investment leads, but the final decision rests with the professional investment team.' },
  { q: 'What fees does Inflection Ventures charge?', a: 'Fund I charges a 2.0% annual management fee on committed capital and a 20% carried interest on profits above the hurdle rate (6% p.a.). There are no additional hidden fees.' },
  { q: 'What is the hurdle rate?', a: 'We have a preferred return (hurdle rate) of 6% p.a. This means investors receive the first 6% of returns before our carried interest kicks in. After the hurdle, we apply a 20% carry.' },
  { q: 'When will I see returns?', a: 'Venture capital is illiquid and long-term. You should not expect distributions before year 5-6 at the earliest. Target exits happen between years 7-10. We will distribute proceeds to investors as exits occur.' },
  { q: 'What is ELTIF 2.0 and why does it matter?', a: 'The European Long-Term Investment Fund 2.0 regulation (effective January 2024) allows EU funds to accept retail investors from €10,000 with full regulatory protection. This is the framework that makes our low minimum possible.' },
  { q: 'How many portfolio companies will Fund I hold?', a: 'We target a portfolio of 12–18 companies, split equally between longevity and space economy sectors. This provides meaningful diversification while maintaining conviction-level positions.' },
  { q: 'Can I invest via my pension or SIPP?', a: 'This depends on your pension structure and national rules. In some EU member states, ELTIFs can be held in pension accounts. We recommend consulting your pension administrator and a tax advisor.' },
  { q: 'Is there a co-investment programme?', a: 'Yes. Advisory Board members and active Working Group contributors receive priority access to co-investment opportunities in portfolio company follow-on rounds, subject to availability.' },
  { q: 'How do I get my money back?', a: 'Returns are distributed to investors as portfolio companies are exited through M&A, secondary sales, or IPOs. We aim to return all invested capital plus returns by year 10. Early exit may be possible via the secondary market programme.' },
]

function FaqItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        className="w-full text-left flex items-center justify-between gap-4 p-5 hover:bg-slate-50 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
        <HiChevronDown className={`shrink-0 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} size={18} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-5"
        >
          <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4">{faq.a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function InvestNowPage() {
  const [waitlistEmail, setWaitlistEmail] = useState('')
  const [waitlistName, setWaitlistName] = useState('')
  const [waitlistSubmitted, setWaitlistSubmitted] = useState(false)

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-950 to-blue-950">
        <div className="container-xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              Fund I · Open for Investment
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Become an investor
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                in tomorrow's science
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Join 200+ investors backing the companies that will define longevity
              and the space economy. Starting from €10,000.
            </p>
            <a
              href="#start"
              className="btn-primary text-base px-8 py-4"
            >
              Start the Process <HiArrowRight />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Available Funds (detailed) */}
      <section id="details" className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Available Funds</span>
            <h2 className="section-title mb-4">Choose your fund</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Fund I is open now. Future funds are in planning — reserve your place early.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {funds.map((fund, i) => (
              <FadeIn key={fund.id} delay={i * 0.1}>
                <div className={`relative rounded-2xl border-2 p-6 flex flex-col h-full transition-all duration-300 ${fund.open ? 'border-emerald-400 bg-white shadow-xl shadow-emerald-500/10' : 'border-slate-200 bg-slate-50 opacity-80'}`}>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl font-black text-slate-900">Fund {fund.id}</span>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${fund.open ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
                      {fund.status}
                    </span>
                  </div>
                  <div className="space-y-2.5 flex-1 mb-6">
                    {[
                      { label: 'Minimum', value: fund.min },
                      { label: 'Target', value: fund.target },
                      { label: 'Allocation', value: fund.sectors },
                      { label: 'Target Return', value: fund.returns },
                      { label: 'Timeline', value: fund.timeline },
                      { label: 'Stage', value: fund.focus },
                      { label: 'Mgmt Fee', value: fund.mgmtFee },
                      { label: 'Carry', value: fund.carry },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between items-start gap-2 text-xs">
                        <span className="text-slate-500 shrink-0">{label}</span>
                        <span className={`font-semibold text-right ${fund.open ? 'text-slate-900' : 'text-slate-500'}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                  {fund.open ? (
                    <a href="#start" className="block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors">
                      Invest Now
                    </a>
                  ) : (
                    <a href="#waitlist" className="block w-full text-center border border-slate-300 text-slate-500 hover:bg-slate-100 font-medium py-2.5 rounded-lg text-sm transition-colors">
                      Join Waitlist
                    </a>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Process */}
      <section id="start" className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">The Process</span>
            <h2 className="section-title mb-4">How to invest in 5 steps</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              From first click to community member in under a week. No complicated paperwork — we guide you every step.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto">
            {investmentSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="flex gap-5 mb-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center shrink-0 shadow-md">
                      {step.icon}
                    </div>
                    {i < investmentSteps.length - 1 && <div className="w-px flex-1 bg-slate-200 mt-2" />}
                  </div>
                  <div className="pb-6">
                    <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">Step {i + 1}</div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}

            <FadeIn>
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 text-center">
                <p className="text-slate-700 font-semibold mb-4">Ready to start? Begin your qualification below.</p>
                <a
                  href="mailto:invest@inflection.vc?subject=Fund%20I%20Investment%20Inquiry"
                  className="btn-primary text-base px-8 py-4 inline-flex"
                >
                  Start Investment Process <HiArrowRight />
                </a>
                <p className="text-xs text-slate-400 mt-3">Or email us at invest@inflection.vc</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Eligibility</span>
            <h2 className="section-title mb-4">Who can invest?</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              ELTIF 2.0 opens the door for EU retail investors. Here's who is eligible.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <FadeIn delay={0.1}>
              <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-6">
                  <HiCheckCircle className="text-emerald-500" size={28} />
                  <h3 className="font-bold text-slate-900 text-lg">Can Invest ✅</h3>
                </div>
                <ul className="space-y-3">
                  {canInvest.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start">
                      <HiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={16} />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-7">
                <div className="flex items-center gap-3 mb-6">
                  <HiXCircle className="text-red-500" size={28} />
                  <h3 className="font-bold text-slate-900 text-lg">Cannot Invest ❌</h3>
                </div>
                <ul className="space-y-3">
                  {cannotInvest.map((item) => (
                    <li key={item} className="flex gap-2.5 items-start">
                      <HiXCircle className="text-red-500 shrink-0 mt-0.5" size={16} />
                      <span className="text-slate-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Fee Structure */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Fee Structure</span>
            <h2 className="section-title mb-4">Simple, transparent fees</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              We believe in alignment. Our fee structure ensures we only profit significantly
              when you do.
            </p>
          </FadeIn>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <FadeIn delay={0.1}>
                <div className="bg-white border border-slate-200 rounded-2xl p-8">
                  <div className="text-4xl font-black text-blue-700 mb-2">2.0%</div>
                  <div className="text-lg font-bold text-slate-900 mb-2">Annual Management Fee</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Charged on committed capital during the investment period, transitioning to invested
                    capital in the harvest period. Covers fund operations, team, compliance, and reporting.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.2}>
                <div className="bg-white border border-slate-200 rounded-2xl p-8">
                  <div className="text-4xl font-black text-emerald-600 mb-2">20%</div>
                  <div className="text-lg font-bold text-slate-900 mb-2">Carried Interest</div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Applied only on profits above the 6% p.a. hurdle rate. If we don't beat the hurdle,
                    we earn no carry. European-style waterfall — investors get their money back first.
                  </p>
                </div>
              </FadeIn>
            </div>

            {/* Worked example */}
            <FadeIn>
              <div className="bg-slate-900 rounded-2xl p-8">
                <h3 className="text-white font-bold text-lg mb-6">Worked example: €25,000 investment at 4× gross return</h3>
                <div className="space-y-3 text-sm">
                  {[
                    { label: 'Initial commitment', value: '€25,000', highlight: false },
                    { label: 'Gross return at 4× (10 years)', value: '€100,000', highlight: false },
                    { label: 'Less: management fees (~2% × 10yr)', value: '−€5,000', highlight: false },
                    { label: 'Less: carried interest (20% of profits above hurdle)', value: '−€13,500', highlight: false },
                    { label: 'Net return to investor', value: '€81,500', highlight: true },
                    { label: 'Net MOIC', value: '~3.3×', highlight: true },
                  ].map((row) => (
                    <div key={row.label} className={`flex justify-between items-center py-2 ${row.highlight ? 'border-t border-slate-700 mt-2 pt-4' : ''}`}>
                      <span className={row.highlight ? 'text-white font-semibold' : 'text-slate-400'}>{row.label}</span>
                      <span className={row.highlight ? 'text-emerald-400 font-bold text-base' : 'text-white'}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-4">
                  * Illustrative only. Actual returns will vary. This is not a guarantee or projection of future performance.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Risk Disclosure */}
      <section className="py-16 bg-amber-50 border-y border-amber-200">
        <div className="container-xl">
          <FadeIn>
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <HiShieldCheck className="text-amber-600 shrink-0" size={28} />
                <h2 className="text-2xl font-bold text-slate-900">Important Risk Disclosure</h2>
              </div>
              <div className="prose prose-sm text-slate-700 max-w-none space-y-3">
                <p><strong>Capital at risk.</strong> Investment in Inflection Ventures Fund I carries significant risk, including the risk of total loss of capital. Venture capital investments are inherently illiquid and speculative.</p>
                <p><strong>Illiquidity risk.</strong> Your investment is locked for the fund duration of 7–10 years. You may not be able to access your capital before this period ends.</p>
                <p><strong>Performance risk.</strong> Past performance of venture capital funds is not indicative of future results. Stated target returns (3–5×) are projections only and not guaranteed.</p>
                <p><strong>Concentration risk.</strong> While we target 12–18 portfolio companies, early-stage investments carry high failure rates. Many portfolio companies may return zero.</p>
                <p><strong>Regulatory risk.</strong> Biotech and aerospace investments are subject to regulatory approval processes that may fail or be delayed.</p>
                <p className="text-xs text-slate-500">This material does not constitute investment advice. Please read the full Fund Prospectus before investing and seek independent financial and legal advice if needed.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">FAQ</span>
            <h2 className="section-title mb-4">Common questions</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Everything you need to know before you invest. More questions? Email us.
            </p>
          </FadeIn>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <FadeIn key={faq.q} delay={i * 0.03}>
                <FaqItem faq={faq} index={i} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-24 bg-slate-50">
        <div className="container-xl">
          <div className="max-w-2xl mx-auto text-center">
            <FadeIn>
              <span className="section-badge mb-4">Future Funds</span>
              <h2 className="section-title mb-4">Join the waitlist for Funds II–IV</h2>
              <p className="section-subtitle mb-8">
                Secure priority access to future fund launches. Waitlist members get first allocation
                and advance notice of terms.
              </p>
              {waitlistSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8">
                  <HiCheckCircle className="text-emerald-500 mx-auto mb-3" size={40} />
                  <p className="text-emerald-700 font-bold text-lg">You're on the list!</p>
                  <p className="text-emerald-600 text-sm mt-2">We'll contact you when Fund II launches.</p>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => { e.preventDefault(); setWaitlistSubmitted(true) }}
                >
                  <input
                    type="text"
                    value={waitlistName}
                    onChange={(e) => setWaitlistName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <input
                    type="email"
                    value={waitlistEmail}
                    onChange={(e) => setWaitlistEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                  <button type="submit" className="btn-primary w-full justify-center text-base py-3.5">
                    Join Waitlist <HiArrowRight />
                  </button>
                  <p className="text-xs text-slate-400">No spam. Unsubscribe any time.</p>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 dot-pattern" />
        <div className="container-xl relative z-10 text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              The future is being built now.
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Fund it.
              </span>
            </h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Fund I is open. Limited capacity. Invest from €10,000 and join the community shaping
              longevity and space.
            </p>
            <a
              href="mailto:invest@inflection.vc?subject=Fund%20I%20Investment%20Inquiry"
              className="btn-primary text-base px-8 py-4 inline-flex"
            >
              Start Your Investment Today <HiArrowRight />
            </a>
          </FadeIn>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto text-center">
            <FadeIn>
              <div className="flex flex-col items-center gap-2">
                <HiMail className="text-blue-700" size={24} />
                <p className="font-semibold text-slate-900 text-sm">Email</p>
                <a href="mailto:invest@inflection.vc" className="text-blue-700 text-sm hover:underline">invest@inflection.vc</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="flex flex-col items-center gap-2">
                <HiCalendar className="text-emerald-600" size={24} />
                <p className="font-semibold text-slate-900 text-sm">Book a Call</p>
                <a href="#" className="text-emerald-600 text-sm hover:underline">Schedule 20 min →</a>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="flex flex-col items-center gap-2">
                <HiPhone className="text-slate-600" size={24} />
                <p className="font-semibold text-slate-900 text-sm">Luxembourg Office</p>
                <p className="text-slate-500 text-sm">Kirchberg, Luxembourg City</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
