import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'
import ContactForm from '@/components/ContactForm'
import { getPostBySlug, getAllPostSlugs, getRelatedPosts } from '@/lib/mdx'
import { ArrowRight, Calendar, Tag, ChevronLeft, ChevronRight } from 'lucide-react'

export const revalidate = 3600 // ISR

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return getAllPostSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Post não encontrado | GVE Digital' }

  return {
    title: `${post.title} | Blog GVE Digital`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `https://gvedigital.com/blog/${params.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://gvedigital.com/blog/${params.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: ['Gabriel Vieira'],
      images: [
        {
          url: post.image || `https://gvedigital.com/og/blog-${params.slug}.png`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(params.slug, post.category, 3)

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://gvedigital.com/blog' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://gvedigital.com/blog/${params.slug}` },
    ],
  }

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    url: `https://gvedigital.com/blog/${params.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.keywords?.join(', '),
    image: post.image || `https://gvedigital.com/og/blog-${params.slug}.png`,
    author: {
      '@type': 'Person',
      name: 'Gabriel Vieira',
      url: 'https://www.linkedin.com/in/gabriel-vieira-silva/',
      jobTitle: 'Fundador & Especialista em Marketing B2B',
    },
    publisher: {
      '@type': 'Organization',
      name: 'GVE Digital',
      url: 'https://gvedigital.com',
      logo: { '@type': 'ImageObject', url: 'https://gvedigital.com/logo.svg' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://gvedigital.com/blog/${params.slug}` },
    inLanguage: 'pt-BR',
  }

  return (
    <>
      <SchemaMarkup schema={[breadcrumbSchema, blogPostingSchema]} />

      {/* Header */}
      <section
        className="pt-32 pb-12"
        style={{ backgroundColor: '#2f4960' }}
        aria-label={`Artigo: ${post.title}`}
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm flex-wrap" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/blog" style={{ color: 'rgba(255,255,255,0.6)' }}>Blog</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }} className="truncate max-w-xs">{post.title}</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
              >
                <Tag size={10} aria-hidden="true" />
                {post.category}
              </span>
              <span
                className="text-xs flex items-center gap-1.5"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <Calendar size={12} aria-hidden="true" />
                {formatDate(post.date)}
              </span>
            </div>

            <h1
              className="font-bold text-white mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
            >
              {post.title}
            </h1>
            <p className="text-lg" style={{ color: 'rgba(255,255,255,0.75)' }}>
              {post.description}
            </p>
          </div>
        </div>
      </section>

      {/* Post body */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Conteúdo principal */}
            <div className="lg:col-span-2">
              {/* ⚠️ TODO: conteúdo do post (draft) — adicionar texto real */}
              <div className="card p-8 mb-8">
                {post.content ? (
                  <div className="prose text-gray-700">
                    <div className="whitespace-pre-line leading-relaxed text-base">
                      {post.content}
                    </div>
                  </div>
                ) : (
                  <div
                    className="p-6 rounded-lg text-center"
                    style={{ backgroundColor: '#fff3cd', border: '1px dashed #f59e0b' }}
                  >
                    <p className="text-sm font-semibold text-yellow-800 mb-1">
                      ⚠️ Conteúdo pendente
                    </p>
                    <p className="text-xs text-yellow-700">
                      Este post está em draft. Adicione o conteúdo completo no arquivo MDX em <code>content/blog/{params.slug}.mdx</code> e remova <code>draft: true</code> para publicar.
                    </p>
                  </div>
                )}
              </div>

              {/* CTA inline */}
              <div
                className="rounded-2xl p-7 mb-8"
                style={{ backgroundColor: '#2f4960' }}
              >
                <h3 className="font-bold text-white text-lg mb-2">
                  Quer aplicar isso no seu negócio?
                </h3>
                <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  Agende um diagnóstico gratuito e veja como a metodologia GVED pode estruturar seu canal de geração de demanda B2B.
                </p>
                <Link
                  href="/contato"
                  className="btn"
                  style={{ backgroundColor: '#fff', color: '#2f4960', borderColor: '#fff', fontWeight: 700 }}
                >
                  Agendar diagnóstico gratuito
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>

              {/* Posts relacionados */}
              {related.length > 0 && (
                <div>
                  <h2 className="font-bold text-lg mb-4" style={{ color: '#2f4960' }}>
                    Artigos relacionados
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {related.map(r => (
                      <Link
                        key={r.slug}
                        href={`/blog/${r.slug}`}
                        className="card p-5 group block"
                        style={{ textDecoration: 'none' }}
                      >
                        <span
                          className="text-xs font-semibold px-2 py-0.5 rounded mb-2 inline-block"
                          style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                        >
                          {r.category}
                        </span>
                        <p
                          className="font-bold text-sm leading-snug group-hover:text-gve-blue transition-colors"
                          style={{ color: '#2f4960' }}
                        >
                          {r.title}
                        </p>
                        <span
                          className="inline-flex items-center gap-1 text-xs font-semibold mt-2"
                          style={{ color: '#507c9f' }}
                        >
                          Ler <ChevronRight size={12} aria-hidden="true" />
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Voltar */}
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold"
                  style={{ color: '#507c9f' }}
                >
                  <ChevronLeft size={16} aria-hidden="true" />
                  Ver todos os artigos
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Formulário sidebar */}
              <div className="card p-6 sticky top-24">
                <h3 className="font-bold text-base mb-1" style={{ color: '#2f4960' }}>
                  Estruture sua geração de demanda
                </h3>
                <p className="text-xs text-gray-500 mb-5">
                  Diagnóstico gratuito — sem compromisso.
                </p>
                <ContactForm formType={`blog-${params.slug}`} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
