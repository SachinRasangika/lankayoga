import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { business, businessJsonLd } from '../data/business';
import { homepageCopy, mergeHomepageCopy, type ContactCopy, type HomepageCopy } from '../data/homepageCopy';
import { postToRow } from './cms';
import { supabase } from './supabase';

export const SITE_COPY_ID = 'site-homepage';

interface SiteCopyValue {
  copy: HomepageCopy;
  ready: boolean;
  saving: boolean;
  error: string | null;
  saved: boolean;
  setCopy: (copy: HomepageCopy) => void;
  save: (copy: HomepageCopy) => Promise<void>;
}

const SiteCopyContext = createContext<SiteCopyValue | null>(null);

function telephoneFromDisplay(display: string): string {
  const digits = display.replace(/\D/g, '');
  if (digits.startsWith('94')) return `+${digits}`;
  if (digits.startsWith('0')) return `+94${digits.slice(1)}`;
  return digits ? `+${digits}` : business.telephone;
}

export function resolveBusiness(contact: ContactCopy) {
  const telephone = telephoneFromDisplay(contact.telephoneDisplay);
  const next = {
    ...business,
    name: contact.name.trim() || business.name,
    legalName: contact.name.trim() || business.legalName,
    email: contact.email.trim() || business.email,
    telephoneDisplay: contact.telephoneDisplay.trim() || business.telephoneDisplay,
    telephone,
    whatsapp: `https://wa.me/${telephone.replace(/\D/g, '')}`,
    streetAddress: contact.streetAddress.trim() || business.streetAddress,
    addressLocality: contact.addressLocality.trim() || business.addressLocality,
    postalCode: contact.postalCode.trim() || business.postalCode
  };
  const addressLine = `${next.streetAddress}, ${next.addressLocality} ${next.postalCode}, ${next.addressCountryName}`;
  const mapsQuery = `${next.name}, ${next.streetAddress}, ${next.addressLocality} ${next.postalCode}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`;
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapsQuery)}&z=16&hl=en&output=embed`;
  const jsonLd = {
    ...businessJsonLd,
    name: next.name,
    email: next.email,
    telephone: next.telephone,
    hasMap: mapsUrl,
    address: {
      ...businessJsonLd.address,
      streetAddress: next.streetAddress,
      addressLocality: next.addressLocality,
      postalCode: next.postalCode
    },
    contactPoint: [
      {
        ...businessJsonLd.contactPoint[0],
        telephone: next.telephone,
        email: next.email
      }
    ]
  };
  return { business: next, addressLine, mapsUrl, mapsEmbedUrl, jsonLd };
}

export function SiteCopyProvider({ children }: { children: ReactNode }) {
  const [copy, setCopy] = useState<HomepageCopy>(homepageCopy);
  const [ready, setReady] = useState(!supabase);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    void supabase
      .from('posts')
      .select('body')
      .eq('id', SITE_COPY_ID)
      .maybeSingle()
      .then(({ data, error: loadError }) => {
        if (!active) return;
        if (loadError) {
          setError(loadError.message);
        } else if (data?.body) {
          try {
            setCopy(mergeHomepageCopy(JSON.parse(data.body)));
          } catch {
            setCopy(homepageCopy);
          }
        }
        setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  async function save(next: HomepageCopy) {
    if (!supabase) throw new Error('The database is not connected yet.');
    setSaving(true);
    setSaved(false);
    setError(null);
    const row = postToRow({
      id: SITE_COPY_ID,
      title: 'Homepage text',
      slug: SITE_COPY_ID,
      category: 'Website',
      excerpt: 'Hidden from the journal. This stores the homepage words.',
      body: JSON.stringify(next),
      readingMinutes: 1,
      date: new Date().toISOString().slice(0, 10),
      author: 'Staff',
      image: '',
      images: [],
      seoTitle: '',
      seoDescription: '',
      imageAlt: '',
      status: 'published'
    });
    const { error: saveError } = await supabase.from('posts').upsert(row);
    setSaving(false);
    if (saveError) {
      setError(saveError.message);
      throw saveError;
    }
    setCopy(next);
    setSaved(true);
  }

  const value = useMemo<SiteCopyValue>(
    () => ({ copy, ready, saving, error, saved, setCopy, save }),
    [copy, ready, saving, error, saved]
  );

  return <SiteCopyContext.Provider value={value}>{children}</SiteCopyContext.Provider>;
}

const fallback: SiteCopyValue = {
  copy: homepageCopy,
  ready: true,
  saving: false,
  error: null,
  saved: false,
  setCopy: () => undefined,
  save: async () => undefined
};

export function useSiteCopy() {
  return useContext(SiteCopyContext) ?? fallback;
}

export function useLiveBusiness() {
  const { copy } = useSiteCopy();
  return useMemo(() => resolveBusiness(copy.contact), [copy.contact]);
}
