import type { NextApiRequest, NextApiResponse } from 'next';

type SubscribeRequestBody = {
  email?: string;
  pageUri?: string;
  pageName?: string;
  hcaptchaToken?: string;
};

type SubscribeResponse = {
  ok: boolean;
  message: string;
};

const portalId = process.env.HUBSPOT_PORTAL_ID;
const formGuid = process.env.HUBSPOT_SUBSCRIBE_FORM_GUID;
const allowedHostnames = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((s) => s.trim().toLowerCase())
  .filter(Boolean);

// naive in-memory rate limiter (best-effort; use durable store in production)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per IP per window
const ipHits = new Map<string, { count: number; windowStart: number }>();

function isEmailValid(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email) && email.length <= 254;
}

function getClientIp(req: NextApiRequest): string {
  const xff = (req.headers['x-forwarded-for'] as string) || '';
  const ip = xff.split(',')[0]?.trim() || (req.socket.remoteAddress || 'unknown');
  return ip;
}

function checkRateLimit(req: NextApiRequest): boolean {
  const ip = getClientIp(req);
  const now = Date.now();
  const entry = ipHits.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    ipHits.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

async function verifyHcaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return true; // verification disabled if not configured
  if (!token) return false;
  try {
    const resp = await fetch('https://hcaptcha.com/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await resp.json()) as { success?: boolean };
    return !!data.success;
  } catch {
    return false;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<SubscribeResponse>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, message: 'Method not allowed' });
  }

  if (!portalId || !formGuid) {
    return res.status(500).json({ ok: false, message: 'Server not configured' });
  }

  // Basic origin guard
  const origin = (req.headers.origin as string) || '';
  if (process.env.NODE_ENV === 'production' && allowedHostnames.length > 0) {
    try {
      if (origin) {
        const originUrl = new URL(origin);
        const hostname = originUrl.hostname.toLowerCase();
        if (!allowedHostnames.includes(hostname)) {
          return res.status(403).json({ ok: false, message: 'Invalid origin' });
        }
      }
    } catch {
      return res.status(403).json({ ok: false, message: 'Invalid origin' });
    }
  }

  if (!checkRateLimit(req)) {
    return res.status(429).json({ ok: false, message: 'Too many requests' });
  }

  const { email, pageUri, pageName, hcaptchaToken } = (req.body || {}) as SubscribeRequestBody;
  if (!email || !isEmailValid(email)) {
    return res.status(400).json({ ok: false, message: 'Invalid email' });
  }

  const captchaOk = await verifyHcaptcha(hcaptchaToken);
  if (!captchaOk) {
    return res.status(400).json({ ok: false, message: 'Captcha verification failed' });
  }

  // Build hsforms.com V3 integration payload
  const submissionBody = {
    fields: [
      { name: 'email', value: email },
    ],
    context: {
      pageUri: pageUri || '',
      pageName: pageName || 'Footer Subscribe',
      // Optionally include tracking cookie if present
      hutk: (req.cookies && (req.cookies.hubspotutk as string)) || undefined,
    },
  } as const;

  try {
    const resp = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionBody),
    });

    if (!resp.ok) {
      const text = await resp.text();
      return res.status(502).json({ ok: false, message: text || 'HubSpot submission failed' });
    }

    return res.status(200).json({ ok: true, message: 'Subscribed' });
  } catch (e) {
    return res.status(500).json({ ok: false, message: 'Unexpected error' });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
};


