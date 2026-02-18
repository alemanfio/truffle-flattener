import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Investment Focus',
  description:
    'Inflection Ventures invests 50% in longevity science and 50% in the space economy — two sectors at generational inflection points. Explore our thesis.',
  openGraph: {
    title: 'Investment Focus | Inflection Ventures',
    description:
      'Longevity therapeutics, precision medicine, launch vehicles, satellite constellations and more. €600B and €1.8T markets. Seed & Series A stage.',
  },
}

export default function InvestmentFocusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
