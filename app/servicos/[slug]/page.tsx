import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'
import ContactForm from '@/components/ContactForm'
import { getServiceBySlug, getAllServiceSlugs, getAllCases } from '@/lib/mdx'
import { ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug(params.slug)
  if (!service) return { title: 'Serviço não encontrado | GVE Digital' }

  return {
    title: `${service.title} | GVE Digital`,
    description: service.description,
    alternates: { canonical: `https://gvedigital.com/servicos/${params.slug}` },
    openGraph: {
      title: `${service.title} | GVE Digital`,
      description: service.description,
      url: `https://gvedigital.com/servicos/${params.slug}`,
      images: [{ url: `https://gvedigital.com/og?type=servico&title=${encodeURIComponent(service.title)}&description=${encodeURIComponent(service.description)}`, width: 1200, height: 630, alt: service.title }],
    },
  }
}

export default function ServicoPage({ params }: Props) {
  const service = getServiceBySlug(params.slug)
  if (!service) notFound()

  const cases = getAllCases().slice(0, 3)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
      { '@type': 'ListItem', position: 2, name: 'Serviços', item: 'https://gvedigital.com/servicos' },
      { '@type': 'ListItem', position: 3, name: service.title, item: `https://gvedigital.com/servicos/${params.slug}` },
    ],
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    url: `https://gvedigital.com/servicos/${params.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'GVE Digital',
      url: 'https://gvedigital.com',
    },
    areaServed: { '@type': 'Country', name: 'Brazil', identifier: 'BR' },
    serviceType: 'Marketing Digital B2B',
  }

  const faqSchema = service.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faq.map(item => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, serviceSchema, ...(faqSchema ? [faqSchema] : [])]} />

      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: '#2f4960' }}
        aria-label={`Serviço: ${service.title}`}
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm flex-wrap" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/servicos" style={{ color: 'rgba(255,255,255,0.6)' }}>Serviços</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>{service.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            {service.type && (
              <span
                className="inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full mb-4"
                style={{
                  backgroundColor: service.type === 'carro-chefe'
                    ? 'rgba(255,255,255,0.15)'
                    : 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.9)',
                }}
              >
                {service.type === 'carro-chefe' ? 'Serviço carro-chefe' :
                 service.type === 'avulso' ? 'Produto avulso' : 'Incluso no GVED'}
              </span>
            )}
            <h1
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              {service.title}
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '56ch' }}>
              {service.shortDescription || service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Conteúdo principal */}
            <div className="lg:col-span-2 space-y-10">

              {/* Descrição detalhada (MDX content) */}
              <div className="card p-8">
                <h2 className="font-bold text-xl mb-4" style={{ color: '#2f4960' }}>
                  O que é e para quem é
                </h2>
                <div className="prose text-gray-600">
                  {/* Renderiza o conteúdo MDX como texto — para rich content usar MDXRemote */}
                  <p>{service.description}</p>
                  {service.content && (
                    <div className="mt-4 text-sm leading-relaxed whitespace-pre-line">
                      {/* ⚠️ Para conteúdo rico, instalar e usar next-mdx-remote/rsc */}
                      {service.content}
                    </div>
                  )}
                </div>
              </div>

              {/* Features / O que inclui */}
              {service.features?.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-bold text-xl mb-5" style={{ color: '#2f4960' }}>
                    O que está incluído
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2
                          size={16}
                          className="flex-shrink-0 mt-0.5"
                          style={{ color: '#507c9f' }}
                          aria-hidden="true"
                        />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* FAQ */}
              {service.faq?.length > 0 && (
                <div className="card p-8">
                  <h2 className="font-bold text-xl mb-6" style={{ color: '#2f4960' }}>
                    Perguntas frequentes
                  </h2>
                  <dl className="space-y-6">
                    {service.faq.map((item, i) => (
                      <div key={i}>
                        <dt className="font-bold text-sm mb-2" style={{ color: '#2f4960' }}>
                          {item.question}
                        </dt>
                        <dd className="text-sm text-gray-600 leading-relaxed">
                          {item.answer}
                        </dd>
                        {i < service.faq.length - 1 && (
                          <hr className="mt-6" style={{ borderColor: '#e5e7eb' }} />
                        )}
                      </div>
                    ))}
                  </dl>
                </div>
              )}

              {/* Cases relacionados */}
              <div className="card p-8">
                <h2 className="font-bold text-xl mb-6" style={{ color: '#2f4960' }}>
                  Cases relacionados
                </h2>
                <div className="space-y-4">
                  {cases.map(c => (
                    <Link
                      key={c.slug}
                      href={`/cases/${c.slug}`}
                      className="block p-4 rounded-xl group"
                      style={{ backgroundColor: '#f8fafc', border: '1px solid #e5e7eb', textDecoration: 'none' }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="text-xs font-bold px-2 py-0.5 rounded-full"
                          style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                        >
                          {c.sector}
                        </span>
                      </div>
                      <p className="font-bold text-sm mb-1 group-hover:text-gve-blue transition-colors" style={{ color: '#2f4960' }}>
                        {c.title}
                      </p>
                      {c.result && (
                        <p className="text-xs text-gray-500">→ {c.result}</p>
                      )}
                    </Link>
                  ))}
                </div>
                <div className="mt-5 text-center">
                  <Link href="/cases" className="text-sm font-semibold" style={{ color: '#507c9f' }}>
                    Ver todos os cases
                    <ChevronRight size={14} className="inline ml-1" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar — formulário */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="font-bold text-base mb-1" style={{ color: '#2f4960' }}>
                  Interessado neste serviço?
                </h3>
                <p className="text-sm text-gray-500 mb-5">
                  Preencha abaixo para agendar um diagnóstico gratuito.
                </p>
                <ContactForm formType={`servico-${params.slug}`} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
