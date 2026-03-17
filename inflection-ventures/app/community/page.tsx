'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import {
  HiArrowRight, HiCheckCircle, HiUserGroup, HiStar, HiLightningBolt,
  HiGlobeAlt, HiAcademicCap, HiChat, HiBriefcase, HiHeart, HiShieldCheck,
} from 'react-icons/hi'
import { FaLinkedin } from 'react-icons/fa'

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}

const benefits = [
  {
    icon: <HiGlobeAlt size={26} />,
    color: 'blue',
    title: 'Global Investor Network',
    desc: 'Connect with 200+ investors from science, finance, aerospace, and medicine. The relationships you build here are as valuable as the returns.',
  },
  {
    icon: <HiAcademicCap size={26} />,
    color: 'emerald',
    title: 'Educational Deep-Dives',
    desc: 'Monthly expert sessions on longevity science, space tech, investment mechanics, and portfolio company updates. Stay ahead of the frontier.',
  },
  {
    icon: <HiLightningBolt size={26} />,
    color: 'yellow',
    title: 'Working Group Access',
    desc: 'Join specialised groups in Longevity Biology, Space Systems, AI & Data, or RegTech. Engage directly with founders and deal flow.',
  },
  {
    icon: <HiChat size={26} />,
    color: 'purple',
    title: 'Private Community Forum',
    desc: 'Slack community with topic channels, deal discussion threads, and direct access to the GenSeed Capital team.',
  },
  {
    icon: <HiBriefcase size={26} />,
    color: 'orange',
    title: 'Co-Investment Opportunities',
    desc: 'Accredited members get advance notice and priority allocation in portfolio company follow-on rounds and co-investment syndicates.',
  },
  {
    icon: <HiHeart size={26} />,
    color: 'red',
    title: 'Mission Alignment',
    desc: 'Be part of something bigger. Our investors actively fund science that will matter for the next 50 years of human civilisation.',
  },
]

const colorMap: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700',
  emerald: 'bg-emerald-100 text-emerald-700',
  yellow: 'bg-yellow-100 text-yellow-700',
  purple: 'bg-purple-100 text-purple-700',
  orange: 'bg-orange-100 text-orange-700',
  red: 'bg-red-100 text-red-700',
}

const events = [
  {
    date: 'Mar 15, 2026',
    type: 'Webinar',
    title: 'Hallmarks of Aging: 2026 State of the Science',
    desc: 'A deep-dive with leading longevity researchers on the latest published results and what they mean for our portfolio.',
    tag: 'Longevity',
    tagColor: 'emerald',
  },
  {
    date: 'Apr 3, 2026',
    type: 'Q&A',
    title: 'Portfolio Company Spotlight: [Stealth Biotech]',
    desc: 'Meet the founding team behind one of our seed investments. Live Q&A with investors and working group members.',
    tag: 'Portfolio',
    tagColor: 'blue',
  },
  {
    date: 'Apr 22, 2026',
    type: 'Conference',
    title: 'New Space Economy Forum — Luxembourg',
    desc: 'Join us at the annual New Space Economy Forum. GenSeed Capital investors receive priority invitations.',
    tag: 'Space',
    tagColor: 'purple',
  },
  {
    date: 'May 10, 2026',
    type: 'Working Group',
    title: 'AI in Drug Discovery — Working Group Session',
    desc: 'How machine learning is accelerating longevity drug development. With guest speaker from a leading AI pharma company.',
    tag: 'Longevity',
    tagColor: 'emerald',
  },
]

const testimonials = [
  {
    quote: "I've been an angel investor for 15 years and never had access to space and longevity deals at this ticket size. The community is genuinely impressive — you're learning from every conversation.",
    name: 'Dr. M. Andersen',
    role: 'Physician & Angel Investor',
    location: 'Denmark',
    initials: 'MA',
    color: 'emerald',
  },
  {
    quote: "As an aerospace engineer, I joined for the investment access but stayed for the Working Groups. Contributing technical due diligence on space deals and seeing my input matter in investment decisions is incredibly rewarding.",
    name: 'F. Laurent',
    role: 'Senior Aerospace Engineer',
    location: 'France',
    initials: 'FL',
    color: 'blue',
  },
  {
    quote: "ELTIF 2.0 felt like an abstract regulatory concept until I invested. The transparency of how GenSeed Capital operates — the quarterly reports, the governance minutes — gives me genuine confidence in where my money goes.",
    name: 'S. Bergmann',
    role: 'Tech Entrepreneur',
    location: 'Germany',
    initials: 'SB',
    color: 'purple',
  },
]

const conductPrinciples = [
  'Treat all community members with respect and assume good faith',
  'No solicitation of business or services within the community',
  'Maintain confidentiality of portfolio company information',
  'Engage constructively — disagreement is welcomed, harassment is not',
  'Conflicts of interest must be disclosed to the Investment Committee',
  'No sharing of inside information or material non-public data',
]

