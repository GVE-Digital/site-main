'use client'

import { useState, useEffect, useId, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { getStoredAttribution } from '@/lib/attribution'
import { MessageSquare, CheckCircle2, AlertCircle } from 'lucide-react'

const DOR_OPTIONS = [
  { value: '', label: 'Selecione a opção que mais se encaixa...' },
  {
    value: 'pipeline_vazio',
    label: 'Gero poucos leads e o pipeline comercial está vazio',
  },
  {
    value: 'leads_fora_perfil',
    label: 'Gero leads, mas a maioria não tem o perfil ideal',
  },
  {
    value: 'tem_budget',
    label: 'Tenho budget para mídia paga mas não sei por onde começar',
  },
  {
    value: 'sem_retorno_agencias',
    label: 'Já investi em agências e não vi retorno mensurável',
  },
  {
    value: 'canal_zero',
    label: 'Preciso montar um canal de aquisição previsível do zero',
  },
]

interface FormFields {
  nome:     string
  whatsapp: string
  email:    string
  empresa:  string
  cargo:    string
  dor:      string
  lgpd:     boolean
  botField: string // honeypot
}

interface FormErrors {
  nome?:     string
  whatsapp?: string
  email?:    string
  empresa?:  string
  cargo?:    string
  dor?:      string
  lgpd?:     string
}

interface ContactFormProps {
  formType?: string
  className?: string
}

function maskPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 13)
  if (digits.length <= 2)  return `+${digits}`
  if (digits.length <= 4)  return `+${digits.slice(0,2)} (${digits.slice(2)}`
  if (digits.length <= 9)  return `+${digits.slice(0,2)} (${digits.slice(2,4)}) ${digits.slice(4)}`
  if (digits.length <= 13) return `+${digits.slice(0,2)} (${digits.slice(2,4)}) ${digits.slice(4,9)}-${digits.slice(9)}`
  return value
}

