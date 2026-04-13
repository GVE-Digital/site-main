import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import SchemaMarkup from '@/components/SchemaMarkup'
import ContactForm from '@/components/ContactForm'
import { getCaseBySlug, getAllCaseSlugs } from '@/lib/mdx'
import { ArrowRight, ChevronLeft } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllCaseSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCaseBySlug(params.slug)
  if (!c) return { title: 'Case não encontrado | GVE Digital' }

  return {
    title: `${c.title} | Case GVE Digital`,
    description: c.description,
    alternates: { canonical: `https://gvedigital.com/cases/${params.slug}` },
    openGraph: {
      title: `${c.title} | Case GVE Digital`,
      description: c.description,
      url: `https://gvedigital.com/cases/${params.slug}`,
      type: 'article',
      images: [{ url: `https://gvedigital.com/og?type=case&title=${encodeURIComponent(c.title)}&description=${encodeURIComponent(c.description)}`, width: 1200, height: 630, alt: c.title }],
    },
  }
}

export default function CasePage({ params }: Props) {
  const c = getCaseBySlug(params.slug)
  if (!c) notFound()

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
      { '@type': 'ListItem', position: 2, name: 'Cases', item: 'https://gvedigital.com/cases' },
      { '@type': 'ListItem', position: 3, name: c.title, item: `https://gvedigital.com/cases/${params.slug}` },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: c.description,
    author: {
      '@type': 'Organization',
      name: 'GVE Digital',
      url: 'https://gvedigital.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GVE Digital',
      logo: { '@type': 'ImageObject', url: 'https://gvedigital.com/logo.svg' },
    },
    datePublished: c.date,
    url: `https://gvedigital.com/cases/${params.slug}`,
  }

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, articleSchema]} />

      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: '#2f4960' }}
        aria-label={`Case: ${c.title}`}
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm flex-wrap" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/cases" style={{ color: 'rgba(255,255,255,0.6)' }}>Cases</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>{c.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              {c.sector && (
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
                >
                  {c.sector}
                </span>
              )}
              {c.service && (
                <span
                  className="text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.6)' }}
                >
                  {c.service}
                </span>
              )}
            </div>
            <h1
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.01em' }}
            >
              {c.title}
            </h1>
            {c.result && (
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
              >
                <span className="text-green-400" aria-hidden="true">→</span>
                <span className="text-sm font-medium">{c.result}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Conteúdo principal */}
            <div className="lg:col-span-2">
              {c.content ? (
                <article className="card p-8 prose mb-8">
                  <MDXRemote source={c.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
                </article>
              ) : (
                <div
                  className="card p-8 mb-8 text-center"
                  style={{ border: '1px dashed #d0e0ec' }}
                >
                  <p className="text-sm text-gray-400 italic">
                    Conteúdo do case ainda não disponível.
                  </p>
                </div>
              )}

              {/* Voltar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <Link
                  href="/cases"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: '#507c9f' }}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Todos os cases
                </Link>
                <Link
                  href="/contato"
                  className="btn btn-primary"
                >
                  Quero um resultado assim
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>

            {/* Sidebar — formulário */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-28">
                <p className="text-sm font-bold mb-1" style={{ color: '#2f4960' }}>
                  Quer um resultado como esse?
                </p>
                <p className="text-xs text-gray-500 mb-5">
                  Agende um diagnóstico gratuito e veja como a metodologia GVED se aplica ao seu cenário.
                </p>
                <ContactForm formType={`case-${params.slug}`} />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
