export const sitePath =
  process.env.NODE_ENV === 'production' && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : '';

export const sitePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
