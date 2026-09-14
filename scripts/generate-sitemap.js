import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://neumorphia.aliben.me';
const currentDate = new Date().toISOString().split('T')[0];

// Static Core Pages
const corePages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '?view=home', priority: '0.9', changefreq: 'weekly' },
  { path: '?view=components', priority: '0.9', changefreq: 'weekly' },
  { path: '?view=docs', priority: '0.9', changefreq: 'weekly' },
  { path: '?view=playground', priority: '0.9', changefreq: 'weekly' },
  { path: '?view=ai', priority: '0.9', changefreq: 'weekly' },
];

// Read component definition directory
const defsDir = path.resolve(__dirname, '../src/registry/definitions');
const componentFiles = fs.readdirSync(defsDir).filter((file) => file.endsWith('.definition.tsx'));

const componentSlugs = componentFiles.map((file) => {
  // e.g. "pushbutton.definition.tsx" -> "push-button" or matched id
  const content = fs.readFileSync(path.join(defsDir, file), 'utf-8');
  const idMatch = content.match(/id:\s*['"]([^'"]+)['"]/);
  if (idMatch && idMatch[1]) {
    return idMatch[1];
  }
  return file.replace('.definition.tsx', '').toLowerCase();
});

// Remove duplicates if any
const uniqueComponentSlugs = Array.from(new Set(componentSlugs));

console.log(`[SEO Sitemap] Found ${uniqueComponentSlugs.length} component definitions.`);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;

// Add Core Pages
for (const page of corePages) {
  const loc = page.path ? `${BASE_URL}/${page.path}` : `${BASE_URL}/`;
  xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
}

// Add Each Component Page
for (const slug of uniqueComponentSlugs) {
  const loc = `${BASE_URL}/?view=components&amp;c=${slug}`;
  xml += `  <url>
    <loc>${loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>\n`;

const outputPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf-8');

console.log(`[SEO Sitemap] Successfully generated sitemap.xml at ${outputPath}`);
