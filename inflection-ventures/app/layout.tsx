import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Inflection Ventures | ELTIF 2.0 VC Fund — Longevity & Space Economy',
    template: '%s | Inflection Ventures',
  },
  description:
    'Inflection Ventures is a Luxembourg-based ELTIF 2.0 venture capital fund democratising access to longevity and space economy investments. Minimum investment €10,000.',
  keywords: [
    'ELTIF 2.0',
    'venture capital',
    'longevity investments',
    'space economy',
    'Luxembourg fund',
    'retail investors',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_EU',
    url: 'https://inflection.vc',
    siteName: 'Inflection Ventures',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
