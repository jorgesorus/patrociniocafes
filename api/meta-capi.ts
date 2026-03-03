// api/meta-capi.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createHash } from 'crypto';

/** Hash SHA256 para dados pessoais (exigido pelo Meta) */
function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS para sendBeacon
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_CAPI_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.error('Missing META_PIXEL_ID or META_CAPI_TOKEN');
    return res.status(500).json({ error: 'Missing Meta credentials' });
  }

  const {
    event_name,
    event_id,
    event_time,
    event_source_url,
    user_agent,
    fbp,
    fbc,
    user_data,
    custom_data,
    test_event_code,
    lead,
  } = req.body;

  // IP e User-Agent do request real (capturados pelo servidor)
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || '';
  const clientUa = user_agent || req.headers['user-agent'] || '';

  // Aceitar fbp/fbc tanto do nível raiz quanto de user_data
  const finalFbp = fbp || user_data?.fbp || '';
  const finalFbc = fbc || user_data?.fbc || '';

  // Montar user_data com todos os parâmetros disponíveis
  const userData: Record<string, any> = {
    client_ip_address: clientIp,
    client_user_agent: clientUa,
  };

  // fbp e fbc — NÃO hashear
  if (finalFbp) userData.fbp = finalFbp;
  if (finalFbc) userData.fbc = finalFbc;

  // Dados do lead — hashear com SHA256 conforme exigido pelo Meta
  if (lead) {
    // email (em) — lowercase, trim, SHA256
    if (lead.em && lead.em.trim()) {
      userData.em = [sha256(lead.em.trim().toLowerCase())];
    }

    // phone (ph) — só dígitos, com código do país, SHA256
    if (lead.ph && lead.ph.trim()) {
      const phoneDigits = lead.ph.replace(/\D/g, '');
      if (phoneDigits.length >= 10) {
        userData.ph = [sha256(phoneDigits)];
      }
    }

    // first name (fn) — lowercase, SHA256
    if (lead.fn && lead.fn.trim()) {
      userData.fn = [sha256(lead.fn.trim().toLowerCase())];
    }

    // last name (ln) — lowercase, SHA256
    if (lead.ln && lead.ln.trim()) {
      userData.ln = [sha256(lead.ln.trim().toLowerCase())];
    }

    // external_id — SHA256 recomendado
    if (lead.external_id && lead.external_id.trim()) {
      userData.external_id = [sha256(lead.external_id.trim())];
    }

    // country — lowercase, SHA256
    if (lead.country && lead.country.trim()) {
      userData.country = [sha256(lead.country.trim().toLowerCase())];
    }

    // state (st) — lowercase, SHA256
    if (lead.st && lead.st.trim()) {
      userData.st = [sha256(lead.st.trim().toLowerCase())];
    }

    // city (ct) — lowercase, sem espaços, SHA256
    if (lead.ct && lead.ct.trim()) {
      userData.ct = [sha256(lead.ct.trim().toLowerCase().replace(/\s/g, ''))];
    }
  }

  const payload: Record<string, any> = {
    data: [
      {
        event_name: event_name || 'Contact',
        event_id: event_id || crypto.randomUUID(),
        event_time: event_time || Math.floor(Date.now() / 1000),
        event_source_url: event_source_url || 'https://www.patrociniodistribuidora.com/obrigado',
        action_source: 'website',
        user_data: userData,
        custom_data: custom_data || {},
      },
    ],
  };

  // Incluir test_event_code se fornecido
  if (test_event_code) {
    payload.test_event_code = test_event_code;
  }

  console.log('CAPI Payload enviado ao Meta:', JSON.stringify(payload, null, 2));

  try {
    const response = await fetch(
      `https://graph.facebook.com/v21.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();
    console.log('Meta CAPI Response:', JSON.stringify(result));

    if (!response.ok) {
      console.error('Meta CAPI Error:', result);
      return res.status(response.status).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error('CAPI fetch error:', error);
    return res.status(500).json({ error: 'Failed to send event to Meta' });
  }
}
