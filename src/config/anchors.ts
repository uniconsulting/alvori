import { sitePath } from '@/lib/site-path';

const root = sitePath || '';

export const homeAnchorIds = {
  services: 'services',
  about: 'about',
  geography: 'geography',
  fleet: 'fleet',
  contacts: 'contacts',
} as const;

export const homeAnchorHrefs = {
  services: `${root}/?scene=services`,
  about: `${root}/?scene=about`,
  geography: `${root}/#${homeAnchorIds.geography}`,
  fleet: `${root}/#${homeAnchorIds.fleet}`,
  contacts: `#${homeAnchorIds.contacts}`,
} as const;

export const homeNavigation = [
  { label: 'услуги', href: homeAnchorHrefs.services },
  { label: 'о компании', href: homeAnchorHrefs.about },
  { label: 'география', href: homeAnchorHrefs.geography },
  { label: 'автопарк', href: homeAnchorHrefs.fleet },
  { label: 'контакты', href: `${root}/contacts` },
] as const;
