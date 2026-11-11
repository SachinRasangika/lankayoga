import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const serverDir = path.join(root, 'dist-server');
const serverEntry = path.join(serverDir, 'entry-server.js');
const template = await readFile(path.join(dist, 'index.html'), 'utf8');
const { getPublicRoutes, getSeoMetadata, getSitemapEntries, getStructuredData, loadPublishedContent, renderRoute, siteUrl } =
  await import(`${pathToFileURL(serverEntry).href}?t=${Date.now()}`);

const content = await loadPublishedContent();
const routes = getPublicRoutes(content);
const serializedContent = JSON.stringify(content).replace(/</g, '\\u003c');

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function metadataTags(metadata) {
  const title = escapeHtml(metadata.title);
  const description = escapeHtml(metadata.description);
  const canonical = escapeHtml(metadata.canonical);
  const image = escapeHtml(metadata.image);
  const imageAlt = escapeHtml(metadata.imageAlt);
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${metadata.noindex ? 'noindex, nofollow' : 'index, follow'}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<meta property="og:type" content="${metadata.type}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:alt" content="${imageAlt}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`
  ].join('\n    ');
}

function schemaTag(data) {
  if (!data.length) return '';
  return `<script id="lankayoga-page-schema" type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`;
}

function withRouteMetadata(html, metadata, structuredData) {
  return html
    .replace(/<title>[\s\S]*?<\/title>\s*/i, '')
    .replace(/<meta\s+name="description"[\s\S]*?\/>\s*/i, '')
    .replace(/<link\s+rel="canonical"[\s\S]*?\/>\s*/i, '')
    .replace(/<meta\s+property="og:(?:type|title|description|url|image|image:alt)"[\s\S]*?\/>\s*/gi, '')
    .replace('</head>', `    ${metadataTags(metadata)}\n    ${schemaTag(structuredData)}\n  </head>`);
}

function sitemapXml(entries) {
  const urls = entries.map((entry) => {
    const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${escapeHtml(entry.loc)}</loc>${lastmod}\n  </url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

for (const route of routes) {
  const metadata = getSeoMetadata(route, content);
  const app = renderRoute(route, content);
  const initialState = `<script>window.__INITIAL_CONTENT__=${serializedContent}</script>`;
  const html = withRouteMetadata(template, metadata, getStructuredData(route, content))
    .replace('<div id="root"></div>', `<div id="root">${app}</div>${initialState}`);
  const output = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
}

const stylesheet = template.match(/<link rel="stylesheet"[^>]*>/)?.[0] ?? '';
await writeFile(path.join(dist, '404.html'), `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Page not found | Lanka Yoga Ayurveda</title>
    <meta name="robots" content="noindex, nofollow" />
    ${stylesheet}
  </head>
  <body>
    <main class="mx-auto flex min-h-screen max-w-xl flex-col justify-center bg-surface px-5">
      <p class="text-xs uppercase tracking-widest text-terracotta-600">404</p>
      <h1 class="mt-3 font-display text-4xl font-light text-ink">That page is not here</h1>
      <p class="mt-4 text-sm text-muted">The address does not match a page on this site.</p>
      <a class="mt-8 text-sm text-ink underline" href="/">Back to the homepage</a>
    </main>
  </body>
</html>
`);

await writeFile(path.join(dist, 'sitemap.xml'), sitemapXml(getSitemapEntries(content)));
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *
Allow: /
Disallow: /admin
Disallow: /classes/book/

Sitemap: ${siteUrl}/sitemap.xml
`);

await rm(serverDir, { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} published routes.`);
