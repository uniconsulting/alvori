export const fleet = {
  summary: [
    '15 тягачей',
    '15 полуприцепов',
    'возраст сцепок до 5 лет',
    'adr и техническая комплектность',
  ],
  tractors: {
    title: 'тягачи',
    brands: ['DAF', 'SCANIA', 'MERCEDES', 'MAN'],
    bullets: ['возраст сцепок ≤ 5 лет', 'регулярное то и проверки', 'adr лицензии и комплектность'],
  },
  trailers: {
    title: 'полуприцепы',
    brands: ['KRONE', 'SCHMITZ', 'ТОНАР'],
    bullets: ['тенты 90–110 м³', 'тенты — 16 м', 'рефрижераторы'],
  },
} as const;
