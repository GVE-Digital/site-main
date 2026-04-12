/**
 * GVE Digital — Módulo de Atribuição de Origem
 * Captura e persiste parâmetros de UTM, gclid e fbclid
 * com TTL de 30 dias em localStorage
 */

export interface AttributionData {
  utm_source:   string | null
  utm_medium:   string | null
  utm_campaign: string | null
  utm_content:  string | null
  gclid:        string | null
  fbclid:       string | null
  captured_at:  number
}

const STORAGE_KEY = 'gve_attribution'
const TTL_MS      = 30 * 24 * 60 * 60 * 1000 // 30 dias

/**
 * Lê parâmetros da URL atual e persiste no localStorage.
 * Deve ser chamado no primeiro carregamento da página.
 */
export function captureAttribution(): void {
  if (typeof window === 'undefined') return

  const params = new URLSearchParams(window.location.search)

  const utm_source   = params.get('utm_source')
  const utm_medium   = params.get('utm_medium')
  const utm_campaign = params.get('utm_campaign')
  const utm_content  = params.get('utm_content')
  const gclid        = params.get('gclid')
  const fbclid       = params.get('fbclid')

  // Só sobrescreve se pelo menos um parâmetro estiver presente
  const hasParams = [utm_source, utm_medium, utm_campaign, utm_content, gclid, fbclid]
    .some(v => v !== null)

  if (!hasParams) return

  const data: AttributionData = {
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    gclid,
    fbclid,
    captured_at: Date.now(),
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    // localStorage indisponível (modo privado, storage cheio etc.)
  }
}

/**
 * Recupera a atribuição armazenada, respeitando o TTL de 30 dias.
 * Retorna objeto com todos os campos vazios se não houver dados ou expirado.
 */
export function getStoredAttribution(): Omit<AttributionData, 'captured_at'> {
  const empty: Omit<AttributionData, 'captured_at'> = {
    utm_source:   null,
    utm_medium:   null,
    utm_campaign: null,
    utm_content:  null,
    gclid:        null,
    fbclid:       null,
  }

  if (typeof window === 'undefined') return empty

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return empty

    const data: AttributionData = JSON.parse(raw)

    // Verificar TTL
    if (Date.now() - data.captured_at > TTL_MS) {
      localStorage.removeItem(STORAGE_KEY)
      return empty
    }

    const { captured_at: _captured_at, ...rest } = data
    return rest
  } catch {
    return empty
  }
}

/**
 * Remove os dados de atribuição do localStorage.
 */
export function clearAttribution(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // silent
  }
}
