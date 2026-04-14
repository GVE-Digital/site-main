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
        url: 'https://gvedigital.com/og?title=GVE+Digital+%7C+Marketing+Comercial+B2B&description=Demanda+qualificada+e+previsibilidade+comercial+para+empresas+B2B',
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
  icons: {
    icon: '/gve-favicon.png',
    shortcut: '/gve-favicon.png',
    apple: '/gve-favicon.png',
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
    url: 'https://gvedigital.com/gve-favicon.png',
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
    'https://www.linkedin.com/company/gvedigital/',
    'https://www.instagram.com/gvedigitaltech/',
    'https://www.youtube.com/@GVEDigital',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-K3T7K8DD');`,
          }}
        />
        {/* ─── Google Ads ─────────────────────────────────────────── */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16646303402" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','AW-16646303402');`,
          }}
        />
        {/* ─── Meta Pixel (browser-side) ──────────────────────────── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1276444017301444');fbq('track','PageView');`,
          }}
        />
        {/* ─── Meta Domain Verification ───────────────────────────── */}
        <meta name="facebook-domain-verification" content="6dgfre2sqo8n38s4m7cah4k0p4cx6c" />
        {/* ─── Schema Organization ────────────────────────────────── */}
        <SchemaMarkup schema={organizationSchema} />
      </head>
      <body className="font-sans bg-gve-bg text-gve-text antialiased">
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K3T7K8DD"
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