export default function CommunityPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container-xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-6">
              The Community
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
              Invest alongside the
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                people shaping the future
              </span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              200+ scientists, engineers, founders, and investors united by a belief that
              longevity science and space technology are the defining opportunities of our era.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3-Tier Engagement Model */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Engagement Tiers</span>
            <h2 className="section-title mb-4">Three levels of participation</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Every investor is a community member. The deeper you engage, the more influence
              and opportunity you unlock.
            </p>
          </FadeIn>

          {/* Visual hierarchy */}
          <div className="max-w-3xl mx-auto space-y-6">
            {/* Tier 3 - Widest */}
            <FadeIn>
              <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">Tier 1 · All Investors</span>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Community Members</h3>
                    <p className="text-slate-600 max-w-md">
                      Every LP in GenSeed Capital Fund I is automatically a community member.
                      Access to the private forum, quarterly reports, events, and educational content.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-slate-400">200+</div>
                    <div className="text-sm text-slate-500">members</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Private Forum', 'Quarterly Events', 'Portfolio Updates', 'Educational Content'].map((b) => (
                    <span key={b} className="text-xs font-medium bg-slate-200 text-slate-600 px-3 py-1 rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Tier 2 - Medium */}
            <FadeIn delay={0.1}>
              <div className="bg-blue-50 border-2 border-blue-200 rounded-3xl p-8 ml-0 sm:ml-8">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">Tier 2 · Active Contributors</span>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Working Groups</h3>
                    <p className="text-slate-600 max-w-md">
                      Join sector-specific working groups to contribute domain expertise, engage
                      with portfolio founders, and shape investment recommendations. Earn
                      Community Tokens for contributions.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-blue-600">40+</div>
                    <div className="text-sm text-slate-500">contributors</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Longevity Biology', 'Space Systems', 'AI & Data', 'Regulatory & Legal', 'Deal Sourcing'].map((b) => (
                    <span key={b} className="text-xs font-medium bg-blue-200 text-blue-700 px-3 py-1 rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Tier 1 - Narrowest */}
            <FadeIn delay={0.2}>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-3xl p-8 ml-0 sm:ml-16">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1 block">Tier 3 · Leadership</span>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">Advisory Board</h3>
                    <p className="text-slate-600 max-w-md">
                      Elected by community members annually. The Advisory Board provides strategic
                      guidance, represents investor interests, and reviews all major fund decisions.
                      Receives enhanced carry participation.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-black text-emerald-600">7</div>
                    <div className="text-sm text-slate-500">board seats</div>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {['Annual Election', 'Strategic Vote', 'Enhanced Carry', 'Portfolio Access', 'Co-Investment Rights'].map((b) => (
                    <span key={b} className="text-xs font-medium bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full">{b}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-slate-50">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="section-badge mb-4">Member Benefits</span>
            <h2 className="section-title mb-4">More than a fund — a community</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Membership in GenSeed Capital comes with access to a world-class network
              and educational resources.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <FadeIn key={b.title} delay={i * 0.08}>
                <div className="card bg-white p-7 h-full">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${colorMap[b.color]}`}>
                    {b.icon}
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{b.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <FadeIn className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <span className="section-badge mb-3">Upcoming Events</span>
              <h2 className="section-title">What's on the calendar</h2>
            </div>
            <Link href="#" className="text-blue-700 font-semibold text-sm hover:text-blue-800 transition-colors flex items-center gap-1">
              View all events <HiArrowRight />
            </Link>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <FadeIn key={event.title} delay={i * 0.1}>
                <div className="card p-6 h-full">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">{event.date} · {event.type}</p>
                      <h3 className="font-bold text-slate-900 text-lg leading-snug">{event.title}</h3>
                    </div>
                    <span className={`shrink-0 text-xs font-bold px-2.5 py-1 rounded-full
                      ${event.tagColor === 'emerald' ? 'bg-emerald-100 text-emerald-700' :
                        event.tagColor === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'}`}>
                      {event.tag}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{event.desc}</p>
                  <button className="text-sm font-semibold text-blue-700 hover:text-blue-800 transition-colors flex items-center gap-1">
                    Register <HiArrowRight size={14} />
                  </button>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900">
        <div className="container-xl">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full mb-4">
              From Our Community
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Hear from our investors</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.1}>
                <div className="bg-slate-800 border border-slate-700 rounded-2xl p-7 h-full flex flex-col">
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <HiStar key={j} className="text-yellow-400" size={16} />)}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-6 italic">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold
                      ${t.color === 'emerald' ? 'bg-emerald-600' : t.color === 'blue' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{t.name}</p>
                      <p className="text-slate-400 text-xs">{t.role} · {t.location}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Code of Conduct */}
      <section className="py-24 bg-white">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-blue-700 flex items-center justify-center">
                  <HiShieldCheck className="text-white" size={22} />
                </div>
                <div>
                  <span className="section-badge mb-1">Community Standards</span>
                  <h2 className="text-2xl font-bold text-slate-900">Code of Conduct</h2>
                </div>
              </div>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Our community is built on trust, expertise, and mission alignment. To maintain the
                quality and safety of our community, all members agree to the following principles:
              </p>
              <div className="space-y-4">
                {conductPrinciples.map((principle, i) => (
                  <div key={i} className="flex gap-3 items-start bg-slate-50 border border-slate-100 rounded-xl px-5 py-4">
                    <HiCheckCircle className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                    <p className="text-slate-700 text-sm">{principle}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-br from-emerald-900 to-blue-950">
        <div className="container-xl text-center">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Ready to join the community?
            </h2>
            <p className="text-slate-300 mb-8 max-w-md mx-auto">
              Invest in Fund I and gain immediate access to 200+ investors, scientists, and engineers
              building the future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/invest-now" className="btn-primary text-base px-8 py-4">
                Invest & Join Now <HiArrowRight />
              </Link>
              <a href="mailto:hello@genseed.vc" className="btn-secondary text-base px-8 py-4">
                Contact the Team
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
