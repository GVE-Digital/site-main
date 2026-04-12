import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  const title       = searchParams.get('title')       || 'GVE Digital'
  const description = searchParams.get('description') || 'Marketing Comercial B2B'
  const type        = searchParams.get('type')        || 'default' // blog | servico | case | default
  const category    = searchParams.get('category')    || ''

  const typeLabel: Record<string, string> = {
    blog:    'Blog',
    servico: 'Serviço',
    case:    'Case',
    default: 'GVE Digital',
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#2f4960',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Gradiente de fundo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(80,124,159,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Linha decorativa lateral */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '6px',
            backgroundColor: '#507c9f',
          }}
        />

        {/* Conteúdo principal */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            padding: '60px 80px',
            position: 'relative',
          }}
        >
          {/* Topo: tipo + categoria */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: '18px',
                fontWeight: 600,
                padding: '8px 20px',
                borderRadius: '999px',
              }}
            >
              {typeLabel[type] ?? 'GVE Digital'}
            </div>
            {category && (
              <div
                style={{
                  backgroundColor: 'rgba(80,124,159,0.4)',
                  color: 'rgba(255,255,255,0.75)',
                  fontSize: '16px',
                  padding: '8px 20px',
                  borderRadius: '999px',
                }}
              >
                {category}
              </div>
            )}
          </div>

          {/* Título */}
          <div
            style={{
              color: '#ffffff',
              fontSize: title.length > 60 ? '44px' : '52px',
              fontWeight: 700,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              maxWidth: '900px',
            }}
          >
            {title}
          </div>

          {/* Rodapé: descrição + marca */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {description && (
              <div
                style={{
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '22px',
                  lineHeight: 1.5,
                  maxWidth: '800px',
                }}
              >
                {description.length > 120 ? description.slice(0, 120) + '…' : description}
              </div>
            )}

            {/* Marca */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                paddingTop: '20px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  backgroundColor: '#507c9f',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '16px',
                  fontWeight: 700,
                }}
              >
                GV
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ color: '#ffffff', fontSize: '18px', fontWeight: 700 }}>
                  GVE Digital
                </span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
                  gvedigital.com · Marketing Comercial B2B
                </span>
              </div>
            </div>
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
