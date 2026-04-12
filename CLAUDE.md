# CLAUDE.md — GVE Digital Site

Guia de trabalho para o Claude Code neste repositório. Leia antes de qualquer modificação.

---

## O que é este projeto

Site institucional B2B da **GVE Digital** (GV Estratégia Digital). Não é um site genérico — é um asset comercial ativo com quatro funções simultâneas: autoridade/credibilidade, geração de demanda orgânica, retargeting pool e prova de método. Cada decisão de código deve ser avaliada nesse contexto.

---

## Stack e convenções

- **Framework:** Next.js 14+ com App Router — Server Components por padrão, `'use client'` apenas quando necessário (estado, eventos, hooks)
- **Estilo:** Tailwind CSS + CSS custom properties definidas em `app/globals.css`
- **Tipagem:** TypeScript strict — sem `any` sem justificativa explícita
- **Imagens:** sempre `next/image` — nunca `<img>` direto
- **Links:** sempre `next/link` — nunca `<a>` para rotas internas

### Paleta de cores (usar as variáveis CSS, não hex inline)

```css
var(--color-navy)   /* #2f4960 — primária escura */
var(--color-blue)   /* #507c9f — primária */
var(--color-white)  /* #ffffff */
var(--color-bg)     /* #f2f2f2 */
var(--color-text)   /* #1C1C1C */
```

No Tailwind: `text-navy`, `bg-navy`, `text-gve-blue`, `bg-gve-bg`.

---

## Regras não-negociáveis

Estas regras vêm do meta-prompt do projeto e nunca devem ser violadas:

1. **WhatsApp** só aparece no estado de sucesso pós-submit do formulário. Nunca como CTA antes da conversão.
2. **Nenhuma imagem de stock** — usar `next/image` com placeholder e sinalizar `// ⚠️ TODO: substituir por imagem real`.
3. **Todo formulário** deve ter: honeypot (`bot-field`, position absolute, aria-hidden) + LGPD checkbox obrigatório + todos os campos ocultos de atribuição.
4. **`event_id`** é UUID v4 gerado no cliente — deve ser idêntico no Pixel browser-side e no CAPI server-side (deduplicação obrigatória).
5. **Animações** apenas com `opacity` e `transform`. Nunca animar `height`, `width`, `top` ou `margin`.
6. **`prefers-reduced-motion`** implementado em todas as animações.
7. **Dados pendentes** (IDs de rastreamento, cases, depoimentos) — sinalizar com `// ⚠️ TODO:`. Nunca inventar métricas ou citações.
8. **Schema markup** em todas as páginas: Organization na raiz, BreadcrumbList em N2+, schemas específicos por tipo de página.
9. **Canonical tag** em todas as páginas via `generateMetadata`.
10. **Página /sobre** — não mencionar tamanho de equipe diretamente; não usar lista enumerada de membros.

---

## Estrutura de conteúdo (MDX)

O conteúdo vive em `content/` e é lido via `lib/mdx.ts`:

| Diretório | Tipo | Funções disponíveis |
|-----------|------|---------------------|
| `content/blog/` | Posts do blog | `getAllPosts()`, `getPostBySlug(slug)` |
| `content/servicos/` | Serviços | `getAllServices()`, `getServiceBySlug(slug)` |
| `content/cases/` | Cases | `getAllCases()`, `getCaseBySlug(slug)` |

Posts com `draft: true` no frontmatter são filtrados automaticamente em produção.

---

## Rastreamento e eventos GTM

Todos os eventos de analytics passam pelo `window.dataLayer`. O GTM gerencia Meta Pixel, GA4 e Google Ads — **não inserir scripts de rastreamento diretamente no JSX**.

Padrão obrigatório para disparar eventos:

```typescript
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  event: 'form_submit_success',
  event_id: eventId,        // UUID v4 — obrigatório
  form_type: 'contato',
  lead_source: 'site',
  page_url: window.location.href,
  ...getStoredAttribution(),
})
```

Eventos implementados: `form_submit_success`, `cta_click`, `whatsapp_click`, `service_page_view`, `scroll_depth`.

---

## Formulário (ContactForm)

O `ContactForm.tsx` é o componente mais crítico do site. Ao modificá-lo:

