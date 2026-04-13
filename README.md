# GVE Digital — Site Institucional B2B

Site institucional da **GVE Digital** (GV Estratégia Digital), agência de Marketing Comercial B2B. Desenvolvido como asset comercial ativo — não apenas presença digital.

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 14+ com App Router |
| Linguagem | TypeScript |
| Estilo | Tailwind CSS + CSS custom properties |
| Hospedagem | Netlify (deploy automático via `main`) |
| CMS | MDX local (`content/`) |
| Formulários | Netlify Forms + honeypot + LGPD |
| OG dinâmico | `@vercel/og` via rota Edge `/og` |
| Rastreamento | GTM + GA4 + Meta Pixel + CAPI server-side |
| Atribuição | localStorage TTL 30 dias |

---

## Começando

### Pré-requisitos

- Node.js 20+
- npm 10+

### Instalação

```bash
# Clonar e instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local.example .env.local
# Editar .env.local com os valores reais

# Rodar em desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:3000`.

### Build

```bash
npm run build
```

O comando executa `next build` seguido de `next-sitemap` (geração do sitemap automático).

---

## Estrutura do projeto

```
site-main/
├── app/                          # Rotas Next.js (App Router)
│   ├── layout.tsx                # Layout raiz — GTM, Organization schema, fonte Inter
│   ├── globals.css               # CSS custom properties da marca GVE
│   ├── page.tsx                  # Home (SSG)
│   ├── sobre/page.tsx
│   ├── servicos/
│   │   ├── page.tsx              # Hub de serviços
│   │   └── [slug]/page.tsx       # Página individual de serviço
│   ├── cases/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── blog/
│   │   ├── page.tsx              # ISR (revalidate: 3600s)
│   │   └── [slug]/page.tsx       # ISR + on-demand
│   ├── contato/page.tsx
│   ├── privacidade/page.tsx
│   ├── og/route.tsx              # OG dinâmico via @vercel/og (Edge runtime)
│   └── api/revalidate/route.ts   # On-demand revalidation
├── components/
│   ├── ContactForm.tsx           # Formulário GVE completo
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── TrackedLink.tsx           # Link com disparo GTM dataLayer
│   └── SchemaMarkup.tsx          # JSON-LD helper
├── lib/
│   ├── attribution.ts            # Captura/recupera UTMs, gclid, fbclid
│   └── mdx.ts                    # Leitura de conteúdo MDX
├── netlify/
│   └── functions/
│       └── capi.mts              # Meta Conversions API server-side
├── content/
│   ├── blog/                     # Posts em MDX
│   ├── servicos/                 # Conteúdo dos serviços em MDX
│   └── cases/                   # Cases em MDX (criar antes do deploy)
└── public/
    ├── robots.txt
    ├── gve-logo-horizont-transparent.png  # Logo horizontal (Navigation, Footer)
    ├── gve-logo-horizont-escuro.png       # Logo horizontal fundo escuro
    ├── gve-logo.png                       # Foto logo em escritório (hero)
    ├── gve-icon.png                       # Ícone da marca
    ├── gve-favicon.png                    # Favicon
    └── perfil2.png                        # Foto Gabriel Vieira (página Sobre)
```

---

## Rotas

| Rota | Estratégia | Descrição |
|------|-----------|-----------|
| `/` | SSG | Home com Hero, Metodologia GVED, Serviços, Prova Social |
| `/sobre` | SSG | Posicionamento de Gabriel Vieira + metodologia + parceiros |
| `/servicos` | SSG | Hub de serviços (5 cards) |
| `/servicos/[slug]` | SSG | Serviço individual com FAQ e formulário inline |
| `/cases` | SSG | Lista de cases |
| `/cases/[slug]` | SSG | Case individual |
| `/blog` | ISR 3600s | Listagem de posts |
| `/blog/[slug]` | ISR 3600s | Post com schema BlogPosting |
| `/contato` | SSG | Formulário GVE completo + credibilidade lateral |
| `/privacidade` | SSG | Política de Privacidade LGPD |

---

## Conteúdo (MDX)

### Publicar um post do blog

1. Criar arquivo em `content/blog/meu-slug.mdx`
2. Preencher o frontmatter:

```yaml
---
title: "Título do Post"
description: "Descrição com 150–160 caracteres"
date: "2026-01-01"
category: "Estratégia"          # Estratégia | Mídia Paga | Inteligência Comercial
keywords: ["palavra-chave-1", "palavra-chave-2"]
author: "Gabriel Vieira"
image: "/og/blog-meu-slug.png"  # opcional
draft: false                    # remover draft: true para publicar
---
```

3. Escrever o conteúdo em Markdown abaixo do frontmatter — tabelas GFM são suportadas via `remark-gfm`
4. Deploy na `main` ou disparar revalidação via `/api/revalidate`

### Adicionar um case

