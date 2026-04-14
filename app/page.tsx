import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaMarkup from '@/components/SchemaMarkup'
import TrackedLink from '@/components/TrackedLink'
import {
  ArrowRight, CheckCircle2, TrendingUp, Target, BarChart3, Layers,
  Building2, Award, ChevronRight
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'GVE Digital | Marketing Comercial B2B — Estratégia, Tecnologia e Previsibilidade',
  description:
    'Agência B2B especializada em geração de demanda qualificada. Metodologia GVED em 5 fases: diagnóstico, ICP, funil de aquisição, mídia paga e escala previsível. 40+ empresas atendidas.',
  alternates: { canonical: 'https://gvedigital.com' },
  openGraph: {
    title: 'GVE Digital | Marketing Comercial B2B',
    description: 'Demanda qualificada e previsibilidade comercial em até 6 meses com metodologia GVED proprietária.',
    url: 'https://gvedigital.com',
    images: [{ url: 'https://gvedigital.com/og?title=GVE+Digital+%7C+Marketing+Comercial+B2B&description=Demanda+qualificada+e+previsibilidade+comercial+para+empresas+B2B+com+metodologia+GVED+propriet%C3%A1ria', width: 1200, height: 630, alt: 'GVE Digital' }],
  },
}

const FASES_GVED = [
  {
    id: 'F0',
    title: 'Onboarding',
    objetivo: 'Alinhar expectativas, coletar acessos e estruturar o projeto.',
    entregavel: 'Documento de Onboarding — acessos, metas e KPIs acordados.',
  },
  {
    id: 'F1',
    title: 'Diagnóstico & Ativação',
    objetivo: 'Diagnóstico do marketing atual + campanha básica de validação rodando.',
    entregavel: 'Relatório de Diagnóstico + Plano Estratégico por fases.',
  },
  {
    id: 'F2',
    title: 'Inteligência Comercial',
    objetivo: 'Definir ICP, copy estratégico e critérios de MQL antes de escalar.',
    entregavel: 'Documento de Inteligência Comercial — ICP, jornada, copy, filtros MQL.',
  },
  {
    id: 'F3',
    title: 'Geração de Demanda',
    objetivo: 'Estrutura completa de aquisição ativa — site, funil e mídia em escala.',
    entregavel: 'Relatório de Estrutura — funil documentado, LP, CRM integrado, primeiros MQLs.',
  },
  {
    id: 'F4',
    title: 'Crescimento & Escala',
    objetivo: 'Reduzir CPA, aumentar volume de MQL, consolidar previsibilidade comercial.',
    entregavel: 'Relatório Mensal de Performance com análise comparativa e próximos ajustes.',
    recorrente: true,
  },
]

const SERVICOS = [
  {
    slug: 'gved-marketing-b2b',
    title: 'GVED Marketing Comercial B2B',
    description: 'Estrutura comercial completa: ICP, copy, funil, mídia paga e CRM integrado. Nosso serviço carro-chefe.',
    badge: 'Carro-chefe',
    icon: <Layers size={22} />,
  },
  {
    slug: 'gestao-meta-ads-b2b',
    title: 'Gestão de Meta Ads B2B',
    description: 'Campanhas no Meta (Facebook e Instagram) otimizadas para geração de leads qualificados em mercados B2B.',
    badge: null,
    icon: <Target size={22} />,
  },
  {
    slug: 'gestao-google-ads-b2b',
    title: 'Gestão de Google Ads B2B',
    description: 'Captura de demanda ativa com Google Search e Display, configuração de Enhanced Conversions e rastreamento GA4.',
    badge: null,
    icon: <TrendingUp size={22} />,
  },
  {
    slug: 'site-landing-page-b2b',
    title: 'Site Comercial e Landing Page B2B',
    description: 'Sites e LPs otimizados para conversão e SEO — com rastreamento completo e integração com seu funil de vendas.',
    badge: 'Avulso',
    icon: <BarChart3 size={22} />,
  },
  {
    slug: 'inteligencia-comercial',
    title: 'Inteligência Comercial B2B',
    description: 'Definição de ICP, segmentação de mercado, copy estratégico e critérios de MQL para escalar com qualidade.',
    badge: null,
    icon: <Award size={22} />,
  },
]

