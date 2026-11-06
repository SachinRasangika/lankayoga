export interface InquiryPayload {
  subject: string;
  replyTo?: string;
  fields: Record<string, string>;
}

export async function sendInquiry(payload: InquiryPayload): Promise<void> {
  const response = await fetch('/api/inquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    let message = 'The message could not be sent. Please call 077 610 8200.';
    try {
      const data = await response.json() as { error?: string };
      if (data.error) message = data.error;
    } catch {
      // The server did not return JSON.
    }
    throw new Error(message);
  }
}
