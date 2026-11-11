export const publicNav = [
  { to: '/teacher-training', label: 'Teacher Training' },
  {
    label: 'Retreats',
    children: [
      { to: '/retreats', label: 'All dates' },
      { to: '/yoga', label: 'Yoga' },
      { to: '/ayurveda', label: 'Ayurveda' }
    ]
  },
  { to: '/classes', label: 'Classes' },
  { to: '/treatments', label: 'Treatments' },
  { to: '/campus', label: 'Campus & Hire' },
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
  '/teacher-training',
  '/retreats',
  '/yoga',
  '/ayurveda',
  '/classes',
  '/treatments',
  '/campus',
  '/book',
  '/journal',
  '/contact'
];

const immersivePrefixes = ['/journal/', '/yoga/', '/ayurveda/', '/classes/', '/treatments/'];

export function isImmersivePath(pathname: string): boolean {
  return immersiveRoutes.includes(pathname) || immersivePrefixes.some((prefix) => pathname.startsWith(prefix));
}