const DIFERENCIAIS = [
  {
    title: 'Não é tráfego avulso',
    desc: 'É estrutura comercial completa: ICP definido, copy estratégico, funil configurado, CRM integrado e mídia paga operando em conjunto.',
  },
  {
    title: 'Rastreamento preciso',
    desc: 'GA4, GTM, Meta Pixel com CAPI e Enhanced Conversions para Google Ads. Cada lead rastreado da origem até o fechamento.',
  },
  {
    title: 'Loop de qualidade de lead',
    desc: 'Feedback do time comercial vai direto para o CRM e alimenta o algoritmo de mídia. O sistema aprende e melhora continuamente.',
  },
  {
    title: 'Entregáveis validados por fase',
    desc: 'Nenhuma fase avança sem aprovação do cliente. Você sabe exatamente o que foi feito, o que vem a seguir e quais resultados esperar.',
  },
]

const homeSchema = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://gvedigital.com/#webpage',
    url: 'https://gvedigital.com',
    name: 'GVE Digital | Marketing Comercial B2B',
    isPartOf: { '@id': 'https://gvedigital.com/#website' },
    about: { '@id': 'https://gvedigital.com/#organization' },
    description: 'Geração de demanda qualificada e previsibilidade comercial para empresas B2B com metodologia GVED.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://gvedigital.com/#website',
    url: 'https://gvedigital.com',
    name: 'GVE Digital',
    publisher: { '@id': 'https://gvedigital.com/#organization' },
  },
]

