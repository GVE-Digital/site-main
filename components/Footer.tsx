'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Linkedin, Instagram, Youtube, Mail } from 'lucide-react'

const serviceLinks = [
  { href: '/servicos/gved-marketing-b2b',    label: 'GVED Marketing Comercial B2B' },
  { href: '/servicos/gestao-meta-ads-b2b',   label: 'Gestão de Meta Ads B2B' },
  { href: '/servicos/gestao-google-ads-b2b', label: 'Gestão de Google Ads B2B' },
  { href: '/servicos/site-landing-page-b2b', label: 'Site Comercial e Landing Page' },
  { href: '/servicos/inteligencia-comercial', label: 'Inteligência Comercial B2B' },
]

const companyLinks = [
  { href: '/sobre',       label: 'Sobre a GVE' },
  { href: '/cases',        label: 'Cases' },
  { href: '/blog',        label: 'Blog' },
  { href: '/contato',     label: 'Contato' },
  { href: '/privacidade', label: 'Política de Privacidade' },
]

export default function Footer() {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: '#2f4960' }}
      aria-label="Rodapé"
    >
      {/* CTA band */}
      <div
        className="border-b"
        style={{ borderColor: 'rgba(255,255,255,0.12)', backgroundColor: '#243a4d' }}
      >
        <div
          className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6"
          style={{ maxWidth: '1280px' }}
        >
          <div>
            <p className="text-xl font-bold text-white">
              Pronto para ter previsibilidade comercial?
            </p>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Mais de 40 empresas B2B já estruturaram sua geração de demanda com a GVE.
            </p>
          </div>
          <Link
            href="/contato"
            className="btn btn-outline-white btn-lg flex-shrink-0"
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || []
                window.dataLayer.push({
                  event: 'cta_click',
                  cta_text: 'Agendar diagnóstico gratuito',
                  cta_destination: '/contato',
                  page_section: 'footer',
                  page_url: window.location.href,
                })
              }
            }}
          >
            Agendar diagnóstico gratuito
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div
        className="container mx-auto px-6 py-14"
        style={{ maxWidth: '1280px' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <Image
                src="/gve-logo-horizont-transparent.png"
                alt="GVE Digital"
                width={140}
                height={40}
                className="object-contain brightness-0 invert"
                style={{ height: '32px', width: 'auto' }}
              />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.65)' }}>
              Estratégia, Tecnologia e Previsibilidade para empresas B2B que precisam de demanda qualificada e pipeline comercial consistente.
            </p>
            {/* Badges parceiros */}
            <div className="flex flex-wrap gap-8 items-center">
              <Image src="/kommo-partner-dark.png" alt="Kommo Partner" width={120} height={40} />
              <Image src="/pipedrive-affiliate-dark.png" alt="Pipedrive Affiliate Partner" width={120} height={53} />
            </div>
          </div>

          {/* Coluna 2 — Serviços */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Serviços
            </h3>
            <ul className="space-y-2.5" role="list">
              {serviceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 — Empresa */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Empresa
            </h3>
            <ul className="space-y-2.5" role="list">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4 — Contato & Social */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Contato
            </h3>
            <ul className="space-y-3 mb-6" role="list">
              <li>
                <a
                  href="mailto:contato@gvedigital.com"
                  className="flex items-center gap-2 text-sm transition-colors"
                  style={{ color: 'rgba(255,255,255,0.75)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                >
                  <Mail size={14} aria-hidden="true" />
                  contato@gvedigital.com
                </a>
              </li>
              <li>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Balneário Camboriú, SC — Atendimento nacional
                </span>
              </li>
            </ul>

            {/* Redes sociais */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/gvedigital/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-md transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                }}
                aria-label="LinkedIn da GVE Digital (abre em nova aba)"
              >
                <Linkedin size={16} aria-hidden="true" />
              </a>
              <a
                href="https://www.instagram.com/gvedigitaltech/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-md transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                }}
                aria-label="Instagram da GVE Digital (abre em nova aba)"
              >
                <Instagram size={16} aria-hidden="true" />
              </a>
              <a
                href="https://www.youtube.com/@GVEDigital"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 rounded-md transition-colors"
                style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.75)' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.75)'
                }}
                aria-label="YouTube da GVE Digital (abre em nova aba)"
              >
                <Youtube size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t"
        style={{ borderColor: 'rgba(255,255,255,0.1)' }}
      >
        <div
          className="container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ maxWidth: '1280px' }}
        >
          <p className="text-xs text-center sm:text-left" style={{ color: 'rgba(255,255,255,0.45)' }}>
            © {new Date().getFullYear()} GV Estratégia Digital — CNPJ 55.785.571/0001-70. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacidade"
              className="text-xs transition-colors"
              style={{ color: 'rgba(255,255,255,0.45)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
            >
              Política de Privacidade
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Extender o tipo global Window para dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
