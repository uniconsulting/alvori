export const homeAnchorIds = {
  services: 'services',
  about: 'about',
  geography: 'geography',
  fleet: 'fleet',
  contacts: 'contacts',
} as const;

export const homeAnchorHrefs = {
  services: '/?scene=services',
  about: '/?scene=about',
  geography: `/#${homeAnchorIds.geography}`,
  fleet: `/#${homeAnchorIds.fleet}`,
  contacts: `#${homeAnchorIds.contacts}`,
} as const;

export const homeNavigation = [
  { label: 'услуги', href: homeAnchorHrefs.services },
  { label: 'о компании', href: homeAnchorHrefs.about },
  { label: 'география', href: homeAnchorHrefs.geography },
  { label: 'автопарк', href: homeAnchorHrefs.fleet },
  { label: 'контакты', href: '/contacts' },
] as const;
