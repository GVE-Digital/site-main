import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import SchemaMarkup from '@/components/SchemaMarkup'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://gvedigital.com'),
  title: {
    default: 'GVE Digital | Estratégia, Tecnologia e Previsibilidade',
    template: '%s | GVE Digital',
  },
  description:
    'Agência de Marketing Comercial B2B. Geração de demanda qualificada e previsibilidade comercial em até 6 meses com metodologia GVED proprietária. 40+ empresas atendidas.',
  keywords: [
    'agência marketing b2b',
    'geração de leads b2b',
    'gestão de tráfego b2b',
    'meta ads b2b',
    'google ads b2b',
    'consultoria marketing b2b',
  ],
  authors: [{ name: 'GVE Digital', url: 'https://gvedigital.com' }],
  creator: 'GVE Digital',
  publisher: 'GV Estratégia Digital',
  alternates: {
    canonical: 'https://gvedigital.com',
  },
  openGraph: {
    siteName: 'GVE Digital',
    locale: 'pt_BR',
    type: 'website',
    title: 'GVE Digital | Estratégia, Tecnologia e Previsibilidade',
    description:
      'Agência de Marketing Comercial B2B. Geração de demanda qualificada e previsibilidade comercial em até 6 meses com metodologia GVED proprietária.',
    url: 'https://gvedigital.com',
    images: [
      {
        url: 'https://gvedigital.com/og/home.png',
        width: 1200,
        height: 630,
        alt: 'GVE Digital — Marketing Comercial B2B',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GVE Digital | Estratégia, Tecnologia e Previsibilidade',
    description: 'Agência de Marketing Comercial B2B com metodologia GVED proprietária.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    // ⚠️ TODO: adicionar apple-touch-icon e outros ícones da marca
  },
}

// Schema Organization — persiste em todas as páginas
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://gvedigital.com/#organization',
  name: 'GVE Digital',
  legalName: 'GV Estratégia Digital',
  url: 'https://gvedigital.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://gvedigital.com/logo.svg', // ⚠️ TODO: substituir pelo SVG real
    width: 200,
    height: 60,
  },
  foundingDate: '2023',
  description:
    'Agência de Marketing Comercial B2B especializada em geração de demanda qualificada com metodologia GVED proprietária. Mais de 40 empresas B2B atendidas.',
  areaServed: {
    '@type': 'Country',
    name: 'Brazil',
    identifier: 'BR',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Balneário Camboriú',
    addressRegion: 'SC',
    addressCountry: 'BR',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+55-47-99854-8232',
      contactType: 'sales',
      contactOption: 'TollFree',
      availableLanguage: 'Portuguese',
      areaServed: 'BR',
    },
    {
      '@type': 'ContactPoint',
      email: 'contato@gvedigital.com',
      contactType: 'customer support',
      availableLanguage: 'Portuguese',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/gvedigital-assessoria-de-marketing/',
    'https://www.instagram.com/gvedigitaltech/',
    // ⚠️ TODO: adicionar URL do YouTube quando disponível
  ],
  numberOfEmployees: {
    '@type': 'QuantitativeValue',
    minValue: 1,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        {/* ─── Google Tag Manager ─────────────────────────────────── */}
        {/* ⚠️ TODO: inserir GTM-XXXXXXX */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');`,
          }}
        />
        {/* ─── Meta Pixel (browser-side) ──────────────────────────── */}
        {/* ⚠️ TODO: inserir PIXEL_ID abaixo — o GTM pode gerenciar isso também */}
        {/* ─── Schema Organization ────────────────────────────────── */}
        <SchemaMarkup schema={organizationSchema} />
      </head>
      <body className="font-sans bg-gve-bg text-gve-text antialiased">
        {/* GTM noscript fallback */}
        {/* ⚠️ TODO: inserir GTM-XXXXXXX */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Navigation />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
