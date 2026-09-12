import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/* Construction d'aperçu.
   raw.githack.com sert les fichiers du dépôt sous un préfixe d'URL
   (/utilisateur/dépôt/branche/...), donc les chemins d'assets doivent
   être préfixés. PREVIEW_BASE active ce mode et sort dans preview/,
   pour que dist/ reste ignoré par git. */
const apercu = process.env.PREVIEW_BASE;

export default defineConfig({
  site: 'https://www.pharedesmamelles.sn',
  base: apercu || undefined,
  outDir: apercu ? './preview' : './dist',
  integrations: apercu ? [] : [sitemap()],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});
