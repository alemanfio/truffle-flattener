import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Join 200+ scientists, engineers and investors in our three-tier community: Community Members, Working Groups, and Advisory Board. More than a fund.',
  openGraph: {
    title: 'Community | GenSeed Capital',
    description:
      'Working Groups, events, co-investment rights, and direct founder access. The network is as valuable as the returns.',
  },
}

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
