import type { Metadata } from 'next'
import Link from 'next/link'
import SchemaMarkup from '@/components/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Termos de Serviço | GVE Digital',
  description:
    'Termos de Serviço da GV Estratégia Digital (GVE Digital). Condições gerais que regem a prestação de serviços de marketing digital B2B.',
  alternates: { canonical: 'https://gvedigital.com/termos' },
  robots: { index: true, follow: true },
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://gvedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Termos de Serviço', item: 'https://gvedigital.com/termos' },
  ],
}

const LAST_UPDATED = '2026-01-01'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function TermosPage() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema} />

      {/* Header */}
      <section
        className="pt-32 pb-12"
        style={{ backgroundColor: '#2f4960' }}
        aria-label="Termos de Serviço"
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '1280px' }}>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'rgba(255,255,255,0.6)' }}>Início</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" style={{ color: '#fff' }}>Termos de Serviço</li>
            </ol>
          </nav>
          <h1
            className="font-bold text-white mb-2"
            style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.01em' }}
          >
            Termos de Serviço
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

                {/* Aceitação */}
                <section aria-labelledby="sec-aceitacao">
                  <h2 id="sec-aceitacao" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    1. Aceitação dos Termos
                  </h2>
                  <p>
                    Ao contratar os serviços da <strong>GV Estratégia Digital</strong> (CNPJ 55.785.571/0001-70), nome fantasia <strong>GVE Digital</strong>, ou ao utilizar o site <strong>gvedigital.com</strong>, o cliente declara ter lido, compreendido e concordado com os presentes Termos de Serviço.
                  </p>
                  <p>
                    Caso não concorde com qualquer disposição aqui prevista, o cliente deverá se abster de contratar os serviços ou utilizar o site.
                  </p>
                </section>

                {/* Serviços */}
                <section aria-labelledby="sec-servicos">
                  <h2 id="sec-servicos" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    2. Descrição dos Serviços
                  </h2>
                  <p>
                    A GVE Digital presta serviços de marketing digital B2B, incluindo, mas não se limitando a:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Gestão de campanhas de mídia paga (Meta Ads e Google Ads);</li>
                    <li>Estratégia e execução do programa GVED Marketing Comercial B2B;</li>
                    <li>Criação e otimização de sites comerciais e landing pages;</li>
                    <li>Inteligência comercial B2B (ICP, análise de segmento e posicionamento);</li>
                    <li>Configuração e gerenciamento de ferramentas de rastreamento e analytics.</li>
                  </ul>
                  <p className="mt-3">
                    O escopo detalhado de cada projeto é definido na proposta comercial e/ou contrato de prestação de serviços firmado entre as partes.
                  </p>
                </section>

                {/* Obrigações do cliente */}
                <section aria-labelledby="sec-obrigacoes-cliente">
                  <h2 id="sec-obrigacoes-cliente" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    3. Obrigações do Cliente
                  </h2>
                  <p>O cliente compromete-se a:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Fornecer informações verdadeiras, completas e atualizadas necessárias para a execução dos serviços;</li>
                    <li>Conceder os acessos e permissões necessários nas plataformas indicadas (Google Ads, Meta Business Suite, Analytics, CRM, entre outros);</li>
                    <li>Aprovar ou solicitar ajustes nos entregáveis nos prazos acordados;</li>
                    <li>Efetuar os pagamentos nas datas estipuladas em contrato;</li>
                    <li>Não utilizar os materiais e estratégias entregues para fins ilícitos ou que violem as políticas das plataformas de anúncios.</li>
                  </ul>
                </section>

                {/* Obrigações da GVE */}
                <section aria-labelledby="sec-obrigacoes-gve">
                  <h2 id="sec-obrigacoes-gve" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    4. Obrigações da GVE Digital
                  </h2>
                  <p>A GVE Digital compromete-se a:</p>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Prestar os serviços contratados com diligência, boa-fé e dentro das melhores práticas do mercado;</li>
                    <li>Manter sigilo sobre as informações confidenciais do cliente;</li>
                    <li>Comunicar proativamente qualquer impedimento ou necessidade de ajuste no escopo;</li>
                    <li>Entregar relatórios de performance conforme periodicidade acordada.</li>
                  </ul>
                </section>

                {/* Pagamento */}
                <section aria-labelledby="sec-pagamento">
                  <h2 id="sec-pagamento" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    5. Pagamento e Reajuste
                  </h2>
                  <p>
                    Os valores, formas de pagamento e periodicidade são definidos em contrato. O inadimplemento por prazo superior a 10 (dez) dias corridos pode ensejar a suspensão dos serviços, sem prejuízo da cobrança dos valores devidos acrescidos de juros de 1% ao mês e multa de 2%, conforme legislação aplicável.
                  </p>
                  <p className="mt-3">
                    Os honorários de gestão não incluem o investimento em mídia paga (verba de anúncios), que é de responsabilidade exclusiva do cliente e pago diretamente às plataformas.
                  </p>
                </section>

                {/* Propriedade intelectual */}
                <section aria-labelledby="sec-pi">
                  <h2 id="sec-pi" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    6. Propriedade Intelectual
                  </h2>
                  <p>
                    Os materiais, metodologias, frameworks e estratégias desenvolvidos pela GVE Digital constituem propriedade intelectual da GV Estratégia Digital, salvo disposição contrária expressa em contrato.
                  </p>
                  <p className="mt-3">
                    Os ativos criados especificamente para o cliente (peças criativas, textos de anúncio, páginas) são cedidos ao cliente após a quitação integral dos serviços. O cliente é responsável por garantir que os materiais fornecidos à GVE Digital (logos, imagens, textos) não infrinjam direitos de terceiros.
                  </p>
                </section>

                {/* Confidencialidade */}
                <section aria-labelledby="sec-confidencialidade">
                  <h2 id="sec-confidencialidade" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    7. Confidencialidade
                  </h2>
                  <p>
                    Ambas as partes se comprometem a manter sigilo sobre informações confidenciais trocadas durante a vigência e após o encerramento da relação contratual. Consideram-se confidenciais: dados estratégicos, financeiros, comerciais, metodologias proprietárias e quaisquer informações expressamente marcadas como sigilosas.
                  </p>
                </section>

                {/* Limitação de responsabilidade */}
                <section aria-labelledby="sec-responsabilidade">
                  <h2 id="sec-responsabilidade" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    8. Limitação de Responsabilidade
                  </h2>
                  <p>
                    A GVE Digital não garante resultados específicos de negócio, como número de leads, faturamento ou retorno sobre investimento, pois esses dependem de fatores externos ao controle da GVE (mercado, sazonalidade, capacidade comercial do cliente, entre outros).
                  </p>
                  <p className="mt-3">
                    A responsabilidade da GVE Digital, em qualquer hipótese, ficará limitada ao valor total pago pelo cliente nos últimos 3 (três) meses de contrato. A GVE Digital não se responsabiliza por danos indiretos, lucros cessantes ou perda de oportunidades de negócio.
                  </p>
                </section>

                {/* Rescisão */}
                <section aria-labelledby="sec-rescisao">
                  <h2 id="sec-rescisao" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    9. Rescisão
                  </h2>
                  <p>
                    Qualquer das partes poderá rescindir o contrato mediante notificação prévia por escrito, observado o prazo de aviso prévio definido em contrato (em regra, 30 dias corridos). A rescisão não exime o cliente do pagamento pelos serviços já prestados até a data de encerramento.
                  </p>
                  <p className="mt-3">
                    A GVE Digital poderá rescindir imediatamente o contrato em caso de inadimplemento, uso indevido dos serviços ou violação dos presentes Termos.
                  </p>
                </section>

                {/* Lei aplicável */}
                <section aria-labelledby="sec-lei">
                  <h2 id="sec-lei" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    10. Lei Aplicável e Foro
                  </h2>
                  <p>
                    Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da Comarca de Balneário Camboriú – SC para dirimir quaisquer controvérsias decorrentes deste instrumento, com renúncia expressa a qualquer outro, por mais privilegiado que seja.
                  </p>
                </section>

                {/* Alterações */}
                <section aria-labelledby="sec-alteracoes">
                  <h2 id="sec-alteracoes" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    11. Alterações nestes Termos
                  </h2>
                  <p>
                    A GVE Digital reserva-se o direito de atualizar estes Termos de Serviço a qualquer momento. A data da última revisão consta no topo deste documento. Alterações relevantes serão comunicadas por e-mail aos clientes ativos com pelo menos 15 dias de antecedência.
                  </p>
                </section>

                {/* Contato */}
                <section aria-labelledby="sec-contato">
                  <h2 id="sec-contato" className="font-bold text-xl mb-3" style={{ color: '#2f4960' }}>
                    12. Contato
                  </h2>
                  <p>
                    Dúvidas sobre estes Termos de Serviço:
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
