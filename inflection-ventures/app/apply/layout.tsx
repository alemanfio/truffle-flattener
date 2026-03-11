import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Raise Capital | Inflection Ventures',
  description:
    'Raising capital for your longevity or space economy startup? Apply for funding from Inflection Ventures - €150K-€400K investments in frontier technology.',
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children
}
