import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works',
  description:
    'Discover the 8-step process behind Inflection Ventures — from your €10K commitment to exits, community governance, and ELTIF 2.0 explained.',
  openGraph: {
    title: 'How It Works | Inflection Ventures',
    description:
      'An 8-step journey: invest, source, due diligence, community, deploy, support, transparency, exits. Built on ELTIF 2.0 regulatory bedrock.',
  },
}

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