1. Criar arquivo em `content/cases/meu-slug.mdx`
2. Frontmatter:

```yaml
---
title: "Empresa do Setor X — Resultado alcançado"
description: "Resumo de 150 caracteres"
date: "2026-01-01"
sector: "Indústria"
service: "GVED Marketing Comercial B2B"
result: "CPL reduzido de R$ 320 para R$ 85 em 90 dias"
draft: false
---
```

> **Regra GVE:** nunca inventar métricas, nomes de clientes ou citações.

---

## Rastreamento

### IDs de rastreamento

| Serviço | ID |
|---------|-----|
| GTM | `GTM-K3T7K8DD` |
| Meta Pixel | `1276444017301444` |
| Google Ads | `AW-16646303402` |

### GTM

Todos os eventos são disparados via `window.dataLayer`. O GTM gerencia Meta Pixel, GA4, Google Ads e Enhanced Conversions. Nenhum script de rastreamento deve ser inserido diretamente no código — tudo passa pelo GTM.

Eventos implementados:

| Evento | Quando dispara |
|--------|---------------|
| `form_submit_success` | Submit bem-sucedido do formulário |
| `cta_click` | Clique em qualquer botão CTA |
| `whatsapp_click` | Clique no botão WhatsApp (somente pós-submit) |
| `service_page_view` | Visualização de página de serviço |
| `scroll_depth` | Profundidade de scroll 25/50/75/90% |

### CAPI (Meta Conversions API)

A função `netlify/functions/capi.mts` recebe o evento do browser, faz hash SHA-256 dos dados do usuário e encaminha ao Meta.

Variável de ambiente necessária no Netlify:
```
META_CAPI_TOKEN_1276444017301444=seu_token_aqui
```

O `event_id` é gerado como UUID v4 no cliente e passado tanto para o Pixel browser-side quanto para o CAPI — garantindo deduplicação.

### Revalidação on-demand

```bash
curl -X POST https://gvedigital.com/api/revalidate \
  -H "Authorization: Bearer $REVALIDATION_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"path": "/blog/meu-post", "type": "path"}'
```

---

## Variáveis de ambiente

| Variável | Onde usar | Descrição |
|----------|-----------|-----------|
| `META_CAPI_TOKEN_1276444017301444` | Netlify env | Token da CAPI do Meta Pixel |
| `REVALIDATION_SECRET` | Netlify env | Segredo para `/api/revalidate` |
| `NEXT_PUBLIC_SITE_URL` | `.env.local` | URL base do site |

---

## Deploy

O projeto usa **Netlify** com deploy automático via push na branch `main`.

Configurações em `netlify.toml`:
- Build command: `npm run build`
- Publish directory: `.next`
- Plugin `@netlify/plugin-nextjs`
- Headers HTTP de segurança (HSTS, CSP, X-Frame-Options, etc.)

---

## TODOs antes do deploy em produção

- [x] GTM `GTM-K3T7K8DD` configurado em `app/layout.tsx`
- [x] Meta Pixel `1276444017301444` configurado em `app/layout.tsx` e `ContactForm.tsx`
- [x] Variável `META_CAPI_TOKEN_1276444017301444` no `.env.local`
- [x] Logos, favicon e foto do fundador adicionados em `public/`
- [x] OG dinâmico via `@vercel/og` — sem necessidade de imagens estáticas por rota
- [x] YouTube `@GVEDigital` no Footer e schema Organization
- [x] 3 cases reais adicionados em `content/cases/`
- [ ] Configurar `META_CAPI_TOKEN_1276444017301444` no painel Netlify (env var)
- [ ] Escrever conteúdo dos posts do blog e remover `draft: true`
- [ ] Configurar `REVALIDATION_SECRET` no Netlify
- [ ] Validar schemas com [Google Rich Results Test](https://search.google.com/test/rich-results)

### OG dinâmico

As imagens Open Graph são geradas automaticamente pela rota `/og`. Para pré-visualizar:

```
http://localhost:3000/og?type=blog&title=Título+do+Post&description=Descrição&category=Categoria
http://localhost:3000/og?type=servico&title=Nome+do+Serviço&description=Descrição
http://localhost:3000/og?title=GVE+Digital&description=Descrição+geral
```

Parâmetros aceitos: `type` (blog | servico | case | default), `title`, `description`, `category`.

---

## Identidade da marca

| Token | Valor |
|-------|-------|
| Navy (primária escura) | `#2f4960` |
| Azul médio | `#507c9f` |
| Branco | `#ffffff` |
| Background | `#f2f2f2` |
| Texto | `#1C1C1C` |
| Fonte | Inter (fallback: system-ui) |

---

## Informações legais

**Razão Social:** GV Estratégia Digital
**CNPJ:** 55.785.571/0001-70
**Domínio:** gvedigital.com
**Localização:** Balneário Camboriú, SC
