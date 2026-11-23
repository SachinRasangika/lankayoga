export const publicNav = [
  {
    label: 'Retreats',
    children: [
      { to: '/yoga', label: 'Yoga' },
      { to: '/ayurveda', label: 'Ayurveda' }
    ]
  },
  { to: '/classes', label: 'Classes' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/journal', label: 'Journal' },
  { to: '/contact', label: 'Contact' }
] as const;

export type PublicNavChild = {
  to: string;
  label: string;
};

export function footerNav(): PublicNavChild[] {
  return publicNav.flatMap((item): PublicNavChild[] =>
    'children' in item ? [...item.children] : [{ to: item.to, label: item.label }]
  );
}

export const immersiveRoutes = [
  '/',
  '/yoga',
  '/ayurveda',
  '/classes',
  '/treatments',
  '/journal',
  '/contact'
];

const immersivePrefixes = ['/journal/', '/yoga/', '/ayurveda/', '/classes/', '/treatments/'];

export function isImmersivePath(pathname: string): boolean {
  return immersiveRoutes.includes(pathname) || immersivePrefixes.some((prefix) => pathname.startsWith(prefix));
}
