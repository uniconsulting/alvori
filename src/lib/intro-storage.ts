const INTRO_COOKIE_KEY = 'alvori_intro_cookie_accepted';

export function getIntroAccepted(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(INTRO_COOKIE_KEY) === '1';
}

export function setIntroAccepted(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(INTRO_COOKIE_KEY, '1');
}
