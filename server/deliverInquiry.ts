import nodemailer from 'nodemailer';

function textField(value: unknown, max = 2000): string {
  return String(value ?? '').trim().slice(0, max);
}

export async function deliverInquiry(
  env: Record<string, string | undefined>,
  body: unknown
): Promise<{ status: number; payload: { ok?: true; error?: string } }> {
  const user = env.SMTP_USER;
  const pass = (env.SMTP_PASS ?? '').replace(/\s+/g, '');
  const to = env.INQUIRY_TO;

  if (!user || !pass || !to) {
    return { status: 500, payload: { error: 'Email is not configured on the server.' } };
  }

  const message = body && typeof body === 'object' ? body as { subject?: unknown; replyTo?: unknown; fields?: unknown } : {};
  const subject = textField(message.subject, 180) || 'Website inquiry';
  const replyTo = textField(message.replyTo, 180);
  const fields = message.fields && typeof message.fields === 'object' ? message.fields as Record<string, unknown> : {};
  const lines = Object.entries(fields)
    .map(([label, value]) => [textField(label, 80), textField(value)] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`);

  if (!lines.length) {
    return { status: 400, payload: { error: 'Please add a few details before sending.' } };
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

  return { status: 200, payload: { ok: true } };
}
