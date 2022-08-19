export const setCookie = (name: string, value: string, days?: number): string => {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${value || ''}${expires};path=/`;
  return value;
};

export const getCookieForString = (cookieString: string, name: string): string | null => {
  const nameEQ = `${name}=`;
  if (cookieString) {
    const ca = cookieString.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  return null;
};

export const getCookie = (name: string): string | null => getCookieForString(document.cookie, name);

export const eraseCookie = (name: string) => {
  const date = new Date();
  document.cookie = `${name}=''; expires=${date.toUTCString()};path=/;`;
};

// const SOURCES = ["gclid", "fbclid", "ref"];

// export const retrieveUserSource = (queryObject: any) => {
//   for (const type of SOURCES) {
//     const value = queryObject[type];
//     if (value) {
//       setCookie("source_type", type);
//       setCookie("source_value", value);
//     }
//   }
// };
