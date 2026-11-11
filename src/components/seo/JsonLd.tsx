import { useEffect } from 'react';

export function JsonLd({ id, data }: { id: string; data: object }) {
  useEffect(() => {
    const existing = document.getElementById(id);
    existing?.remove();

    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [id, data]);

  return null;
}
