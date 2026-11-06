import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import nodemailer from 'nodemailer';

function readBody(req: IncomingMessage): Promise<unknown> {
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

function textField(value: unknown, max = 2000): string {
  return String(value ?? '').trim().slice(0, max);
}

export function inquiryPlugin(env: Record<string, string>): Plugin {
  const user = env.SMTP_USER;
  const pass = (env.SMTP_PASS ?? '').replace(/\s+/g, '');
  const to = env.INQUIRY_TO;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass }
  });

  async function handle(req: IncomingMessage, res: ServerResponse) {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method not allowed.' }));
      return;
    }
    if (!user || !pass || !to) {
      res.statusCode = 500;
      res.end(JSON.stringify({ error: 'Email is not configured on the server.' }));
      return;
    }

    try {
      const body = (await readBody(req)) as { subject?: unknown; replyTo?: unknown; fields?: unknown };
      const subject = textField(body.subject, 180) || 'Website inquiry';
      const replyTo = textField(body.replyTo, 180);
      const fields = body.fields && typeof body.fields === 'object' ? body.fields as Record<string, unknown> : {};
      const lines = Object.entries(fields)
        .map(([label, value]) => [textField(label, 80), textField(value)] as const)
        .filter(([, value]) => value)
        .map(([label, value]) => `${label}: ${value}`);

      if (!lines.length) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Please add a few details before sending.' }));
        return;
      }

      await transporter.sendMail({
        from: `Lanka Yoga website <${user}>`,
        to,
        replyTo: replyTo.includes('@') ? replyTo : undefined,
        subject,
        text: lines.join('\n')
      });
      res.statusCode = 200;
      res.end(JSON.stringify({ ok: true }));
    } catch (error) {
      console.error('Inquiry email failed:', error);
      res.statusCode = 500;
      res.end(JSON.stringify({
        error: error instanceof Error && error.message === 'Message is too long.'
          ? 'That message is too long.'
          : 'The message could not be sent. Please call us instead.'
      }));
    }
  }

  function attach(middlewares: { use: (path: string, handler: (req: IncomingMessage, res: ServerResponse) => void) => void }) {
    middlewares.use('/api/inquiry', (req, res) => {
      void handle(req, res);
    });
  }

  return {
    name: 'inquiry-api',
    configureServer(server) {
      attach(server.middlewares);
    },
    configurePreviewServer(server) {
      attach(server.middlewares);
    }
  };
}
