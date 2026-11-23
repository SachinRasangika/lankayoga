import nodemailer from 'nodemailer';
import type { IncomingMessage, ServerResponse } from 'node:http';

function textField(value: unknown, max = 2000): string {
  return String(value ?? '').trim().slice(0, max);
}

function readBody(req: IncomingMessage): Promise<unknown> {
  const current = (req as IncomingMessage & { body?: unknown }).body;
  if (current && typeof current === 'object') return Promise.resolve(current);
  if (typeof current === 'string') {
    try {
      return Promise.resolve(JSON.parse(current || '{}'));
    } catch {
      return Promise.reject(new Error('Could not read that message.'));
    }
  }

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > 20_000) {
        reject(new Error('Message is too long.'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'));
      } catch {
        reject(new Error('Could not read that message.'));
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const send = (status: number, payload: unknown) => {
    res.statusCode = status;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(payload));
  };

  if (req.method !== 'POST') {
    send(405, { error: 'Method not allowed.' });
    return;
  }

  const user = process.env.SMTP_USER;
  const pass = (process.env.SMTP_PASS ?? '').replace(/\s+/g, '');
  const to = process.env.INQUIRY_TO;
  if (!user || !pass || !to) {
    send(500, { error: 'Email is not configured on the server.' });
    return;
  }

  try {
    const body = await readBody(req);
    const message = body && typeof body === 'object' ? body as { subject?: unknown; replyTo?: unknown; fields?: unknown } : {};
    const subject = textField(message.subject, 180) || 'Website inquiry';
    const replyTo = textField(message.replyTo, 180);
    const fields = message.fields && typeof message.fields === 'object' ? message.fields as Record<string, unknown> : {};
    const lines = Object.entries(fields)
      .map(([label, value]) => [textField(label, 80), textField(value)] as const)
      .filter(([, value]) => value)
      .map(([label, value]) => `${label}: ${value}`);

    if (!lines.length) {
      send(400, { error: 'Please add a few details before sending.' });
      return;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass }
    });
    await transporter.sendMail({
      from: `Lanka Yoga website <${user}>`,
      to,
      replyTo: replyTo.includes('@') ? replyTo : undefined,
      subject,
      text: lines.join('\n')
    });
    send(200, { ok: true });
  } catch (error) {
    console.error('Inquiry email failed:', error);
    send(500, {
      error: error instanceof Error && error.message === 'Message is too long.'
        ? 'That message is too long.'
        : 'The message could not be sent. Please call us instead.'
    });
  }
}
