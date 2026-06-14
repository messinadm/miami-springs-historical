// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

/**
 * Build-time CSP hardening.
 *
 * Astro inlines a handful of small scripts (component behaviour + the JSON-LD
 * block + the language-redirect snippet). To keep `script-src` free of
 * 'unsafe-inline' (which Mozilla Observatory penalises), this hook computes the
 * SHA-256 of every inline executable <script> across the built site and injects
 * those hashes into dist/_headers, replacing the 'unsafe-inline' baseline.
 *
 * It runs on every `astro build`, so the hashes can never go stale: change a
 * component script and the matching hash is regenerated automatically. The
 * source public/_headers keeps 'unsafe-inline' as a functional fallback in case
 * this hook is ever removed.
 */
function cspScriptHashes() {
  return {
    name: 'csp-script-hashes',
    hooks: {
      'astro:build:done': (/** @type {{ dir: URL, logger: any }} */ { dir, logger }) => {
        const distPath = fileURLToPath(dir);
        const headersPath = join(distPath, '_headers');
        if (!existsSync(headersPath)) {
          logger.warn('csp-script-hashes: dist/_headers not found, skipping');
          return;
        }

        const htmlFiles = readdirSync(distPath, { recursive: true })
          .filter((f) => typeof f === 'string' && f.endsWith('.html'));

        const hashes = new Set();
        const scriptRe = /<script([^>]*)>([\s\S]*?)<\/script>/g;
        for (const file of htmlFiles) {
          const html = readFileSync(join(distPath, String(file)), 'utf8');
          let m;
          while ((m = scriptRe.exec(html)) !== null) {
            const [, attrs, body] = m;
            if (/\bsrc=/.test(attrs)) continue;             // external: covered by 'self'
            if (/application\/ld\+json/.test(attrs)) continue; // data, not executed
            const hash = createHash('sha256').update(body, 'utf8').digest('base64');
            hashes.add(`'sha256-${hash}'`);
          }
        }

        if (hashes.size === 0) return;

        const headers = readFileSync(headersPath, 'utf8');
        const target = "script-src 'self' 'unsafe-inline'";
        if (!headers.includes(target)) {
          logger.warn(`csp-script-hashes: "${target}" not found in _headers; CSP left unchanged`);
          return;
        }
        const replacement = `script-src 'self' ${[...hashes].join(' ')}`;
        writeFileSync(headersPath, headers.replace(target, replacement));
        logger.info(`csp-script-hashes: injected ${hashes.size} inline-script hash(es) into _headers`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://miamispringshistoricalsociety.com',
  output: 'static',
  compressHTML: true,
  integrations: [sitemap(), cspScriptHashes()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