export default function ContactForm({ formType = 'contato', className = '' }: ContactFormProps) {
  const formId   = useId()
  const firstErrorRef = useRef<HTMLElement | null>(null)

  const [fields, setFields] = useState<FormFields>({
    nome:     '',
    whatsapp: '',
    email:    '',
    empresa:  '',
    cargo:    '',
    dor:      '',
    lgpd:     false,
    botField: '',
  })
  const [errors, setErrors]     = useState<FormErrors>({})
  const [status, setStatus]     = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [lastSubmit, setLastSubmit] = useState(0) // rate limiting 5s

  // Preencher campos ocultos de atribuição no primeiro render (client only)
  const [attribution, setAttribution] = useState({
    utm_source: '', utm_medium: '', utm_campaign: '',
    utm_content: '', gclid: '', fbclid: '',
  })

  useEffect(() => {
    const stored = getStoredAttribution()
    setAttribution({
      utm_source:   stored.utm_source   ?? '',
      utm_medium:   stored.utm_medium   ?? '',
      utm_campaign: stored.utm_campaign ?? '',
      utm_content:  stored.utm_content  ?? '',
      gclid:        stored.gclid        ?? '',
      fbclid:       stored.fbclid       ?? '',
    })
  }, [])

  const handleChange = (field: keyof FormFields, value: string | boolean) => {
    setFields(prev => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePhoneChange = (value: string) => {
    handleChange('whatsapp', maskPhone(value))
  }

  const validate = (): FormErrors => {
    const errs: FormErrors = {}

    if (!fields.nome.trim())
      errs.nome = 'Por favor, informe seu nome completo.'
    else if (fields.nome.trim().split(' ').length < 2)
      errs.nome = 'Informe nome e sobrenome.'

    const phoneDigits = fields.whatsapp.replace(/\D/g, '')
    if (!phoneDigits)
      errs.whatsapp = 'Por favor, informe seu WhatsApp.'
    else if (phoneDigits.length < 12)
      errs.whatsapp = 'Número inválido. Use o formato +55 (XX) XXXXX-XXXX.'

    if (!fields.email.trim())
      errs.email = 'Por favor, informe seu e-mail corporativo.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))
      errs.email = 'E-mail inválido.'

    if (!fields.empresa.trim())
      errs.empresa = 'Por favor, informe o nome da empresa.'

    if (!fields.cargo.trim())
      errs.cargo = 'Por favor, informe seu cargo.'

    if (!fields.dor)
      errs.dor = 'Selecione a opção que melhor descreve seu cenário atual.'

    if (!fields.lgpd)
      errs.lgpd = 'É necessário aceitar a política de privacidade para continuar.'

    return errs
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Honeypot check
    if (fields.botField) return

    // Rate limiting 5s
    const now = Date.now()
    if (now - lastSubmit < 5000) return
    setLastSubmit(now)

    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Foco no primeiro campo com erro (acessibilidade)
      setTimeout(() => {
        const firstError = document.querySelector('[aria-invalid="true"]') as HTMLElement | null
        firstError?.focus()
      }, 50)
      return
    }

    setStatus('loading')

    const eventId  = uuidv4()
    const pageUrl  = window.location.href

    const formData = {
      'form-name':   'contato-gve',
      'form_type':   formType,
      'event_id':    eventId,
      'page_url':    pageUrl,
      nome:          fields.nome.trim(),
      whatsapp:      fields.whatsapp,
      email:         fields.email.trim().toLowerCase(),
      empresa:       fields.empresa.trim(),
      cargo:         fields.cargo.trim(),
      dor:           fields.dor,
      ...attribution,
    }

    try {
      // Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as Record<string, string>).toString(),
      })

      if (!response.ok) throw new Error('Netlify Forms error')

      // GTM dataLayer
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        event:       'form_submit_success',
        event_id:    eventId,
        form_type:   formType,
        lead_source: 'site',
        page_url:    pageUrl,
        ...attribution,
      })

      // CAPI (server-side) — disparado em segundo plano
      const nameParts = fields.nome.trim().split(' ')
      fetch('/api/capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pixelId:        '1276444017301444',
          eventName:      'Lead',
          eventId,
          eventSourceUrl: pageUrl,
          userData: {
            em: fields.email.trim().toLowerCase(),
            ph: fields.whatsapp,
            fn: nameParts[0],
            ln: nameParts.slice(1).join(' ') || undefined,
            fbc: document.cookie.match(/_fbc=([^;]+)/)?.[1],
            fbp: document.cookie.match(/_fbp=([^;]+)/)?.[1],
          },
          customData: {
            form_type: formType,
            lead_dor:  fields.dor,
          },
        }),
      }).catch(err => console.warn('[CAPI] Erro silencioso:', err))

      // Google Ads Enhanced Conversion — via GTM
      window.dataLayer.push({
        event:                     'enhanced_conversion_lead',
        enhanced_conversion_data: {
          email:       fields.email.trim().toLowerCase(),
          phone_number: fields.whatsapp.replace(/\D/g, ''),
        },
      })

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        className="text-center py-10 px-6"
        role="status"
        aria-live="polite"
      >
        <div className="flex justify-center mb-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: '#dcfce7' }}
          >
            <CheckCircle2 size={32} style={{ color: '#16a34a' }} aria-hidden="true" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2" style={{ color: '#2f4960' }}>
          Recebemos seu contato!
        </h3>
        <p className="text-gray-600 mb-6 max-w-sm mx-auto">
          Em até 1 dia útil o Gabriel entra em contato para entender seu cenário e ver como podemos ajudar.
        </p>
        {/* WhatsApp exibido APENAS aqui — nunca antes da conversão */}
        <a
          href="https://wa.me/5547998548232"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 btn btn-primary btn-lg"
          onClick={() => {
            window.dataLayer = window.dataLayer || []
            window.dataLayer.push({
              event:     'whatsapp_click',
              placement: 'pos-submit',
              page_url:  window.location.href,
            })
          }}
        >
          <MessageSquare size={18} aria-hidden="true" />
          Falar agora pelo WhatsApp
        </a>
        <p className="text-xs text-gray-400 mt-3">+55 (47) 9 9854-8232</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-5 ${className}`}
      name="contato-gve"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      noValidate
      aria-label="Formulário de contato GVE Digital"
    >
      {/* Campos ocultos Netlify */}
      <input type="hidden" name="form-name"   value="contato-gve" />
      <input type="hidden" name="form_type"   value={formType} />
      <input type="hidden" name="utm_source"  value={attribution.utm_source} />
      <input type="hidden" name="utm_medium"  value={attribution.utm_medium} />
      <input type="hidden" name="utm_campaign" value={attribution.utm_campaign} />
      <input type="hidden" name="utm_content" value={attribution.utm_content} />
      <input type="hidden" name="gclid"       value={attribution.gclid} />
      <input type="hidden" name="fbclid"      value={attribution.fbclid} />

      {/* Honeypot — invisível para usuários, captura bots */}
      <input
        name="bot-field"
        value={fields.botField}
        onChange={e => handleChange('botField', e.target.value)}
        style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
      />

      {/* Grid 2 colunas no desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nome */}
        <div className="form-field sm:col-span-2">
          <label htmlFor={`${formId}-nome`} className="form-label">
            Nome completo <span className="required" aria-label="obrigatório">*</span>
          </label>
          <input
            id={`${formId}-nome`}
            type="text"
            name="nome"
            className="form-input"
            placeholder="Ex.: João da Silva"
            value={fields.nome}
            onChange={e => handleChange('nome', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.nome}
            aria-describedby={errors.nome ? `${formId}-nome-error` : undefined}
            autoComplete="name"
          />
          {errors.nome && (
            <span id={`${formId}-nome-error`} className="form-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.nome}
            </span>
          )}
        </div>

        {/* WhatsApp */}
        <div className="form-field">
          <label htmlFor={`${formId}-whatsapp`} className="form-label">
            WhatsApp <span className="required" aria-label="obrigatório">*</span>
          </label>
          <input
            id={`${formId}-whatsapp`}
            type="tel"
            name="whatsapp"
            className="form-input"
            placeholder="+55 (47) 99999-9999"
            value={fields.whatsapp}
            onChange={e => handlePhoneChange(e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.whatsapp}
            aria-describedby={errors.whatsapp ? `${formId}-whatsapp-error` : undefined}
            autoComplete="tel"
            inputMode="tel"
          />
          {errors.whatsapp && (
            <span id={`${formId}-whatsapp-error`} className="form-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.whatsapp}
            </span>
          )}
        </div>

        {/* E-mail */}
        <div className="form-field">
          <label htmlFor={`${formId}-email`} className="form-label">
            E-mail corporativo <span className="required" aria-label="obrigatório">*</span>
          </label>
          <input
            id={`${formId}-email`}
            type="email"
            name="email"
            className="form-input"
            placeholder="voce@empresa.com.br"
            value={fields.email}
            onChange={e => handleChange('email', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${formId}-email-error` : undefined}
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && (
            <span id={`${formId}-email-error`} className="form-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.email}
            </span>
          )}
        </div>

        {/* Empresa */}
        <div className="form-field">
          <label htmlFor={`${formId}-empresa`} className="form-label">
            Nome da empresa <span className="required" aria-label="obrigatório">*</span>
          </label>
          <input
            id={`${formId}-empresa`}
            type="text"
            name="empresa"
            className="form-input"
            placeholder="Ex.: Empresa Ltda."
            value={fields.empresa}
            onChange={e => handleChange('empresa', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.empresa}
            aria-describedby={errors.empresa ? `${formId}-empresa-error` : undefined}
            autoComplete="organization"
          />
          {errors.empresa && (
            <span id={`${formId}-empresa-error`} className="form-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.empresa}
            </span>
          )}
        </div>

        {/* Cargo */}
        <div className="form-field">
          <label htmlFor={`${formId}-cargo`} className="form-label">
            Cargo <span className="required" aria-label="obrigatório">*</span>
          </label>
          <input
            id={`${formId}-cargo`}
            type="text"
            name="cargo"
            className="form-input"
            placeholder="Ex.: CEO, Diretor Comercial"
            value={fields.cargo}
            onChange={e => handleChange('cargo', e.target.value)}
            aria-required="true"
            aria-invalid={!!errors.cargo}
            aria-describedby={errors.cargo ? `${formId}-cargo-error` : undefined}
            autoComplete="organization-title"
          />
          {errors.cargo && (
            <span id={`${formId}-cargo-error`} className="form-error" role="alert">
              <AlertCircle size={14} aria-hidden="true" />
              {errors.cargo}
            </span>
          )}
        </div>
      </div>

      {/* Dor comercial — dropdown qualificador */}
      <div className="form-field">
        <label htmlFor={`${formId}-dor`} className="form-label">
          Qual é sua principal dor comercial hoje? <span className="required" aria-label="obrigatório">*</span>
        </label>
        <select
          id={`${formId}-dor`}
          name="dor"
          className="form-select"
          value={fields.dor}
          onChange={e => handleChange('dor', e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.dor}
          aria-describedby={errors.dor ? `${formId}-dor-error` : undefined}
        >
          {DOR_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.dor && (
          <span id={`${formId}-dor-error`} className="form-error" role="alert">
            <AlertCircle size={14} aria-hidden="true" />
            {errors.dor}
          </span>
        )}
      </div>

      {/* Checkbox LGPD */}
      <div className="form-field">
        <label
          className="flex items-start gap-3 cursor-pointer"
          htmlFor={`${formId}-lgpd`}
        >
          <input
            id={`${formId}-lgpd`}
            type="checkbox"
            name="lgpd"
            className="mt-0.5 w-4 h-4 rounded cursor-pointer flex-shrink-0"
            style={{ accentColor: '#2f4960' }}
            checked={fields.lgpd}
            onChange={e => handleChange('lgpd', e.target.checked)}
            aria-required="true"
            aria-invalid={!!errors.lgpd}
            aria-describedby={errors.lgpd ? `${formId}-lgpd-error` : undefined}
          />
          <span className="text-sm text-gray-600 leading-relaxed">
            Concordo com a{' '}
            <a href="/privacidade" target="_blank" rel="noopener noreferrer" className="underline text-navy hover:text-blue-600" style={{ color: '#2f4960' }}>
              Política de Privacidade
            </a>{' '}
            e autorizo o uso dos meus dados para contato comercial pela{' '}
            <strong>GV Estratégia Digital</strong>.
          </span>
        </label>
        {errors.lgpd && (
          <span id={`${formId}-lgpd-error`} className="form-error" role="alert">
            <AlertCircle size={14} aria-hidden="true" />
            {errors.lgpd}
          </span>
        )}
      </div>

      {/* Erro global */}
      {status === 'error' && (
        <div
          className="p-4 rounded-lg text-sm flex items-start gap-2"
          style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}
          role="alert"
          aria-live="assertive"
        >
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" aria-hidden="true" />
          <span>
            Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.
            Se o problema persistir, entre em contato pelo e-mail{' '}
            <a href="mailto:contato@gvedigital.com" className="underline font-medium">
              contato@gvedigital.com
            </a>.
          </span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn btn-primary btn-lg w-full"
        aria-busy={status === 'loading'}
      >
        {status === 'loading' ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <path fill="currentColor" className="opacity-75" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </span>
        ) : (
          'Agendar diagnóstico gratuito'
        )}
      </button>

      <p className="text-xs text-center text-gray-400">
        Sem compromisso. Resposta em até 1 dia útil.
      </p>
    </form>
  )
}
