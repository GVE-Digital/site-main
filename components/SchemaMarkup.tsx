/**
 * GVE Digital — Componente de Schema Markup JSON-LD
 * Renderiza schema.org como script JSON-LD no <head>
 */

interface SchemaMarkupProps {
  schema: Record<string, unknown> | Record<string, unknown>[]
}

export default function SchemaMarkup({ schema }: SchemaMarkupProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
