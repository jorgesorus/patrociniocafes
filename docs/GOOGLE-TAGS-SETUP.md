# Guia de Instalação — Google Analytics 4 (GA4) e Google Ads Tags

## Pré-requisitos

1. Conta no [Google Analytics](https://analytics.google.com/)
2. Conta no [Google Ads](https://ads.google.com/) (opcional, para conversões de anúncios)
3. Acesso ao código do projeto (GitHub)

---

## 1. Obter os IDs

### Google Analytics 4 (GA4)
1. Acesse **Google Analytics → Administrador → Fluxos de dados → Web**
2. Copie o **ID de mensuração** (formato: `G-XXXXXXXXXX`)

### Google Ads (opcional)
1. Acesse **Google Ads → Ferramentas → Conversões**
2. Crie uma nova conversão do tipo **Website**
3. Copie o **Conversion ID** (formato: `AW-XXXXXXXXXX`) e o **Conversion Label**

---

## 2. Adicionar o gtag.js ao `index.html`

Abra `index.html` e adicione **antes do `</head>`**:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SEU_ID_AQUI');

  // Se tiver Google Ads, adicione também:
  // gtag('config', 'AW-SEU_CONVERSION_ID');
</script>
<!-- End Google tag -->
```

> Substitua `G-SEU_ID_AQUI` pelo seu ID de mensuração do GA4.

---

## 3. Disparar evento de conversão na página `/obrigado`

Abra `src/pages/Obrigado.tsx` e adicione no `useEffect`:

```tsx
// Declaração de tipo (adicionar no topo do arquivo)
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

// Dentro do useEffect existente, antes do timer:
if (window.gtag) {
  // Evento GA4
  window.gtag("event", "generate_lead", {
    event_category: "conversion",
    event_label: "whatsapp_redirect",
    value: 1,
  });

  // Evento Google Ads (se tiver)
  // window.gtag("event", "conversion", {
  //   send_to: "AW-SEU_CONVERSION_ID/SEU_CONVERSION_LABEL",
  // });
}
```

---

## 4. (Opcional) Rastrear cliques nos CTAs

Em qualquer botão CTA importante, adicione:

```tsx
const handleCTAClick = () => {
  if (window.gtag) {
    window.gtag("event", "cta_click", {
      event_category: "engagement",
      event_label: "solicitar_orcamento",
    });
  }
  // ... navegação existente
};
```

---

## 5. Deploy na Vercel

Não é necessária nenhuma configuração extra na Vercel. Basta fazer o deploy normalmente — os scripts serão carregados diretamente do `index.html`.

---

## 6. Verificar instalação

### GA4
1. Acesse **Google Analytics → Relatórios → Tempo real**
2. Abra o site em outra aba e navegue
3. Você deve ver o tráfego em tempo real

### Google Ads
1. Acesse **Google Ads → Ferramentas → Conversões**
2. O status deve mudar para "Registrando conversões" após a primeira conversão

### Ferramenta de diagnóstico
- Instale a extensão [Google Tag Assistant](https://tagassistant.google.com/) no Chrome
- Acesse o site e verifique se as tags estão disparando corretamente

---

## Resumo dos arquivos modificados

| Arquivo | Alteração |
|---------|-----------|
| `index.html` | Adicionar script gtag.js |
| `src/pages/Obrigado.tsx` | Adicionar evento `generate_lead` e conversão Google Ads |

---

## Dúvidas?

Envie os IDs (GA4 e/ou Google Ads) no chat do Lovable e a instalação será feita automaticamente.
