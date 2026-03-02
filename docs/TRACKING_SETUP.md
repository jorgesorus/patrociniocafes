# 📊 Guia de Instalação — Tags de Conversão e Pixels (Vercel)

Documentação completa para instalação de tags de rastreamento na landing page **Patrocínio Café**, hospedada na **Vercel**.

---

## Sumário

1. [Deploy na Vercel](#1-deploy-na-vercel)
2. [Google Tag Manager (GTM)](#2-google-tag-manager-gtm)
3. [Google Ads — Tag de Conversão](#3-google-ads--tag-de-conversão)
4. [Google Ads — Tag de Remarketing](#4-google-ads--tag-de-remarketing)
5. [Google Analytics 4 (GA4)](#5-google-analytics-4-ga4)
6. [Meta Pixel (Facebook)](#6-meta-pixel-facebook)
7. [API de Conversões da Meta (CAPI)](#7-api-de-conversões-da-meta-capi)
8. [Variáveis de Ambiente na Vercel](#8-variáveis-de-ambiente-na-vercel)
9. [Estrutura de Eventos](#9-estrutura-de-eventos)
10. [Checklist Final](#10-checklist-final)

---

## 1. Deploy na Vercel

### Pré-requisitos

- Repositório no GitHub conectado à Vercel
- Projeto Vite + React

### Configuração do projeto na Vercel

1. Acesse [vercel.com](https://vercel.com) → **Add New Project**
2. Importe o repositório do GitHub
3. Configure:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build` (ou `bun run build`)
   - **Output Directory:** `dist`
   - **Install Command:** `npm install` (ou `bun install`)
4. Clique em **Deploy**

### SPA Routing (importante!)

Para que rotas como `/obrigado` funcionem corretamente, crie o arquivo `vercel.json` na raiz do projeto:

```json
{
  "rewrites": [
    { "source": "/((?!api/).*)", "destination": "/index.html" }
  ]
}
```

> Isso garante que todas as rotas do React Router sejam tratadas pelo `index.html`, enquanto rotas `/api/*` são reservadas para Serverless Functions.

---

## 2. Google Tag Manager (GTM)

### Onde instalar

**Arquivo:** `index.html`

Adicione o snippet do GTM em dois locais:

```html
<!-- index.html -->
<head>
  <!-- ... metas existentes ... -->

  <!-- Google Tag Manager -->
  <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-XXXXXXX');
  </script>
  <!-- Fim Google Tag Manager -->
</head>
```

```html
<body>
  <!-- Google Tag Manager (noscript) -->
  <noscript>
    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>
  </noscript>
  <!-- Fim Google Tag Manager (noscript) -->

  <div id="root"></div>
  <!-- ... -->
</body>
```

> ⚠️ Substitua `GTM-XXXXXXX` pelo seu ID do GTM.

---

## 3. Google Ads — Tag de Conversão

A tag de conversão deve disparar quando o usuário é redirecionado para `/obrigado`.

### Opção A: Via GTM (Recomendado)

1. No GTM, crie uma **Tag** do tipo **Google Ads Conversion Tracking**
2. Preencha:
   - **Conversion ID:** `AW-XXXXXXXXX`
   - **Conversion Label:** `XXXXXXXXXXX`
3. Configure o **Acionador (Trigger):**
   - Tipo: **Page View**
   - Condição: `Page Path` **contém** `/obrigado`
4. Publique o contêiner

### Opção B: Diretamente no código

**Arquivo:** `index.html` (adicionar no `<head>`)

```html
<!-- Global site tag (gtag.js) - Google Ads -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-XXXXXXXXX');
</script>
```

**Arquivo:** `src/pages/Obrigado.tsx`

```tsx
useEffect(() => {
  // Google Ads Conversion
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'conversion', {
      send_to: 'AW-XXXXXXXXX/XXXXXXXXXXX',
      value: 1.0,
      currency: 'BRL',
    });
  }
}, []);
```

> ⚠️ Substitua `AW-XXXXXXXXX` e o label pelo seu ID real do Google Ads.

---

## 4. Google Ads — Tag de Remarketing

### Via GTM (Recomendado)

1. No GTM, crie uma **Tag** do tipo **Google Ads Remarketing**
2. Preencha o **Conversion ID:** `AW-XXXXXXXXX`
3. Configure o **Acionador:** **All Pages**
4. Publique

### Diretamente no código

Já é ativada automaticamente se o `gtag('config', 'AW-XXXXXXXXX')` estiver no `index.html` (veja seção 3).

---

## 5. Google Analytics 4 (GA4)

### Via GTM

1. Crie uma tag **Google Analytics: GA4 Configuration**
2. Preencha o **Measurement ID:** `G-XXXXXXXXXX`
3. Acionador: **All Pages**
4. Para rastrear conversão:
   - Crie uma tag **GA4 Event** com nome `generate_lead`
   - Acionador: **Page View** em `/obrigado`

### Diretamente no código

**Arquivo:** `index.html`

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**Arquivo:** `src/pages/Obrigado.tsx` (evento de conversão)

```tsx
useEffect(() => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      event_category: 'conversao',
      event_label: 'whatsapp_redirect',
    });
  }
}, []);
```

---

## 6. Meta Pixel (Facebook)

### Pixel Base

**Arquivo:** `index.html` (no `<head>`)

```html
<!-- Meta Pixel Code -->
<script>
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  fbq('init', 'XXXXXXXXXXXXXXXX');
  fbq('track', 'PageView');
</script>
<noscript>
  <img height="1" width="1" style="display:none"
    src="https://www.facebook.com/tr?id=XXXXXXXXXXXXXXXX&ev=PageView&noscript=1"/>
</noscript>
<!-- End Meta Pixel Code -->
```

> ⚠️ Substitua `XXXXXXXXXXXXXXXX` pelo seu Pixel ID.

### Evento de Conversão (Lead)

**Arquivo:** `src/pages/Obrigado.tsx`

```tsx
useEffect(() => {
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: 'WhatsApp Desconto',
      content_category: 'B2B Coffee',
    });
  }
}, []);
```

### Evento de clique no CTA (opcional)

**Arquivo:** `src/components/landing/HeroSection.tsx` e `OfferRulesSection.tsx`

No `onClick` do botão, antes do `navigate`:

```tsx
if (typeof window.fbq === 'function') {
  window.fbq('track', 'InitiateCheckout');
}
```

---

## 7. API de Conversões da Meta (CAPI)

A CAPI envia eventos do **servidor** para a Meta, complementando o Pixel. Na Vercel, usamos **Serverless Functions** em vez de Supabase Edge Functions.

### Pré-requisitos

1. Acesse o [Gerenciador de Eventos da Meta](https://business.facebook.com/events_manager)
2. Selecione seu Pixel → **Configurações** → **API de Conversões**
3. Gere um **Token de Acesso** (Access Token)
4. Anote o **Pixel ID**

### Passo 1: Configurar variáveis de ambiente na Vercel

Veja a [seção 8](#8-variáveis-de-ambiente-na-vercel) para adicionar:
- `META_PIXEL_ID`
- `META_CAPI_TOKEN`

### Passo 2: Criar Serverless Function

Crie o arquivo `api/meta-capi.ts` na **raiz do projeto** (não dentro de `src/`):

```ts
// api/meta-capi.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    return res.status(500).json({ error: 'Missing Meta credentials' });
  }

  const { event_name, event_id, event_time, user_data, custom_data } = req.body;

  const payload = {
    data: [
      {
        event_name,
        event_id,
        event_time: event_time || Math.floor(Date.now() / 1000),
        action_source: 'website',
        user_data: {
          client_ip_address:
            (req.headers['x-forwarded-for'] as string)?.split(',')[0] || '',
          client_user_agent: req.headers['user-agent'] || '',
          ...user_data,
        },
        custom_data,
      },
    ],
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send event to Meta' });
  }
}
```

> 💡 A Vercel detecta automaticamente arquivos em `/api` como Serverless Functions. Não é necessário configuração adicional.

### Passo 3: Chamar a CAPI do front-end

**Arquivo:** `src/pages/Obrigado.tsx`

```tsx
useEffect(() => {
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_name: 'Lead',
      custom_data: {
        content_name: 'WhatsApp Desconto',
        content_category: 'B2B Coffee',
      },
    }),
  }).catch(console.error);
}, []);
```

> Note que o endpoint mudou de `/functions/v1/meta-capi` para `/api/meta-capi` (padrão Vercel).

### Deduplicação Pixel + CAPI

Para evitar eventos duplicados, use o mesmo `event_id` tanto no Pixel quanto na CAPI:

```tsx
const eventId = crypto.randomUUID();

// Pixel (client-side)
fbq('track', 'Lead', { content_name: 'WhatsApp Desconto' }, { eventID: eventId });

// CAPI (server-side)
fetch('/api/meta-capi', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    event_name: 'Lead',
    event_id: eventId,
    custom_data: { content_name: 'WhatsApp Desconto' },
  }),
});
```

---

## 8. Variáveis de Ambiente na Vercel

A Vercel permite armazenar segredos de forma segura como **Environment Variables**.

### Como adicionar

1. Acesse o **Dashboard da Vercel** → seu projeto
2. Vá em **Settings** → **Environment Variables**
3. Adicione as variáveis:

| Nome | Valor | Ambientes |
|---|---|---|
| `META_PIXEL_ID` | Seu Pixel ID | Production, Preview |
| `META_CAPI_TOKEN` | Seu Access Token | Production, Preview |

4. Clique em **Save**
5. **Faça um redeploy** para que as variáveis sejam aplicadas (Settings → Deployments → Redeploy)

> ⚠️ Variáveis de ambiente da Vercel **só estão disponíveis em Serverless Functions** (`/api/*`). Elas **NÃO** ficam acessíveis no front-end (browser). Isso é intencional para segurança.

### Variáveis públicas (front-end)

Se precisar de uma variável acessível no front-end (ex: Pixel ID para o snippet), use o prefixo `VITE_`:

```
VITE_META_PIXEL_ID=123456789
```

Acessível no código com:

```ts
const pixelId = import.meta.env.VITE_META_PIXEL_ID;
```

> Porém, para o Meta Pixel, é mais simples colocar o ID diretamente no `index.html`.

---

## 9. Estrutura de Eventos

| Página / Ação | Google Ads | GA4 | Meta Pixel | Meta CAPI |
|---|---|---|---|---|
| Qualquer página (pageview) | Remarketing | `page_view` | `PageView` | — |
| Clique no CTA | — | `initiate_checkout` | `InitiateCheckout` | — |
| Página `/obrigado` | `conversion` | `generate_lead` | `Lead` | `Lead` |

---

## 10. Checklist Final

### Deploy & Infra
- [ ] Projeto importado na Vercel com **Framework Preset: Vite**
- [ ] `vercel.json` com rewrite para SPA routing
- [ ] Variáveis de ambiente configuradas na Vercel

### Google
- [ ] **GTM** instalado no `index.html` (head + body)
- [ ] **Google Ads Conversion** disparando em `/obrigado`
- [ ] **Google Ads Remarketing** em todas as páginas
- [ ] **GA4** configurado com Measurement ID
- [ ] **GA4 Event** `generate_lead` na página `/obrigado`

### Meta
- [ ] **Meta Pixel** base instalado no `index.html`
- [ ] **Meta Pixel** evento `Lead` na página `/obrigado`
- [ ] **Meta CAPI** serverless function em `/api/meta-capi`
- [ ] **Deduplicação** Pixel + CAPI com `event_id`

### Testes
- [ ] Testar com [Google Tag Assistant](https://tagassistant.google.com/)
- [ ] Testar com [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) (extensão Chrome)
- [ ] Testar eventos no [Gerenciador de Eventos da Meta](https://business.facebook.com/events_manager) → Test Events
- [ ] Verificar na Vercel: **Functions** tab → confirmar que `/api/meta-capi` aparece
- [ ] Testar rota `/obrigado` no domínio de produção

---

## Tipos TypeScript (opcional)

Para evitar erros de TypeScript ao usar `window.gtag` e `window.fbq`, adicione ao arquivo `src/vite-env.d.ts`:

```ts
interface Window {
  gtag: (...args: any[]) => void;
  fbq: (...args: any[]) => void;
  dataLayer: any[];
}
```

Para usar tipos do `@vercel/node` na Serverless Function:

```bash
npm install -D @vercel/node
```

---

## Estrutura de Arquivos Relevante

```
├── api/
│   └── meta-capi.ts          ← Serverless Function (CAPI)
├── docs/
│   └── TRACKING_SETUP.md     ← Esta documentação
├── index.html                 ← GTM, gtag.js, Meta Pixel
├── src/
│   ├── components/landing/
│   │   ├── HeroSection.tsx    ← fbq('InitiateCheckout') no CTA
│   │   └── OfferRulesSection.tsx
│   ├── pages/
│   │   └── Obrigado.tsx       ← Eventos de conversão (gtag + fbq + CAPI)
│   └── vite-env.d.ts          ← Tipos Window
├── vercel.json                ← SPA rewrite + API routing
└── package.json
```

---

> **⚠️ Segurança:** Nunca armazene tokens ou chaves privadas no código-fonte. Use sempre as **Environment Variables** da Vercel para dados sensíveis como o Meta CAPI Token.
