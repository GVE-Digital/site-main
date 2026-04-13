import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl

  const faviconSrc = `${origin}/gve-favicon.png`
  const logoSrc    = `${origin}/gve-logo-horizont-transparent.png`

  const title       = searchParams.get('title')       || 'GVE Digital'
  const description = searchParams.get('description') || 'Estratégia, Tecnologia e Previsibilidade para empresas B2B'
  const type        = searchParams.get('type')        || 'default'
  const category    = searchParams.get('category')    || ''

  const typeLabel: Record<string, string> = {
    blog:    'Blog',
    servico: 'Serviço',
    case:    'Case',
    default: 'GVE Digital',
  }

  const isDefault = type === 'default'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          backgroundColor: '#2f4960',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradiente radial */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 70% 80% at 30% 50%, rgba(80,124,159,0.35) 0%, transparent 65%)',
          }}
        />

        {/* Padrão de pontos decorativo no lado direito */}
        <div
          style={{
            position: 'absolute',
            right: '-20px',
            top: '-20px',
            width: '480px',
            height: '480px',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Linha decorativa lateral esquerda */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '5px',
            background: 'linear-gradient(to bottom, #507c9f, rgba(80,124,159,0.3))',
          }}
        />

        {/* Layout: coluna esquerda (texto) + coluna direita (logo) */}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          {/* ── Coluna esquerda ── */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: '56px 60px 52px 72px',
              flex: 1,
            }}
          >
            {/* Topo: badge de tipo + categoria */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.9)',
                  fontSize: '15px',
                  fontWeight: 600,
                  padding: '7px 18px',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                {typeLabel[type] ?? 'GVE Digital'}
              </div>
              {category && (
                <div
                  style={{
                    backgroundColor: 'rgba(80,124,159,0.35)',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '14px',
                    padding: '7px 16px',
                    borderRadius: '999px',
                  }}
                >
                  {category}
                </div>
              )}
            </div>

            {/* Título */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div
                style={{
                  color: '#ffffff',
                  fontSize: title.length > 55 ? '40px' : '50px',
                  fontWeight: 800,
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  maxWidth: '580px',
                }}
              >
                {title}
              </div>
              <div
                style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontSize: '19px',
                  lineHeight: 1.55,
                  maxWidth: '540px',
                }}
              >
                {description.length > 110 ? description.slice(0, 110) + '…' : description}
              </div>

              {/* Credenciais — só nas páginas default */}
              {isDefault && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                  {['40+ empresas B2B', 'R$300k+ em mídia', '3+ anos no mercado'].map((item) => (
                    <div
                      key={item}
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.14)',
                        color: 'rgba(255,255,255,0.8)',
                        fontSize: '13px',
                        fontWeight: 600,
                        padding: '6px 14px',
                        borderRadius: '6px',
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Rodapé: favicon + domínio */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderTop: '1px solid rgba(255,255,255,0.12)',
                paddingTop: '20px',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={faviconSrc}
                alt=""
                width={36}
                height={36}
                style={{ borderRadius: '6px', objectFit: 'contain' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>
                  GVE Digital
                </span>
                <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px' }}>
                  gvedigital.com
                </span>
              </div>
            </div>
          </div>

          {/* ── Coluna direita: logo ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '380px',
              flexShrink: 0,
              padding: '60px 48px',
              position: 'relative',
            }}
          >
            {/* Brilho atrás da logo */}
            <div
              style={{
                position: 'absolute',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(80,124,159,0.3) 0%, transparent 70%)',
              }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="GVE Digital"
              width={280}
              height={80}
              style={{
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)',
                opacity: 0.9,
                position: 'relative',
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
