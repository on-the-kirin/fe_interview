export const setCookie = (
  name: string,
  value: string,
  minutes: number,
  domain: string = ".keepgrow.com"
) => {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + minutes);

  const cookieValue = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/; domain=${domain}`;
  document.cookie = cookieValue;
};

export const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
};

export const COOKIE_CURRENT_ORDER = "COOKIE_CURRENT_ORDER";
