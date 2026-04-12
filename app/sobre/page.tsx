import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaMarkup from '@/components/SchemaMarkup'
import { Linkedin, ArrowRight, CheckCircle2, Users, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sobre a GVE Digital | Marketing Comercial B2B',
  description:
    'Conheça quem está por trás da GVE Digital. Especialistas com base sólida em tecnologia e performance B2B — sem estrutura de agência tradicional, com foco total em resultado comercial mensurável.',
  alternates: { canonical: 'https://gvedigital.com/sobre' },
  openGraph: {
    title: 'Sobre a GVE Digital',
    description: 'Especialistas em performance B2B — sem estrutura de agência tradicional, com foco total em resultado comercial mensurável.',
    url: 'https://gvedigital.com/sobre',
    images: [{ url: 'https://gvedigital.com/og/sobre.png', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Sobre', item: 'https://gvedigital.com/sobre' },
  ],
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gabriel Vieira',
  jobTitle: 'Fundador & Especialista em Marketing B2B | Performance e Geração de Demanda',
  description:
    'Especialista em geração de demanda e performance para B2B. Combina mídia paga (Google Ads e Meta Ads), CRO e construção de ativos digitais com rastreamento analítico preciso (GA4/GTM/pixels), conectando marketing a processo comercial e KPIs reais.',
  worksFor: {
    '@type': 'Organization',
    name: 'GVE Digital',
    url: 'https://gvedigital.com',
  },
  sameAs: ['https://www.linkedin.com/in/gabriel-vieira-silva/'],
  image: 'https://gvedigital.com/perfil2.png', // ⚠️ TODO: confirmar URL do arquivo perfil2.png
}

const FASES_RESUMIDAS = [
  { id: 'F0', title: 'Onboarding', desc: 'Alinhamento de metas e KPIs' },
  { id: 'F1', title: 'Diagnóstico & Ativação', desc: 'Diagnóstico + primeira campanha' },
  { id: 'F2', title: 'Inteligência Comercial', desc: 'ICP, copy e critérios de MQL' },
  { id: 'F3', title: 'Geração de Demanda', desc: 'Funil completo e primeiros MQLs' },
  { id: 'F4', title: 'Crescimento & Escala', desc: 'Otimização contínua e previsibilidade' },
]

export default function SobrePage() {
  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, personSchema]} />

      {/* Header da página */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Sobre a GVE Digital"
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Sobre</li>
            </ol>
          </nav>

          <div className="max-w-2xl">
            <h1
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Quem está por trás da GVE Digital
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '52ch' }}>
              A GVE é liderada por especialistas com base sólida em tecnologia e performance B2B — sem estrutura de agência tradicional, com foco total em resultado comercial mensurável.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Sobre o Gabriel ─── */}
      <section className="section bg-white" aria-label="Sobre Gabriel Vieira">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* Foto */}
            <div className="flex justify-center lg:justify-start">
              <div
                className="relative rounded-2xl overflow-hidden shadow-xl"
                style={{ width: '340px', height: '400px', maxWidth: '100%' }}
              >
                <Image
                  src="/perfil2.png"
                  alt="Gabriel Vieira — Fundador da GVE Digital"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 768px) 100vw, 340px"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full mb-4"
                style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
              >
                Fundador
              </span>
              <h2 className="font-bold mb-1" style={{ color: '#2f4960', fontSize: '1.75rem' }}>
                Gabriel Vieira
              </h2>
              <p className="text-sm font-medium mb-5" style={{ color: '#507c9f' }}>
                Especialista em Marketing B2B | Performance e Geração de Demanda
              </p>

              <div className="prose text-gray-600 mb-6 text-base leading-relaxed space-y-3">
                <p>
                  Especialista em geração de demanda e performance para B2B. Combina mídia paga (Google Ads e Meta Ads), CRO e construção de ativos digitais com rastreamento analítico preciso — GA4, GTM e pixels de conversão — conectando marketing a processo comercial e KPIs reais.
                </p>
                <p>
                  Com base técnica em desenvolvimento web, aplica esse conhecimento diretamente na criação de experiências digitais que convertem: landing pages otimizadas, rastreamento server-side (CAPI) e arquitetura de dados que alimenta os algoritmos de mídia com sinais de qualidade.
                </p>
                <p>
                  A metodologia GVED nasceu da observação de um padrão recorrente: empresas B2B que investem em tráfego sem estrutura comercial adequada desperdiçam budget e nunca chegam à previsibilidade. A GVE resolve isso fase a fase, com entregáveis validados.
                </p>
              </div>

              <a
                href="https://www.linkedin.com/in/gabriel-vieira-silva/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 btn btn-secondary"
                style={{ fontSize: '0.9375rem' }}
              >
                <Linkedin size={16} aria-hidden="true" />
                Conectar no LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Números ─── */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }} aria-label="Números da GVE Digital">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { num: '40+', label: 'empresas B2B atendidas', icon: <Users size={20} /> },
              { num: '2023', label: 'ano de fundação', icon: <Calendar size={20} /> },
              { num: '5', label: 'fases de metodologia', icon: <CheckCircle2 size={20} /> },
              { num: 'BR', label: 'atendimento nacional', icon: <ArrowRight size={20} /> },
            ].map(({ num, label, icon }) => (
              <div
                key={label}
                className="card p-6 text-center"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                  style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <p
                  className="text-3xl font-bold mb-1"
                  style={{ color: '#2f4960' }}
                  aria-label={`${num} — ${label}`}
                >
                  {num}
                </p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Metodologia Resumida ─── */}
      <section className="section bg-white" aria-label="Metodologia GVED resumida">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="text-center mb-10">
            <span className="divider-blue mx-auto" />
            <h2 className="section-title">A metodologia que guia cada projeto</h2>
            <p className="section-subtitle mx-auto mt-4">
              5 fases com entregáveis concretos. Nenhuma fase avança sem validação do cliente.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            {FASES_RESUMIDAS.map((fase, i) => (
              <div
                key={fase.id}
                className="flex-1 p-5 rounded-xl text-center"
                style={{ backgroundColor: '#f0f5fa', border: '1px solid #d0e0ec' }}
              >
                <span
                  className="inline-block text-xs font-bold px-2.5 py-1 rounded-full mb-3"
                  style={{ backgroundColor: '#2f4960', color: '#fff' }}
                >
                  {fase.id}
                </span>
                <h3 className="font-bold text-sm mb-1" style={{ color: '#2f4960' }}>
                  {fase.title}
                </h3>
                <p className="text-xs text-gray-500">{fase.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/servicos/gved-marketing-b2b" className="btn btn-primary">
              Ver metodologia completa
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Parceiros ─── */}
      <section className="section-sm" style={{ backgroundColor: '#f2f2f2' }} aria-label="Parceiros">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-wide mb-6">
            Parceiros oficiais de CRM
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div
              className="flex items-center gap-2 px-6 py-3 rounded-lg border font-semibold text-sm"
              style={{ backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#2f4960' }}
            >
              {/* ⚠️ TODO: logo Kommo CRM */}
              Kommo CRM
            </div>
            <div
              className="flex items-center gap-2 px-6 py-3 rounded-lg border font-semibold text-sm"
              style={{ backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#2f4960' }}
            >
              {/* ⚠️ TODO: logo Pipedrive */}
              Pipedrive
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section
        className="section"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Call to action"
      >
        <div className="container mx-auto px-6 text-center" style={{ maxWidth: '1280px' }}>
          <h2 className="font-bold text-white mb-4" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>
            Sua empresa está pronta para previsibilidade comercial?
          </h2>
          <p className="mb-6" style={{ color: 'rgba(255,255,255,0.75)' }}>
            Agende um diagnóstico gratuito e veja como o método GVED pode ser aplicado no seu cenário.
          </p>
          <Link
            href="/contato"
            className="btn btn-lg"
            style={{ backgroundColor: '#fff', color: '#2f4960', borderColor: '#fff', fontWeight: 700 }}
          >
            Agendar diagnóstico gratuito
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
