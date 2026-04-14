/**
 * GVE Digital — Meta Conversions API (CAPI)
 * Netlify Function — TypeScript ESM
 *
 * Recebe eventos do browser, faz hash SHA-256 dos dados do usuário
 * e encaminha à API de Conversões do Meta com deduplicação por event_id.
 *
 * Variável de ambiente: META_CAPI_TOKEN_<PIXEL_ID> (configurada no Netlify)
 */

import crypto from 'crypto'

interface UserData {
  em?: string   // e-mail
  ph?: string   // telefone
  fn?: string   // primeiro nome
  ln?: string   // sobrenome
  fbc?: string  // click ID do Facebook (_fbc cookie)
  fbp?: string  // browser ID do Facebook (_fbp cookie)
  ct?: string   // cidade (hashed)
  st?: string   // estado (hashed)
  zp?: string   // CEP (hashed)
  country?: string
  client_ip_address?: string
  client_user_agent?: string
  external_id?: string
}

interface CAPIPayload {
  pixelId:        string
  eventName:      string
  eventId:        string
  userData:       UserData
  customData?:    Record<string, unknown>
  eventSourceUrl: string
}

const sha256 = (value: string): string =>
  crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')

const hashPhone = (phone: string): string =>
  sha256(phone.replace(/\D/g, ''))

// Netlify runtime injeta o objeto global Netlify
declare const Netlify: { env: { get(key: string): string | undefined } }

export default async function handler(req: Request): Promise<Response> {
  // Só aceita POST
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  let payload: CAPIPayload

  try {
    payload = await req.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { pixelId, eventName, eventId, userData, customData, eventSourceUrl } = payload

  // Validação básica
  if (!pixelId || !eventName || !eventId || !eventSourceUrl) {
    return Response.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Recuperar token da variável de ambiente
  const token = Netlify.env.get(`META_CAPI_TOKEN_${pixelId}`)
  if (!token) {
    console.error(`[CAPI] Token não encontrado para pixel ${pixelId}`)
    return Response.json({ error: 'Token not configured for this pixel' }, { status: 400 })
  }

  // Montar payload CAPI com hashing obrigatório
  const capiPayload = {
    data: [
      {
        event_name:        eventName,
        event_time:        Math.floor(Date.now() / 1000),
        event_id:          eventId,          // usado para deduplicação com Pixel browser-side
        event_source_url:  eventSourceUrl,
        action_source:     'website',
        user_data: {
          em:  userData.em  ? sha256(userData.em)   : undefined,
          ph:  userData.ph  ? hashPhone(userData.ph) : undefined,
          fn:  userData.fn  ? sha256(userData.fn)   : undefined,
          ln:  userData.ln  ? sha256(userData.ln)   : undefined,
          fbc: userData.fbc || undefined,  // já pré-hash pelo browser
          fbp: userData.fbp || undefined,
          ct:  userData.ct  ? sha256(userData.ct)   : undefined,
          st:  userData.st  ? sha256(userData.st)   : undefined,
          zp:  userData.zp  ? sha256(userData.zp)   : undefined,
          client_ip_address: userData.client_ip_address,
          client_user_agent: userData.client_user_agent,
          external_id: userData.external_id ? sha256(userData.external_id) : undefined,
        },
        custom_data: customData,
      },
    ],
    // test_event_code: 'TEST12345', // descomentar durante validação no Events Manager
  }

  // Remover campos undefined do user_data
  const cleanedUserData: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(capiPayload.data[0].user_data)) {
    if (v !== undefined) cleanedUserData[k] = v
  }
  capiPayload.data[0].user_data = cleanedUserData as typeof capiPayload.data[0].user_data

  try {
    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(capiPayload),
        // keepalive: true — não disponível em Node, mas o fetch nativo aguarda
      },
    )

    if (!response.ok) {
      const errorBody = await response.text()
      console.error(`[CAPI] Erro da API Meta: ${response.status}`, errorBody)
      return Response.json({ error: 'Meta API error', details: errorBody }, { status: 502 })
    }

    const result = await response.json()
    console.log(`[CAPI] Evento ${eventName} (${eventId}) enviado com sucesso`)
    return Response.json({ success: true, events_received: result.events_received })
  } catch (error) {
    console.error('[CAPI] Erro ao chamar API Meta:', error)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
