import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Política de Privacidade | GVE Digital',
  description:
    'Política de Privacidade da GV Estratégia Digital (GVE Digital). Saiba como tratamos seus dados pessoais conforme a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).',
  alternates: { canonical: 'https://gvedigital.com/privacidade' },
  robots: { index: true, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Política de Privacidade', item: 'https://gvedigital.com/privacidade' },
  ],
}

const LAST_UPDATED = '2026-01-01'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function PrivacidadePage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Header */}
      <section
        className="pt-32 pb-12"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Política de Privacidade"
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Política de Privacidade</li>
            </ol>
          </nav>
          <h1
            className="font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.01em' }}
          >
            Política de Privacidade
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Última atualização: {formatDate(LAST_UPDATED)}
          </p>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="section" style={{ backgroundColor: '#f2f2f2' }}>
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <div className="max-w-3xl">
            <div className="card p-8 md:p-12">
              <div className="prose text-gray-700 space-y-8">

                {/* Identificação */}
                <section aria-labelledby="sec-identificacao">
                  <h2 id="sec-identificacao" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    1. Identificação do Controlador
                  </h2>
                  <p>
                    Esta Política de Privacidade é aplicada pela <strong>GV Estratégia Digital</strong>, inscrita no CNPJ sob o n.º <strong>55.785.571/0001-70</strong>, nome fantasia <strong>GVE Digital</strong>, com sede em Balneário Camboriú – SC, responsável pelo tratamento de dados pessoais coletados por meio do site <strong>gvedigital.com</strong> e seus formulários.
                  </p>
                  <p>
                    Para contato sobre assuntos relacionados à privacidade e proteção de dados, utilize:{' '}
                    <a href="mailto:contato@gvedigital.com">contato@gvedigital.com</a>.
                  </p>
                </section>

                {/* Dados coletados */}
                <section aria-labelledby="sec-dados">
                  <h2 id="sec-dados" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    2. Dados Pessoais Coletados
                  </h2>
                  <p>Ao preencher nossos formulários de contato, coletamos os seguintes dados:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Nome completo</li>
                    <li>Número de WhatsApp / telefone</li>
                    <li>E-mail corporativo</li>
                    <li>Nome da empresa</li>
                    <li>Cargo / função</li>
                    <li>Informações sobre a principal dor comercial declarada</li>
                  </ul>
                  <p className="mt-3">
                    Adicionalmente, coletamos automaticamente dados de navegação e atribuição de marketing, como parâmetros UTM, Google Click ID (gclid), Facebook Click ID (fbclid) e URL da página de origem, com o objetivo de identificar a origem do lead e otimizar as campanhas de marketing.
                  </p>
                </section>

                {/* Finalidade */}
                <section aria-labelledby="sec-finalidade">
                  <h2 id="sec-finalidade" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    3. Finalidade do Tratamento
                  </h2>
                  <p>Seus dados pessoais são utilizados exclusivamente para as seguintes finalidades:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Responder às solicitações de contato e diagnóstico enviadas por meio dos formulários;</li>
                    <li>Conduzir o processo comercial de apresentação de serviços da GVE Digital;</li>
                    <li>Envio de comunicações sobre serviços e conteúdos de marketing B2B, mediante consentimento;</li>
                    <li>Mensuração e otimização de campanhas de marketing digital (Meta Ads, Google Ads);</li>
                    <li>Cumprimento de obrigações legais aplicáveis.</li>
                  </ul>
                </section>

                {/* Base legal */}
                <section aria-labelledby="sec-base">
                  <h2 id="sec-base" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    4. Base Legal (LGPD)
                  </h2>
                  <p>
                    O tratamento dos seus dados está fundamentado nas seguintes bases legais previstas na Lei Geral de Proteção de Dados (Lei n.º 13.709/2018):
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Consentimento</strong> (art. 7º, I): para recebimento de comunicações de marketing;</li>
                    <li><strong>Legítimo interesse</strong> (art. 7º, IX): para otimização das campanhas e análise de performance;</li>
                    <li><strong>Execução de contrato ou procedimentos preliminares</strong> (art. 7º, V): para atendimento às solicitações de diagnóstico e proposta comercial.</li>
                  </ul>
                </section>

                {/* Compartilhamento */}
                <section aria-labelledby="sec-compartilhamento">
                  <h2 id="sec-compartilhamento" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    5. Compartilhamento de Dados
                  </h2>
                  <p>
                    A GVE Digital não vende ou aluga dados pessoais a terceiros. Os dados poderão ser compartilhados com:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Ferramentas de CRM</strong> (Kommo CRM e Pipedrive): para gestão do relacionamento comercial;</li>
                    <li><strong>Plataformas de anúncios</strong> (Meta Ads e Google Ads): por meio de APIs seguras com hash de dados, para otimização de campanhas (Meta Conversions API, Google Enhanced Conversions);</li>
                    <li><strong>Google Analytics / Google Tag Manager</strong>: para análise de comportamento e mensuração de conversões;</li>
                    <li><strong>Netlify</strong>: plataforma de hospedagem que processa os dados dos formulários.</li>
                  </ul>
                  <p className="mt-3 text-sm">
                    Todos os dados transmitidos às plataformas de anúncios são enviados após anonimização mediante hash SHA-256, em conformidade com os requisitos das respectivas APIs.
                  </p>
                </section>

                {/* Retenção */}
                <section aria-labelledby="sec-retencao">
                  <h2 id="sec-retencao" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    6. Período de Retenção
                  </h2>
                  <p>
                    Os dados pessoais são mantidos pelo tempo necessário para cumprir as finalidades para as quais foram coletados ou conforme exigido por lei. Dados de prospects que não resultarem em contrato comercial são retidos por até 24 meses após o último contato.
                  </p>
                </section>

                {/* Cookies */}
                <section aria-labelledby="sec-cookies">
                  <h2 id="sec-cookies" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    7. Cookies e Tecnologias de Rastreamento
                  </h2>
                  <p>
                    Utilizamos os seguintes tipos de cookies e tecnologias de rastreamento:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li><strong>Cookies essenciais</strong>: necessários para o funcionamento básico do site;</li>
                    <li><strong>Cookies analíticos</strong> (Google Analytics 4): para mensuração de audiência e comportamento de navegação;</li>
                    <li><strong>Cookies de marketing</strong> (Meta Pixel, Google Ads): para mensuração de conversões e criação de audiências de retargeting;</li>
                    <li><strong>Armazenamento local (localStorage)</strong>: para manter dados de atribuição de campanha por até 30 dias.</li>
                  </ul>
                </section>

                {/* Direitos */}
                <section aria-labelledby="sec-direitos">
                  <h2 id="sec-direitos" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    8. Seus Direitos como Titular dos Dados
                  </h2>
                  <p>
                    Nos termos da LGPD, você tem direito a:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Confirmar a existência de tratamento dos seus dados;</li>
                    <li>Acessar os dados que possuímos sobre você;</li>
                    <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
                    <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
                    <li>Revogar o consentimento a qualquer momento;</li>
                    <li>Solicitar a portabilidade dos dados;</li>
                    <li>Opor-se ao tratamento realizado com base em legítimo interesse.</li>
                  </ul>
                  <p className="mt-3">
                    Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
                    <a href="mailto:contato@gvedigital.com">contato@gvedigital.com</a>.
                  </p>
                </section>

                {/* Segurança */}
                <section aria-labelledby="sec-seguranca">
                  <h2 id="sec-seguranca" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    9. Segurança dos Dados
                  </h2>
                  <p>
                    Adotamos medidas técnicas e organizacionais adequadas para proteger os dados pessoais contra acesso não autorizado, alteração, divulgação ou destruição, incluindo transmissão segura via HTTPS/TLS, headers HTTP de segurança (HSTS, CSP, X-Frame-Options) e hashing de dados sensíveis antes do envio a APIs externas.
                  </p>
                </section>

                {/* Alterações */}
                <section aria-labelledby="sec-alteracoes">
                  <h2 id="sec-alteracoes" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    10. Alterações nesta Política
                  </h2>
                  <p>
                    Esta Política de Privacidade pode ser atualizada periodicamente. A data da última revisão consta no topo deste documento. Em caso de alterações relevantes, comunicaremos os titulares por e-mail ou por aviso destacado no site.
                  </p>
                </section>

                {/* Contato DPO */}
                <section aria-labelledby="sec-contato">
                  <h2 id="sec-contato" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    11. Contato
                  </h2>
                  <p>
                    Dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados pessoais:
                  </p>
                  <div
                    className="mt-3 p-4 rounded-lg text-sm"
                    style={{ backgroundColor: '#f0f5fa', border: '1px solid #d0e0ec' }}
                  >
                    <p><strong>GV Estratégia Digital</strong></p>
                    <p>CNPJ: 55.785.571/0001-70</p>
                    <p>E-mail: <a href="mailto:contato@gvedigital.com">contato@gvedigital.com</a></p>
                    <p>Balneário Camboriú – SC</p>
                  </div>
                </section>

              </div>
            </div>

            <div className="mt-6 text-center">
              <Link href="/" className="text-sm" style={{ color: '#507c9f' }}>
                ← Voltar para o início
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
