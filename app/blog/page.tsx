import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaMarkup from '@/components/SchemaMarkup'
import { getAllPosts } from '@/lib/mdx'
import { ArrowRight, ChevronRight, Calendar, Tag } from 'lucide-react'

export const revalidate = 3600 // ISR

export const metadata: Metadata = {
  title: 'Blog | Marketing Comercial B2B — Estratégia, Mídia Paga e Geração de Demanda',
  description:
    'Conteúdo estratégico sobre marketing B2B, geração de leads qualificados, gestão de Meta Ads e Google Ads para empresas com ciclo de venda consultivo.',
  alternates: { canonical: 'https://gvedigital.com/blog' },
  openGraph: {
    title: 'Blog GVE Digital | Marketing Comercial B2B',
    description: 'Estratégia, mídia paga e geração de demanda para empresas B2B.',
    url: 'https://gvedigital.com/blog',
    images: [{ url: 'https://gvedigital.com/og?type=blog&title=Blog+GVE+Digital&description=Estrat%C3%A9gia%2C+m%C3%ADdia+paga+e+gera%C3%A7%C3%A3o+de+demanda+para+empresas+B2B', width: 1200, height: 630, alt: 'Blog GVE Digital' }],
  },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://gvedigital.com/blog' },
  ],
}

const CATEGORIAS = [
  { slug: 'all', label: 'Todos' },
  { slug: 'Estratégia', label: 'Estratégia' },
  { slug: 'Mídia Paga', label: 'Mídia Paga' },
  { slug: 'Inteligência Comercial', label: 'Inteligência Comercial' },
]

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Header */}
      <section
        className="pt-32 pb-16"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Blog GVE Digital"
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Blog</li>
            </ol>
          </nav>
          <div className="max-w-2xl">
            <h1
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Marketing Comercial B2B na prática
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
              Estratégia, mídia paga e inteligência comercial para empresas B2B que querem crescer com previsibilidade.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>

          {posts.length === 0 ? (
            <div
              className="p-8 rounded-xl text-center mb-10"
              style={{ backgroundColor: '#fff3cd', border: '1px dashed #f59e0b' }}
            >
              <p className="text-sm font-semibold text-yellow-800 mb-1">
                ⚠️ Posts em draft — não publicados
              </p>
              <p className="text-xs text-yellow-700">
                Os 5 posts abaixo estão com <code>draft: true</code> no frontmatter. Remova essa flag e adicione o conteúdo real para publicar.
              </p>
            </div>
          ) : null}

          {/* Se não houver posts publicados, mostrar os drafts para fins de desenvolvimento */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
              posts.map(post => (
                <article key={post.slug} className="card group overflow-hidden flex flex-col" aria-label={post.title}>
                  <div className="relative h-48 overflow-hidden" style={{ backgroundColor: '#e0eaf3' }}>
                    <Image
                      src={post.image || '/gve-logo.png'}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                      >
                        <Tag size={10} aria-hidden="true" />
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar size={10} aria-hidden="true" />
                        {formatDate(post.date)}
                      </span>
                    </div>

                    <h2
                      className="font-bold text-base mb-2 leading-snug group-hover:text-gve-blue transition-colors flex-1"
                      style={{ color: '#2f4960' }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-3">
                      {post.description}
                    </p>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-semibold mt-auto"
                      style={{ color: '#507c9f' }}
                      aria-label={`Ler: ${post.title}`}
                    >
                      Ler artigo
                      <ChevronRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              /* Placeholders visuais para posts em draft */
              [
                { slug: 'como-estruturar-geracao-de-demanda-b2b-meta-google-ads', title: 'Como estruturar geração de demanda B2B com Meta Ads e Google Ads', category: 'Mídia Paga' },
                { slug: 'o-que-e-mql-lead-qualificado-b2b', title: 'O que é MQL e por que o seu comercial precisa de leads qualificados', category: 'Inteligência Comercial' },
                { slug: 'por-que-agencias-de-trafego-falham-no-b2b', title: 'Por que a maioria das agências de tráfego falha no B2B', category: 'Estratégia' },
                { slug: 'icp-como-definir-cliente-ideal-antes-de-investir-em-midia', title: 'ICP: como definir o perfil do cliente ideal antes de investir em mídia', category: 'Inteligência Comercial' },
                { slug: 'funil-de-aquisicao-b2b-da-campanha-ao-crm', title: 'Funil de aquisição B2B: da campanha ao CRM em 5 etapas', category: 'Estratégia' },
              ].map(post => (
                <article
                  key={post.slug}
                  className="card overflow-hidden flex flex-col"
                  style={{ opacity: 0.7 }}
                >
                  <div
                    className="h-48 flex items-center justify-center"
                    style={{ backgroundColor: '#e0eaf3' }}
                    aria-hidden="true"
                  >
                    <span className="text-xs text-gray-400">⚠️ TODO: imagem</span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 self-start"
                      style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                    >
                      <Tag size={10} aria-hidden="true" />
                      {post.category}
                    </span>
                    <h2
                      className="font-bold text-base mb-2 leading-snug flex-1"
                      style={{ color: '#2f4960' }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-xs text-gray-400 italic mt-auto">
                      ⚠️ Draft — adicionar conteúdo e remover draft:true para publicar
                    </p>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* CTA inline */}
          <div
            className="mt-14 p-8 rounded-2xl text-center"
            style={{ backgroundColor: '#2f4960' }}
          >
            <h2 className="font-bold text-white mb-3" style={{ fontSize: '1.375rem' }}>
              Precisa de mais do que conteúdo?
            </h2>
            <p className="mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>
              O diagnóstico gratuito da GVE mapeia seu cenário atual e apresenta um plano estratégico personalizado.
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
