const TOKEN_KEY = 'githubToken';

export const getToken = (): string | null => {
  try {
    return sessionStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export const saveToken = (token: string): void => {
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {
    // storage is unavailable, the token will live until the page is reloaded
  }
};

export const removeToken = (): void => {
  try {
    sessionStorage.removeItem(TOKEN_KEY);
  } catch {
    // storage is unavailable, nothing to remove
  }
};
