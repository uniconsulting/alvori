import { sitePath } from '@/lib/site-path';

function preloadImage(src: string): Promise<void> {
  return new Promise((resolve) => {
    const img = new Image();

    img.onload = () => resolve();
    img.onerror = () => resolve();
    img.src = src;

    if (img.decode) {
      img.decode().then(resolve).catch(resolve);
    }
  });
}

async function preloadAsset(src: string): Promise<void> {
  const normalized = src.toLowerCase();

  if (
    normalized.endsWith('.png') ||
    normalized.endsWith('.jpg') ||
    normalized.endsWith('.jpeg') ||
    normalized.endsWith('.webp') ||
    normalized.endsWith('.gif') ||
    normalized.endsWith('.svg')
  ) {
    await preloadImage(src);
    return;
  }

  try {
    await fetch(src, { cache: 'force-cache' });
  } catch {
    // Игнорируем ошибки предзагрузки, чтобы не стопорить вход.
  }
}

const HEADER_ASSETS = [
  `${sitePath}/brand/header/light/logo.svg`,
  `${sitePath}/brand/header/dark/logo.svg`,
  `${sitePath}/brand/header/light/logo.png`,
  `${sitePath}/brand/header/dark/logo.png`,
];

const HERO_RIGHT_SCENE_ASSETS = [
  `${sitePath}/hero/cards/request.webp`,
  `${sitePath}/hero/cards/calc.webp`,
  `${sitePath}/hero/cards/principles.webp`,
];

/**
 * Сюда добавь фактические пути из HeroLeftScene.tsx,
 * если там используются отдельные svg/png/webp ассеты из public.
 */
const HERO_LEFT_SCENE_ASSETS: string[] = [];

/**
 * Экран загрузки всегда светлый, поэтому логотип берём только light.
 */
const INTRO_ASSETS = [
  `${sitePath}/brand/footer/light/logo.png`,
];

export async function preloadHomeAssets(
  onProgress?: (progress: number) => void,
): Promise<void> {
  const assets = Array.from(
    new Set([
      ...INTRO_ASSETS,
      ...HEADER_ASSETS,
      ...HERO_RIGHT_SCENE_ASSETS,
      ...HERO_LEFT_SCENE_ASSETS,
    ]),
  );

  if (assets.length === 0) {
    onProgress?.(100);
    return;
  }

  let loaded = 0;
  onProgress?.(0);

  await Promise.all(
    assets.map(async (src) => {
      await preloadAsset(src);
      loaded += 1;
      onProgress?.(Math.round((loaded / assets.length) * 100));
    }),
  );

  onProgress?.(100);
}
