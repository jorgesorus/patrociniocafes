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
