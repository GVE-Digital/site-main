import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDir = path.join(process.cwd(), 'content')

// ─────────────────────────────────────────
// Tipos compartilhados
// ─────────────────────────────────────────

export interface BlogPost {
  slug:        string
  title:       string
  description: string
  date:        string
  category:    string
  keywords:    string[]
  author:      string
  image?:      string
  draft?:      boolean
  content:     string
}

export interface ServiceContent {
  slug:             string
  title:            string
  description:      string
  shortDescription: string
  type:             'carro-chefe' | 'incluso' | 'avulso'
  features:         string[]
  faq:              Array<{ question: string; answer: string }>
  content:          string
}

export interface CaseContent {
  slug:        string
  title:       string
  description: string
  sector:      string
  service:     string
  result:      string
  date:        string
  draft?:      boolean
  content:     string
}

// ─────────────────────────────────────────
// Blog
// ─────────────────────────────────────────

export function getAllPosts(): BlogPost[] {
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw  = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data, content } = matter(raw)
      return { slug, content, ...data } as BlogPost
    })
    .filter(p => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const filePath = path.join(contentDir, 'blog', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as BlogPost
}

export function getAllPostSlugs(): string[] {
  const dir = path.join(contentDir, 'blog')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

// ─────────────────────────────────────────
// Serviços
// ─────────────────────────────────────────

export function getAllServices(): ServiceContent[] {
  const dir = path.join(contentDir, 'servicos')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw  = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data, content } = matter(raw)
      return { slug, content, ...data } as ServiceContent
    })
}

export function getServiceBySlug(slug: string): ServiceContent | undefined {
  const filePath = path.join(contentDir, 'servicos', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as ServiceContent
}

export function getAllServiceSlugs(): string[] {
  const dir = path.join(contentDir, 'servicos')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

// ─────────────────────────────────────────
// Cases
// ─────────────────────────────────────────

export function getAllCases(): CaseContent[] {
  const dir = path.join(contentDir, 'cases')
  if (!fs.existsSync(dir)) return []

  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '')
      const raw  = fs.readFileSync(path.join(dir, filename), 'utf8')
      const { data, content } = matter(raw)
      return { slug, content, ...data } as CaseContent
    })
    .filter(c => !c.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getCaseBySlug(slug: string): CaseContent | undefined {
  const filePath = path.join(contentDir, 'cases', `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return undefined

  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  return { slug, content, ...data } as CaseContent
}

export function getAllCaseSlugs(): string[] {
  const dir = path.join(contentDir, 'cases')
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''))
}

// ─────────────────────────────────────────
// Helper: posts relacionados por categoria
// ─────────────────────────────────────────

export function getRelatedPosts(currentSlug: string, category: string, limit = 3): BlogPost[] {
  return getAllPosts()
    .filter(p => p.slug !== currentSlug && p.category === category)
    .slice(0, limit)
}
