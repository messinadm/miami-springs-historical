interface Env {
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Only consider redirecting HTML pages, not assets or /es/ routes
    const isAsset = /\.[a-zA-Z0-9]+$/.test(url.pathname);
    const isEsRoute = url.pathname.startsWith('/es');

    if (!isAsset && !isEsRoute) {
      // Explicit language preference set by the nav language switcher
      const cookie = request.headers.get('Cookie') ?? '';
      const langPref = cookie.match(/(?:^|;\s*)lang=([a-z]{2})/)?.[1];

      // If user explicitly chose English, respect it
      if (langPref !== 'en') {
        const primaryLang = (request.headers.get('Accept-Language') ?? '')
          .split(',')[0]
          .trim()
          .split(/[-_]/)[0]
          .toLowerCase();

        if (primaryLang === 'es') {
          const redirect = new URL(url);
          redirect.pathname = url.pathname === '/' ? '/es/' : `/es${url.pathname}`;
          return Response.redirect(redirect.toString(), 302);
        }
      }
    }

    return env.ASSETS.fetch(request);
  },
};