export default function HomePage() {
  return (
    <>
      <SchemaMarkup schema={homeSchema} />

      {/* ─── HERO ─── */}
      <section
        className="pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Apresentação da GVE Digital"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 60% 40%, rgba(80,124,159,0.25) 0%, transparent 70%)',
          }}
        />

        <div className="container mx-auto px-6" style={{ maxWidth: '1280px', position: 'relative' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Texto */}
            <div>
              <p
                className="inline-flex items-center gap-2 text-sm font-semibold mb-5 px-3 py-1.5 rounded-full"
                style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.85)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" aria-hidden="true" />
                Mais de 40 empresas B2B atendidas desde 2023
              </p>

              <h1
                className="font-bold text-white mb-6 leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
              >
                Demanda qualificada e previsibilidade comercial para o seu B2B
              </h1>

              <p
                className="text-lg md:text-xl mb-8 leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.78)', maxWidth: '52ch' }}
              >
                A GVE Digital estrutura o marketing comercial da sua empresa B2B do zero — ICP, copy estratégico, funil de aquisição, mídia paga e integração com CRM — com metodologia proprietária e entregáveis validados fase a fase.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <TrackedLink
                  href="/contato"
                  className="btn btn-lg"
                  style={{ backgroundColor: '#fff', color: '#2f4960', borderColor: '#fff', fontWeight: 700 }}
                  event="cta_click"
                  eventData={{ cta_text: 'Agendar diagnóstico gratuito', cta_destination: '/contato', page_section: 'hero' }}
                >
                  Agendar diagnóstico gratuito
                  <ArrowRight size={16} aria-hidden="true" />
                </TrackedLink>
                <Link href="/servicos/gved-marketing-b2b" className="btn btn-lg btn-outline-white">
                  Ver metodologia GVED
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Building2 size={16} style={{ color: 'rgba(255,255,255,0.6)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>40+ empresas B2B atendidas</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} style={{ color: 'rgba(255,255,255,0.6)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Parceiros Kommo CRM e Pipedrive</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp size={16} style={{ color: 'rgba(255,255,255,0.6)' }} aria-hidden="true" />
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>Desde 2023, foco exclusivo em B2B</span>
                </div>
              </div>
            </div>

            {/* Imagem — visível apenas em desktop */}
            <div className="hidden lg:block">
              <div
                className="relative rounded-2xl overflow-hidden shadow-2xl"
                style={{ height: '480px' }}
              >
                <Image
                  src="/gve-logo.png"
                  alt="Escritório GVE Digital"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(135deg, rgba(47,73,96,0.15) 0%, transparent 60%)' }}
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DIFERENCIAIS ─── */}
      <section className="section bg-white" aria-label="Diferenciais da GVE Digital">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="text-center mb-14">
            <span className="divider-blue mx-auto" />
            <h2 className="section-title">Por que a GVE é diferente?</h2>
            <p className="section-subtitle mx-auto mt-4">
              Não vendemos "gestão de tráfego". Entregamos estrutura comercial completa — do diagnóstico ao lead MQL chegando no seu CRM.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DIFERENCIAIS.map((d, i) => (
              <div key={i} className="card p-7">
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center mt-0.5"
                    style={{ backgroundColor: '#f0f5fa' }}
                    aria-hidden="true"
                  >
                    <CheckCircle2 size={20} style={{ color: '#2f4960' }} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2" style={{ color: '#2f4960' }}>{d.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-10 p-6 rounded-xl border"
            style={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb' }}
          >
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Para quem NÃO somos a solução certa
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                'B2C, e-commerce ou varejo',
                'Startups pré-revenue sem verba de mídia',
                'Campanhas avulsas sem funil',
                'Empresas sem time comercial para atender leads',
              ].map(item => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-sm text-gray-500"
                  style={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                >
                  <span aria-hidden="true">✕</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVIÇOS HUB ─── */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }} aria-label="Serviços da GVE Digital">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="text-center mb-14">
            <span className="divider-blue mx-auto" />
            <h2 className="section-title">Nossos serviços</h2>
            <p className="section-subtitle mx-auto mt-4">
              Do diagnóstico à escala — cada serviço é parte de um sistema integrado de geração de demanda B2B.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICOS.map(s => (
              <Link
                key={s.slug}
                href={`/servicos/${s.slug}`}
                className="card p-7 group block"
                style={{ textDecoration: 'none' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: '#f0f5fa', color: '#2f4960' }}
                    aria-hidden="true"
                  >
                    {s.icon}
                  </div>
                  {s.badge && (
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={
                        s.badge === 'Carro-chefe'
                          ? { backgroundColor: '#2f4960', color: '#fff' }
                          : { backgroundColor: '#e0eaf3', color: '#2f4960' }
                      }
                    >
                      {s.badge}
                    </span>
                  )}
                </div>
                <h3
                  className="font-bold mb-2 text-base leading-snug group-hover:text-gve-blue transition-colors"
                  style={{ color: '#2f4960' }}
                >
                  {s.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: '#507c9f' }}>
                  Ver detalhes
                  <ChevronRight size={14} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── METODOLOGIA GVED ─── */}
      <section className="section bg-white" aria-label="Metodologia GVED — 5 fases">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="text-center mb-14">
            <span className="divider-blue mx-auto" />
            <h2 className="section-title">Como funciona o GVED Marketing Comercial B2B</h2>
            <p className="section-subtitle mx-auto mt-4">
              5 fases estruturadas. Entregáveis concretos. Sem pular etapa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FASES_GVED.map((fase) => (
              <div key={fase.id} className="fase-card" style={fase.id === 'F4' ? { borderLeftColor: '#2f4960' } : {}}>
                {fase.recorrente && (
                  <span
                    className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                  >
                    Recorrente
                  </span>
                )}
                <span className="fase-badge">{fase.id}</span>
                <h3 className="font-bold text-base mb-2" style={{ color: '#2f4960' }}>{fase.title}</h3>
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{fase.objetivo}</p>
                <div
                  className="p-3 rounded-lg text-xs leading-relaxed"
                  style={{ backgroundColor: '#f8fafc', color: '#507c9f', border: '1px solid #e0eaf3' }}
                >
                  <span className="font-semibold block mb-0.5">Entregável:</span>
                  {fase.entregavel}
                </div>
              </div>
            ))}
          </div>

          <div
            className="mt-10 p-6 rounded-xl text-center"
            style={{ backgroundColor: '#f0f5fa', border: '1px solid #d0e0ec' }}
          >
            <p className="text-sm text-gray-600 italic max-w-2xl mx-auto">
              "Cada fase tem um entregável validado pelo cliente antes de avançar. O resultado não é prometido no contrato — é construído fase a fase, com dados."
            </p>
          </div>

          <div className="mt-8 text-center">
            <TrackedLink
              href="/servicos/gved-marketing-b2b"
              className="btn btn-primary btn-lg"
              event="cta_click"
              eventData={{ cta_text: 'Ver metodologia completa', cta_destination: '/servicos/gved-marketing-b2b', page_section: 'metodologia' }}
            >
              Ver metodologia completa
              <ArrowRight size={16} aria-hidden="true" />
            </TrackedLink>
          </div>
        </div>
      </section>

      {/* ─── PROVA SOCIAL + PARCEIROS ─── */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }} aria-label="Prova social e parceiros">
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="divider-blue" />
              <h2 className="section-title mb-6">Resultados que constroem reputação</h2>

              <div className="grid grid-cols-2 gap-5 mb-8">
                {[
                  { num: '40+', label: 'empresas B2B atendidas' },
                  { num: '3+', label: 'anos atuando com marketing B2B' },
                  { num: '6m', label: 'para previsibilidade comercial' },
                  { num: 'R$300k+', label: 'em mídia paga gerenciada' },
                ].map(({ num, label }) => (
                  <div
                    key={label}
                    className="p-5 rounded-xl text-center"
                    style={{ backgroundColor: '#fff', boxShadow: '0 1px 3px rgb(0 0 0/0.06)' }}
                  >
                    <p className="text-3xl font-bold mb-1" style={{ color: '#2f4960' }} aria-label={`${num} — ${label}`}>
                      {num}
                    </p>
                    <p className="text-xs text-gray-500">{label}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                Foco exclusivo em empresas B2B com 15 a 200 funcionários — indústria, SaaS, serviços e saúde corporativa — em todo o Brasil.
              </p>
            </div>

            <div className="space-y-6">
              <div className="card p-6">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-4">
                  Parceiros oficiais de CRM
                </h3>
                <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
                  <Image src="/kommo-partner-light.png" alt="Kommo Partner" width={140} height={47} />
                  <Image src="/pipedrive-affiliate-light.png" alt="Pipedrive Affiliate Partner" width={136} height={60} />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Integração nativa com os CRMs mais usados no mercado B2B — sem retrabalho no processo comercial.
                </p>
              </div>

              {/* Case em destaque */}
              <div className="card p-6">
                <h3 className="font-bold text-sm uppercase tracking-wide text-gray-400 mb-4">
                  Case em destaque
                </h3>
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full inline-block mb-3"
                  style={{ backgroundColor: '#e0eaf3', color: '#2f4960' }}
                >
                  Serviços B2B
                </span>
                <p className="font-bold text-base mb-1" style={{ color: '#2f4960' }}>
                  Consultoria tributária B2B
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  Meta Ads reestruturado com ICP e critérios de MQL definidos — quase totalidade dos leads qualificados.
                </p>
                <div
                  className="p-3 rounded-lg mb-4 text-sm font-medium"
                  style={{ backgroundColor: '#f0f5fa', color: '#2f4960' }}
                >
                  → R$ 150.000+ em retorno gerado em 90 dias
                </div>
                <TrackedLink
                  href="/cases/consultoria-tributaria-b2b"
                  className="inline-flex items-center gap-1 text-sm font-semibold"
                  style={{ color: '#507c9f' }}
                  event="cta_click"
                  eventData={{ cta_text: 'Ver case completo', cta_destination: '/cases/consultoria-tributaria-b2b', page_section: 'prova_social' }}
                >
                  Ver case completo
                  <ChevronRight size={14} aria-hidden="true" />
                </TrackedLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA FINAL ─── */}
      <section className="section" style={{ backgroundColor: '#2f4960' }} aria-label="Call to action final">
        <div className="container mx-auto px-6 text-center" style={{ maxWidth: '1280px' }}>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.01em' }}
          >
            Pronto para ter previsibilidade comercial?
          </h2>
          <p className="text-lg mb-8 mx-auto" style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '50ch' }}>
            Agende um diagnóstico gratuito. Em até 30 minutos, identificamos as principais oportunidades no seu ciclo de geração de demanda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <TrackedLink
              href="/contato"
              className="btn btn-lg"
              style={{ backgroundColor: '#fff', color: '#2f4960', borderColor: '#fff', fontWeight: 700 }}
              event="cta_click"
              eventData={{ cta_text: 'Agendar diagnóstico gratuito', cta_destination: '/contato', page_section: 'cta_final' }}
            >
              Agendar diagnóstico gratuito
              <ArrowRight size={16} aria-hidden="true" />
            </TrackedLink>
            <TrackedLink
              href="/cases"
              className="btn btn-lg btn-outline-white"
              event="cta_click"
              eventData={{ cta_text: 'Ver cases', cta_destination: '/cases', page_section: 'cta_final' }}
            >
              Ver cases
            </TrackedLink>
          </div>

          <p className="mt-5 text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Atendimento exclusivo para empresas B2B com equipe comercial ativa. Mínimo de R$ 3.000/mês de verba de mídia.
          </p>
        </div>
      </section>
    </>
  )
}
