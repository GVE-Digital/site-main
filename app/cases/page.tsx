import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'
import { getAllCases } from '@/lib/mdx'
import { ArrowRight, ChevronRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cases | Resultados Reais em Marketing B2B',
  description:
    'Cases de sucesso da GVE Digital: empresas B2B que estruturaram sua geração de demanda com a metodologia GVED e alcançaram previsibilidade comercial mensurável.',
  alternates: { canonical: 'https://gvedigital.com/cases' },
  openGraph: {
    title: 'Cases de Marketing B2B — GVE Digital',
    description: 'Resultados reais: veja como empresas B2B melhoraram seu pipeline com a metodologia GVED.',
    url: 'https://gvedigital.com/cases',
    images: [{ url: 'https://gvedigital.com/og?type=case&title=Cases+de+Marketing+B2B&description=Resultados+reais%3A+empresas+B2B+com+pipeline+previs%C3%ADvel+com+metodologia+GVED', width: 1200, height: 630, alt: 'Cases GVE Digital' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Cases', item: 'https://gvedigital.com/cases' },
  ],
}

export default function CasesPage() {
  const cases = getAllCases()

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Cases de sucesso GVE Digital"
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Cases</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Resultados reais em Marketing B2B
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Empresas B2B que estruturaram sua geração de demanda com a metodologia GVED e chegaram à previsibilidade comercial.
            </p>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>

          {cases.length === 0 ? (
            /* ⚠️ TODO: remover placeholder e preencher com cases reais antes do deploy */
            <div>
              <div
                className="p-8 rounded-xl text-center mb-10"
                style={{ backgroundColor: '#fff3cd', border: '1px dashed #f59e0b' }}
              >
                <p className="text-sm font-semibold text-yellow-800 mb-1">
                  ⚠️ TODO: Cases pendentes de preenchimento
                </p>
                <p className="text-xs text-yellow-700">
                  Preencher ao menos 2 cases antes do deploy com: cliente (ou "Empresa do setor X"), setor, problema, solução executada, resultado em números e depoimento validado. Regra GVE: nunca inventar métricas.
                </p>
              </div>

              {/* Placeholders visuais */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                  <div
                    key={i}
                    className="card p-7"
                    style={{ opacity: 0.6 }}
                    aria-hidden="true"
                  >
                    <div
                      className="h-3 rounded mb-3"
                      style={{ backgroundColor: '#e0eaf3', width: '40%' }}
                    />
                    <div
                      className="h-5 rounded mb-2"
                      style={{ backgroundColor: '#e0eaf3', width: '85%' }}
                    />
                    <div
                      className="h-4 rounded mb-4"
                      style={{ backgroundColor: '#f0f5fa', width: '70%' }}
                    />
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[1, 2].map(j => (
                        <div
                          key={j}
                          className="p-3 rounded-lg text-center"
                          style={{ backgroundColor: '#f0f5fa' }}
                        >
                          <div
                            className="h-6 rounded mx-auto mb-1"
                            style={{ backgroundColor: '#d0e0ec', width: '50%' }}
                          />
                          <div
                            className="h-3 rounded mx-auto"
                            style={{ backgroundColor: '#e0eaf3', width: '70%' }}
                          />
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 italic text-center">
                      ⚠️ TODO: case real
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map(c => (
                <article key={c.slug} className="card p-7 group" aria-label={c.title}>
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                    >
                      {c.sector}
                    </span>
                    <span className="text-xs text-gray-400">{c.service}</span>
                  </div>

                  <h2
                    className="font-bold text-base mb-2 group-hover:text-gve-blue transition-colors"
                    style={{ color: '#2f4960' }}
                  >
                    {c.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">{c.description}</p>

                  {c.result && (
                    <div
                      className="p-3 rounded-lg mb-4 text-sm font-medium"
                      style={{ backgroundColor: '#f0f5fa', color: '#2f4960' }}
                    >
                      → {c.result}
                    </div>
                  )}

                  <Link
                    href={`/cases/${c.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold"
                    style={{ color: '#507c9f' }}
                  >
                    Ver case completo
                    <ChevronRight size={14} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          )}

          {/* CTA */}
          <div
            className="mt-16 p-8 rounded-2xl text-center"
            style={{ backgroundColor: '#2f4960' }}
          >
            <h2 className="font-bold text-white mb-3" style={{ fontSize: '1.5rem' }}>
              Quer um resultado como esses?
            </h2>
            <p className="mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Agende um diagnóstico gratuito e veja como a metodologia GVED se aplica ao seu cenário.
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
