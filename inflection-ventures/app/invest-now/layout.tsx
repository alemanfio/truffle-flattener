import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Invest Now',
  description:
    'Invest in Inflection Ventures Fund I from €10,000. Longevity & space economy VC. ELTIF 2.0 regulated. Learn about eligibility, fees, and the 5-step process.',
  openGraph: {
    title: 'Invest Now | Inflection Ventures',
    description:
      'Fund I is open. Minimum €10,000. 2% management fee, 20% carry above 6% hurdle. EU retail investors welcome under ELTIF 2.0.',
  },
}

export default function InvestNowLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
