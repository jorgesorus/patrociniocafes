// api/meta-capi.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
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
  } = req.body;

  // Montar user_data com IP e User-Agent do request real
  const clientIp = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || '';
  const clientUa = user_agent || req.headers['user-agent'] || '';

  // Aceitar fbp/fbc tanto do nível raiz quanto de user_data (compatibilidade)
  const finalFbp = fbp || user_data?.fbp || '';
  const finalFbc = fbc || user_data?.fbc || '';

  const userData: Record<string, string> = {
    client_ip_address: clientIp,
    client_user_agent: clientUa,
  };

  // Só incluir fbp/fbc se tiverem valor (evitar enviar string vazia)
  if (finalFbp) userData.fbp = finalFbp;
  if (finalFbc) userData.fbc = finalFbc;

  const payload = {
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

  console.log('CAPI Payload:', JSON.stringify(payload, null, 2));

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
