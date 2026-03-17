import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description:
    'GenSeed Capital was founded by Alessandro, a 25-year-old Luxembourg-based finance professional, to democratize access to longevity and space economy venture capital under ELTIF 2.0.',
  openGraph: {
    title: 'About GenSeed Capital',
    description:
      'Who we are, why we built this, our mission, team, and the journey so far. Retail-accessible VC from Luxembourg.',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
