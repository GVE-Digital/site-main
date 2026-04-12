import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GVE Digital — On-demand Revalidation Route
 * Permite revalidar páginas ISR via webhook (ex: CMS, deploy, trigger manual)
 *
 * Uso:
 *   POST /api/revalidate
 *   Header: Authorization: Bearer <REVALIDATION_SECRET>
 *   Body: { "path": "/blog/meu-post", "type": "path" }
 *         { "tag": "blog", "type": "tag" }
 *
 * Variável de ambiente: REVALIDATION_SECRET
 */
export async function POST(req: NextRequest) {
  // Verificar segredo de autorização
  const authHeader = req.headers.get('authorization')
  const secret = process.env.REVALIDATION_SECRET

  if (!secret) {
    return NextResponse.json(
      { error: 'REVALIDATION_SECRET não configurado' },
      { status: 500 }
    )
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json(
      { error: 'Não autorizado' },
      { status: 401 }
    )
  }

  let body: { path?: string; tag?: string; type?: 'path' | 'tag' }

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const { path, tag, type } = body

  try {
    if (type === 'tag' && tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, type: 'tag', tag })
    }

    if (path) {
      revalidatePath(path)
      return NextResponse.json({ revalidated: true, type: 'path', path })
    }

    // Revalidar todas as rotas dinâmicas comuns
    const defaultPaths = ['/blog', '/cases', '/servicos']
    for (const p of defaultPaths) {
      revalidatePath(p)
    }
    return NextResponse.json({ revalidated: true, paths: defaultPaths })
  } catch (err) {
    return NextResponse.json(
      { error: 'Erro ao revalidar', details: String(err) },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', endpoint: '/api/revalidate' })
}
