import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'
import { ArrowRight, Layers, Target, TrendingUp, BarChart3, Award, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Serviços | Marketing Comercial B2B',
  description:
    'Conheça os serviços da GVE Digital: GVED Marketing B2B (carro-chefe), Gestão de Meta Ads e Google Ads B2B, Site Comercial e Landing Page, e Inteligência Comercial. Foco exclusivo em B2B.',
  alternates: { canonical: 'https://gvedigital.com/servicos' },
  openGraph: {
    title: 'Serviços de Marketing Comercial B2B — GVE Digital',
    description: 'Do diagnóstico à escala — cada serviço é parte de um sistema integrado de geração de demanda B2B.',
    url: 'https://gvedigital.com/servicos',
    images: [{ url: 'https://gvedigital.com/og?type=servico&title=Servi%C3%A7os+de+Marketing+Comercial+B2B&description=Do+diagn%C3%B3stico+%C3%A0+escala+%E2%80%94+sistema+integrado+de+gera%C3%A7%C3%A3o+de+demanda+B2B', width: 1200, height: 630, alt: 'Serviços GVE Digital' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Serviços', item: 'https://gvedigital.com/servicos' },
  ],
}

const SERVICOS = [
  {
    slug: 'gved-marketing-b2b',
    title: 'GVED Marketing Comercial B2B',
    type: 'Carro-chefe',
    description:
      'Estrutura comercial completa: ICP definido, copy estratégico, funil de aquisição, mídia paga (Meta + Google) e CRM integrado. Tudo operando em conjunto com metodologia proprietária de 5 fases.',
    resultado: 'Primeiros leads MQL ainda na F1. Escala e previsibilidade entre os meses 4–6.',
    icon: <Layers size={28} />,
    destaques: ['Meta Ads B2B', 'Google Ads B2B', 'Inteligência Comercial', 'Integração CRM', 'Relatórios de performance'],
  },
  {
    slug: 'gestao-meta-ads-b2b',
    title: 'Gestão de Meta Ads B2B',
    type: 'Incluso no GVED',
    description:
      'Campanhas no Meta (Facebook e Instagram) otimizadas para geração de leads qualificados em mercados B2B. Configuração de Meta Pixel, CAPI e audience de retargeting por segmento.',
    resultado: 'Leads MQL com custo por lead otimizado a partir de R$ 3.000/mês de verba.',
    icon: <Target size={28} />,
    destaques: ['Meta Pixel + CAPI', 'Públicos lookalike B2B', 'Retargeting por segmento', 'Criativos para o ICP'],
  },
  {
    slug: 'gestao-google-ads-b2b',
    title: 'Gestão de Google Ads B2B',
    type: 'Incluso no GVED',
    description:
      'Captura de demanda ativa com Google Search e Display. Configuração de Enhanced Conversions e rastreamento GA4 + GTM para máxima precisão de atribuição.',
    resultado: 'Captura de decisores B2B no momento de maior intenção de compra.',
    icon: <TrendingUp size={28} />,
    destaques: ['Google Search B2B', 'Enhanced Conversions', 'GA4 + GTM', 'Smart Bidding com dados de qualidade'],
  },
  {
    slug: 'site-landing-page-b2b',
    title: 'Site Comercial e Landing Page B2B',
    type: 'Produto avulso',
    description:
      'Sites institucionais e landing pages otimizados para conversão e SEO — com rastreamento completo e integração com funil de vendas e CRM. Para empresas que precisam de um asset digital que converte.',
    resultado: 'Site como asset comercial ativo — não só "presença digital".',
    icon: <BarChart3 size={28} />,
    destaques: ['SEO técnico e de conteúdo', 'Rastreamento completo', 'CRO e A/B testing', 'Integração com CRM'],
  },
  {
    slug: 'inteligencia-comercial',
    title: 'Inteligência Comercial B2B',
    type: 'Incluso no GVED',
    description:
      'Definição de ICP, segmentação de mercado-alvo, copy estratégico para cada etapa do funil e critérios de MQL que o comercial realmente usa. Base para escalar com qualidade.',
    resultado: 'ICP validado, copy aprovado pelo comercial e filtros de qualificação ativos antes de escalar.',
    icon: <Award size={28} />,
    destaques: ['Definição de ICP B2B', 'Copy estratégico por fase', 'Critérios de MQL', 'Jornada de compra B2B'],
  },
]

export default function ServicosPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Hub de Serviços GVE Digital"
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Serviços</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Serviços de Marketing Comercial B2B
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Do diagnóstico à escala — cada serviço é parte de um sistema integrado. O GVED Marketing B2B reúne tudo em um único engajamento estruturado.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Serviços */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="space-y-6">
            {SERVICOS.map((s, i) => (
              <article
                key={s.slug}
                className="card p-8"
                aria-label={s.title}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Info principal */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                        aria-hidden="true"
                      >
                        {s.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="font-bold text-lg" style={{ color: '#2f4960' }}>
                            {s.title}
                          </h2>
                          <span
                            className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={
                              s.type === 'Carro-chefe'
                                ? { backgroundColor: '#2f4960', color: '#fff' }
                                : s.type === 'Produto avulso'
                                  ? { backgroundColor: '#e0eaf3', color: '#2f4960' }
                                  : { backgroundColor: '#f3f4f6', color: '#6b7280' }
                            }
                          >
                            {s.type}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{s.description}</p>
                      </div>
                    </div>

                    {/* Resultado esperado */}
                    <div
                      className="p-4 rounded-lg flex items-start gap-2"
                      style={{ backgroundColor: '#f0f5fa', border: '1px solid #d0e0ec' }}
                    >
                      <span className="text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true">→</span>
                      <div>
                        <span className="text-xs font-semibold text-gray-400 block mb-0.5">
                          Resultado esperado
                        </span>
                        <p className="text-sm text-gray-700">{s.resultado}</p>
                      </div>
                    </div>
                  </div>

                  {/* Destaques + CTA */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                        Inclui
                      </p>
                      <ul className="space-y-2" role="list">
                        {s.destaques.map(d => (
                          <li key={d} className="flex items-center gap-2 text-sm text-gray-600">
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ backgroundColor: '#507c9f' }}
                              aria-hidden="true"
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={`/servicos/${s.slug}`}
                      className="btn btn-primary w-full justify-center"
                    >
                      Ver detalhes
                      <ChevronRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div
            className="mt-12 p-8 rounded-2xl text-center"
            style={{ backgroundColor: '#2f4960' }}
          >
            <h2 className="font-bold text-white mb-3" style={{ fontSize: '1.5rem' }}>
              Não sabe qual serviço faz mais sentido?
            </h2>
            <p className="mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>
              No diagnóstico gratuito, mapeamos o seu cenário e recomendamos o ponto de entrada ideal no método GVED.
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
        </div>
      </section>
    </>
  )
}
