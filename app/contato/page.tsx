import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'
import ContactForm from '@/components/ContactForm'
import { CheckCircle2, Clock, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contato | Agendar Diagnóstico Gratuito',
  description:
    'Agende um diagnóstico gratuito com a GVE Digital. Em até 1 dia útil entramos em contato para entender seu cenário de geração de demanda B2B e propor um plano estratégico.',
  alternates: { canonical: 'https://gvedigital.com/contato' },
  openGraph: {
    title: 'Contato | Agendar Diagnóstico Gratuito — GVE Digital',
    description: 'Fale com especialistas em marketing comercial B2B. Diagnóstico sem compromisso.',
    url: 'https://gvedigital.com/contato',
    images: [{ url: 'https://gvedigital.com/og/contato.png', width: 1200, height: 630 }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Contato', item: 'https://gvedigital.com/contato' },
  ],
}

const CREDENCIAIS = [
  { text: '40+ empresas B2B atendidas desde 2023' },
  { text: 'Metodologia GVED com 5 fases e entregáveis validados' },
  { text: 'Parceiros oficiais Kommo CRM e Pipedrive' },
  { text: 'Rastreamento completo: GA4, GTM, Meta CAPI, Enhanced Conversions' },
  { text: 'Atendimento exclusivo para B2B — foco em resultado comercial mensurável' },
]

const PARA_QUEM = [
  {
    titulo: 'CEO / Sócio-proprietário',
    desc: 'Quer estruturar marketing que alimente o comercial com leads qualificados.',
  },
  {
    titulo: 'Diretor Comercial',
    desc: 'Precisa de pipeline previsível e métricas confiáveis por canal de aquisição.',
  },
  {
    titulo: 'Empresa B2B 15–200 funcionários',
    desc: 'Indústria, SaaS, serviços ou saúde corporativa, com equipe comercial ativa.',
  },
]

export default function ContatoPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Header */}
      <section
        className="pt-32 pb-12"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Contato GVE Digital"
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Contato</li>
            </ol>
          </nav>
          <div className="max-w-xl">
            <h1
              className="font-bold text-white mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.01em' }}
            >
              Agende um diagnóstico gratuito
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.75)' }}>
              Sem compromisso. Em até 1 dia útil o Gabriel entra em contato para entender seu cenário e apresentar como o método GVED se aplica ao seu negócio.
            </p>
          </div>
        </div>
      </section>

      {/* Main */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* Formulário */}
            <div className="lg:col-span-3">
              <div className="card p-8">
                <h2
                  className="font-bold mb-2"
                  style={{ color: '#2f4960', fontSize: '1.375rem' }}
                >
                  Preencha o formulário
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Quanto mais detalhes você compartilhar, mais objetivo e útil será o diagnóstico.
                </p>
                <ContactForm formType="contato" />
              </div>
            </div>

            {/* Credibilidade lateral */}
            <div className="lg:col-span-2 space-y-6">

              {/* Expectativa de retorno */}
              <div className="card p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                    aria-hidden="true"
                  >
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-0.5" style={{ color: '#2f4960' }}>
                      Tempo de resposta
                    </h3>
                    <p className="text-sm text-gray-600">
                      Em até <strong>1 dia útil</strong> você recebe contato direto para agendar a conversa.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                    aria-hidden="true"
                  >
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm mb-0.5" style={{ color: '#2f4960' }}>
                      Prefere e-mail?
                    </h3>
                    <a
                      href="mailto:contato@gvedigital.com"
                      className="text-sm"
                      style={{ color: '#507c9f' }}
                    >
                      contato@gvedigital.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Para quem é */}
              <div className="card p-6">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-4">
                  Para quem é este diagnóstico
                </h3>
                <ul className="space-y-3" role="list">
                  {PARA_QUEM.map(({ titulo, desc }) => (
                    <li key={titulo} className="flex items-start gap-3">
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: '#507c9f' }}
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-semibold text-sm" style={{ color: '#2f4960' }}>{titulo}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Credenciais */}
              <div className="card p-6">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-4">
                  Por que a GVE
                </h3>
                <ul className="space-y-2.5" role="list">
                  {CREDENCIAIS.map(({ text }) => (
                    <li key={text} className="flex items-start gap-2">
                      <CheckCircle2
                        size={14}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: '#507c9f' }}
                        aria-hidden="true"
                      />
                      <span className="text-xs text-gray-600">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Parceiros */}
              <div
                className="p-4 rounded-xl text-center"
                style={{ backgroundColor: '#f0f5fa', border: '1px solid #d0e0ec' }}
              >
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                  Parceiros CRM
                </p>
                <div className="flex justify-center gap-3">
                  <span
                    className="px-3 py-1.5 rounded text-xs font-semibold"
                    style={{ backgroundColor: '#fff', color: '#2f4960', border: '1px solid #d0e0ec' }}
                  >
                    {/* ⚠️ TODO: logo Kommo */}
                    Kommo CRM
                  </span>
                  <span
                    className="px-3 py-1.5 rounded text-xs font-semibold"
                    style={{ backgroundColor: '#fff', color: '#2f4960', border: '1px solid #d0e0ec' }}
                  >
                    {/* ⚠️ TODO: logo Pipedrive */}
                    Pipedrive
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
