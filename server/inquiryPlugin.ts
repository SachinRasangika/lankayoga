import type { IncomingMessage, ServerResponse } from 'node:http';
import type { Plugin } from 'vite';
import { deliverInquiry } from './deliverInquiry';

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

export function inquiryPlugin(env: Record<string, string>): Plugin {
  async function handle(req: IncomingMessage, res: ServerResponse) {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.end(JSON.stringify({ error: 'Method not allowed.' }));
      return;
    }

    try {
      const result = await deliverInquiry(env, await readBody(req));
      res.statusCode = result.status;
      res.end(JSON.stringify(result.payload));
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