- Manter todos os campos ocultos de atribuição (`gclid`, `fbclid`, `utm_*`, `page_url`, `event_id`, `form_type`)
- Manter o honeypot com `position: absolute; left: -9999px`
- Manter o rate limiting de 5s entre submits (`lastSubmit` state)
- Manter o `event_id` UUID v4 idêntico no dataLayer e no payload do CAPI
- O botão de WhatsApp só deve aparecer no estado `status === 'success'`
- Validação com `aria-invalid`, `aria-describedby` e foco no primeiro campo com erro

---

## CAPI (Meta Conversions API)

A função serverless está em `netlify/functions/capi.mts`. Ela:
- Recebe o payload do browser
- Busca o token via `META_CAPI_TOKEN_<PIXEL_ID>` nas env vars do Netlify
- Faz hash SHA-256 de todos os dados PII antes de enviar ao Meta
- Usa o mesmo `event_id` do Pixel browser-side para deduplicação

**Nunca logar dados PII** (e-mail, telefone) — apenas o `event_id` e o nome do evento.

---

## SEO — padrão por tipo de página

### `generateMetadata` obrigatório em toda rota

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Título da Página | GVE Digital',
    description: '150–160 caracteres para o ICP',
    alternates: { canonical: 'https://gvedigital.com/rota' },
    openGraph: {
      title: '...',
      description: '...',
      url: 'https://gvedigital.com/rota',
      images: [{ url: 'https://gvedigital.com/og/rota.png', width: 1200, height: 630 }],
      locale: 'pt_BR',
      type: 'website',
    },
  }
}
```

### Schema por tipo de página

| Página | Schemas |
|--------|---------|
| `/` | WebPage + WebSite (Organization está no layout) |
| `/sobre` | Person (Gabriel Vieira) |
| `/servicos/[slug]` | Service + FAQPage |
| `/cases/[slug]` | Article |
| `/blog/[slug]` | BlogPosting |
| Todas N2+ | BreadcrumbList |

---

## Adicionando um novo serviço

1. Criar `content/servicos/meu-slug.mdx` com o frontmatter:
   ```yaml
   title, description, shortDescription, type (carro-chefe|incluso|avulso), features[], faq[]
   ```
2. O arquivo será detectado automaticamente por `getAllServiceSlugs()` via `generateStaticParams`
3. Adicionar o card no array `SERVICOS` em `app/servicos/page.tsx`
4. Adicionar o link em `components/Footer.tsx`

---

## Adicionando um case

1. Criar `content/cases/meu-slug.mdx`:
   ```yaml
   title, description, date, sector, service, result, draft: false
   ```
2. **Nunca inventar métricas, nomes ou depoimentos** — usar dados reais validados pelo cliente
3. Se o cliente preferir anonimato: "Empresa do setor de Indústria Metalúrgica"

---

## Comandos úteis

```bash
npm run dev          # desenvolvimento em localhost:3000
npm run build        # build de produção + sitemap
npm run lint         # ESLint

# Revalidar uma rota manualmente (requer REVALIDATION_SECRET configurado)
curl -X POST http://localhost:3000/api/revalidate \
  -H "Authorization: Bearer $REVALIDATION_SECRET" \
  -d '{"path": "/blog/meu-slug", "type": "path"}'
```

---

## TODOs pendentes antes do deploy

Sinalizados no código com `// ⚠️ TODO:`. Os críticos:

| Item | Arquivo |
|------|---------|
| GTM ID (`GTM-XXXXXXX`) | `app/layout.tsx` |
| Meta Pixel ID | `app/layout.tsx`, `components/ContactForm.tsx` |
| `META_CAPI_TOKEN_<PIXEL_ID>` | Netlify Environment Variables |
| Logo SVG (horizontal + ícone + versão branca) | `public/` |
| `perfil2.png` (foto Gabriel) | `public/perfil2.png` |
| Ao menos 2 cases reais | `content/cases/` |
| Conteúdo dos 5 posts do blog | `content/blog/*.mdx` (remover `draft: true`) |
| Imagens OG 1200×630 | `public/og/*.png` |
| YouTube URL | `components/Footer.tsx`, `app/layout.tsx` schema |

---

## Informações da empresa

```
Razão Social:  GV Estratégia Digital
CNPJ:          55.785.571/0001-70
Nome fantasia: GVE Digital
Domínio:       gvedigital.com
WhatsApp:      +55 (47) 9 9854-8232
E-mail:        contato@gvedigital.com
LinkedIn:      https://www.linkedin.com/company/gvedigital-assessoria-de-marketing/
Instagram:     https://www.instagram.com/gvedigitaltech/
Localização:   Balneário Camboriú, SC — atendimento nacional
```
