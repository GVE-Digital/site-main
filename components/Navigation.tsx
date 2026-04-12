'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/',         label: 'Início' },
  { href: '/sobre',    label: 'Sobre' },
  { href: '/servicos', label: 'Serviços' },
  { href: '/cases',    label: 'Cases' },
  { href: '/blog',     label: 'Blog' },
]

export default function Navigation() {
  const pathname  = usePathname()
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Fecha menu ao mudar de rota
  useEffect(() => { setOpen(false) }, [pathname])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
      }`}
      style={{ borderBottom: scrolled ? '1px solid #e5e7eb' : 'none' }}
    >
      <nav
        className="container mx-auto flex items-center justify-between py-4"
        style={{ maxWidth: '1280px', paddingInline: '1.5rem' }}
        aria-label="Navegação principal"
      >
        {/* Logo */}
        <Link href="/" aria-label="GVE Digital — ir para o início">
          <Image
            src="/gve-logo.png"
            alt="GVE Digital"
            width={160}
            height={44}
            priority
            className="object-contain"
            style={{ height: '36px', width: 'auto' }}
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                  isActive(href)
                    ? 'text-white'
                    : 'text-gray-700 hover:text-navy hover:bg-gray-50'
                }`}
                style={
                  isActive(href)
                    ? { backgroundColor: '#2f4960', color: '#fff' }
                    : {}
                }
                aria-current={isActive(href) ? 'page' : undefined}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/contato"
            className="btn btn-primary"
            style={{ fontSize: '0.9375rem', padding: '0.625rem 1.375rem' }}
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.dataLayer = window.dataLayer || []
                window.dataLayer.push({
                  event: 'cta_click',
                  cta_text: 'Agendar diagnóstico',
                  cta_destination: '/contato',
                  page_section: 'navbar',
                  page_url: window.location.href,
                })
              }
            }}
          >
            Agendar diagnóstico
          </Link>
        </div>

        {/* Botão hambúrguer — mobile */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t"
          style={{ borderColor: '#e5e7eb' }}
          role="dialog"
          aria-label="Menu de navegação"
        >
          <ul className="flex flex-col py-3" role="list">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  style={isActive(href) ? { backgroundColor: '#2f4960', color: '#fff' } : {}}
                  aria-current={isActive(href) ? 'page' : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="px-6 pt-3 pb-4">
              <Link
                href="/contato"
                className="btn btn-primary w-full justify-center"
                style={{ fontSize: '0.9375rem' }}
              >
                Agendar diagnóstico
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

// Extender o tipo global Window para dataLayer
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}
