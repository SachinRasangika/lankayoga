/** Canonical NAP for Google Business / local SEO. Keep in sync with the live listing. */
export const business = {
  name: 'Lanka Yoga & Ayurveda Resort',
  alternateName: 'Lanka Yoga And Ayurveda Resort',
  legalName: 'Lanka Yoga & Ayurveda Resort',
  url: 'https://lankayogaayurveda.com/',
  email: 'lankayogaayurvedaresort@gmail.com',
  telephone: '+94776108200',
  telephoneDisplay: '077 610 8200',
  whatsapp: 'https://wa.me/94776108200',
  streetAddress: '25/1 Lionel Gunasinghe Road, Sarath Goonawardana Mawatha',
  addressLocality: 'Hikkaduwa',
  addressRegion: 'Southern Province',
  postalCode: '80240',
  addressCountry: 'LK',
  addressCountryName: 'Sri Lanka',
  latitude: 6.135051,
  longitude: 80.102429,
  priceRange: '$$',
  numberOfRooms: 7,
  sameAs: ['https://bookretreats.com/centers/c/lanka-yoga-and-ayurveda-resort'],
  image: 'https://lankayogaayurveda.com/5b0ddfcc-5015-4d2e-9e1a-35d7993d4cef_removalai_preview.png',
  keywords: ['yoga retreat Hikkaduwa', 'Ayurveda Hikkaduwa', 'yoga and Ayurveda resort Hikkaduwa']
} as const;

export const businessAddressLine = `${business.streetAddress}, ${business.addressLocality} ${business.postalCode}, ${business.addressCountryName}`;

export const businessMapsQuery = `${business.name}, ${business.streetAddress}, ${business.addressLocality} ${business.postalCode}`;

export const businessMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessMapsQuery)}`;

export const businessMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(businessMapsQuery)}&z=16&hl=en&output=embed`;

export const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LodgingBusiness', 'HealthAndBeautyBusiness'],
  '@id': `${business.url}#business`,
  name: business.name,
  alternateName: business.alternateName,
  url: business.url,
  image: business.image,
  logo: business.image,
  email: business.email,
  telephone: business.telephone,
  priceRange: business.priceRange,
  description:
    'Lanka Yoga & Ayurveda Resort is a yoga retreat in Hikkaduwa, Sri Lanka, with Ayurveda treatments, daily yoga, and seven quiet rooms a short walk from the beach.',
  knowsAbout: ['yoga retreat Hikkaduwa', 'Ayurveda', 'Panchakarma', 'yoga therapy', 'sound healing'],
  numberOfRooms: business.numberOfRooms,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.streetAddress,
    addressLocality: business.addressLocality,
    addressRegion: business.addressRegion,
    postalCode: business.postalCode,
    addressCountry: business.addressCountry
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: business.latitude,
    longitude: business.longitude
  },
  hasMap: businessMapsUrl,
  areaServed: {
    '@type': 'City',
    name: 'Hikkaduwa'
  },
  sameAs: [...business.sameAs],
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'reservations',
      telephone: business.telephone,
      email: business.email,
      areaServed: 'LK',
      availableLanguage: ['English', 'Sinhala']
    }
  ]
};
