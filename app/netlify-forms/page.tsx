/**
 * Página oculta para detecção de formulários Netlify.
 * O @netlify/plugin-nextjs v5 só detecta forms em HTML pré-renderizado pelo Next.js.
 * Esta página não é linkada em nenhum lugar do site.
 * Ref: https://ntl.fyi/next-runtime-forms-migration
 */
export default function NetlifyFormsPage() {
  return (
    <form
      name="contato-gve"
      data-netlify="true"
      netlify-honeypot="bot-field"
      hidden
    >
      <input type="hidden" name="form-name"     value="contato-gve" />
      <input type="hidden" name="form_type" />
      <input type="hidden" name="utm_source" />
      <input type="hidden" name="utm_medium" />
      <input type="hidden" name="utm_campaign" />
      <input type="hidden" name="utm_content" />
      <input type="hidden" name="gclid" />
      <input type="hidden" name="fbclid" />
      <input type="hidden" name="page_url" />
      <input type="hidden" name="event_id" />
      <input type="text"   name="bot-field" />
      <input type="text"   name="nome" />
      <input type="text"   name="whatsapp" />
      <input type="email"  name="email" />
      <input type="text"   name="empresa" />
      <input type="text"   name="cargo" />
      <select name="dor"><option value=""></option></select>
      <input type="checkbox" name="lgpd" />
    </form>
  )
}
