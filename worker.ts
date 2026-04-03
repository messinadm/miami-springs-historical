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

    const response = await env.ASSETS.fetch(request);

    // Serve the Spanish 404 page for unmatched /es/* routes.
    // not_found_handling:"404-page" always returns the English /404.html —
    // intercept it here and swap in the Spanish page instead.
    if (response.status === 404 && url.pathname.startsWith('/es/')) {
      try {
        const notFound = await env.ASSETS.fetch(new Request(`${url.origin}/es/404/`));
        return new Response(notFound.body, { status: 404, headers: notFound.headers });
      } catch {
        return response; // fall back to English 404 if something goes wrong
      }
    }

    return response;
  },
};
