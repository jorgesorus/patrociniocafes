import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL =
  "https://wa.me/5562998707805?text=Oi%2C%20gostaria%20de%20um%20or%C3%A7amento";

// Código de teste do Meta Events Manager — REMOVER APÓS TESTE
const TEST_EVENT_CODE = "TEST86637";

/** Lê um cookie pelo nome */
function getCookie(name: string): string | undefined {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : undefined;
}

/** Gera ou recupera um external_id persistente */
function getExternalId(): string {
  const key = '_patrocinio_eid';
  let eid = localStorage.getItem(key);
  if (!eid) {
    eid = crypto.randomUUID();
    localStorage.setItem(key, eid);
  }
  return eid;
}

/** Separa nome completo em primeiro nome e sobrenome */
function splitName(fullName: string): { fn: string; ln: string } {
  const parts = fullName.trim().toLowerCase().split(/\s+/);
  const fn = parts[0] || '';
  const ln = parts.length > 1 ? parts.slice(1).join(' ') : '';
  return { fn, ln };
}

const Obrigado = () => {
  useEffect(() => {
    const eventId = crypto.randomUUID();

    // Capturar cookies do Meta para deduplicação
    const fbp = getCookie('_fbp');
    const fbc = getCookie('_fbc');

    // Recuperar dados do lead do sessionStorage
    let leadData = { nome: '', email: '', whatsapp: '' };
    try {
      const stored = sessionStorage.getItem('lead_data');
      if (stored) {
        leadData = JSON.parse(stored);
        // Limpar para não reenviar em refresh
        sessionStorage.removeItem('lead_data');
      }
    } catch (e) {
      console.error('Erro ao ler lead_data:', e);
    }

    // Separar nome em primeiro nome e sobrenome
    const { fn, ln } = splitName(leadData.nome);

    // External ID persistente para matching
    const externalId = getExternalId();

    const capiPayload = JSON.stringify({
      event_name: 'Contact',
      event_id: eventId,
      event_source_url: window.location.href,
      user_agent: navigator.userAgent,
      fbp: fbp || '',
      fbc: fbc || '',
      test_event_code: TEST_EVENT_CODE,
      // Dados do lead para melhorar qualidade de matching
      // O hashing SHA256 será feito no SERVIDOR (meta-capi.ts)
      lead: {
        em: leadData.email.trim().toLowerCase(),
        ph: leadData.whatsapp, // já formatado como 5562999999999
        fn: fn,
        ln: ln,
        external_id: externalId,
        country: 'br',
        st: 'go', // Goiás — principal mercado
      },
      custom_data: {
        content_name: 'WhatsApp Desconto',
        content_category: 'B2B Coffee',
      },
    });

    // Estratégia 1: sendBeacon (garante envio mesmo com navegação)
    const beaconSent = navigator.sendBeacon('/api/meta-capi', new Blob([capiPayload], { type: 'application/json' }));

    // Estratégia 2: fetch como fallback (se sendBeacon falhar)
    if (!beaconSent) {
      fetch('/api/meta-capi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: capiPayload,
        keepalive: true,
      }).catch(console.error);
    }

    // Meta Pixel - Contact Event (client-side) com Advanced Matching
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'Contact', {
        content_name: 'WhatsApp Desconto',
        content_category: 'B2B Coffee',
      }, { eventID: eventId });
    }

    // Redirecionar para WhatsApp após 3 segundos
    const timer = setTimeout(() => {
      window.location.href = WHATSAPP_URL;
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 animate-pulse-soft">
          <MessageCircle className="h-10 w-10 text-primary" />
        </div>
        <p className="text-xl md:text-2xl font-heading font-semibold text-foreground max-w-md">
          Redirecionando para o nosso WhatsApp para liberar o seu desconto...
        </p>
        <div className="flex justify-center gap-1.5 pt-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-soft"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default Obrigado;
