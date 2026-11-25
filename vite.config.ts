import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

interface ParsedTokensJson {
  name: string;
  version: string;
  generatedFrom: string;
  endpoints: {
    tokensCss: string;
    tokensRootCss: string;
    fontsCss: string;
    baseCss: string;
    componentsCss: string;
    bundleCss: string;
    tokensJson: string;
  };
  light: Record<string, string>;
  dark: Record<string, string>;
  responsive: Record<string, Record<string, string>>;
  categories: Record<string, Record<string, string>>;
}

function parseTokensCss(tokensCssContent: string): ParsedTokensJson {
  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};
  const responsive: Record<string, Record<string, string>> = {};
  const categories: Record<string, Record<string, string>> = {};

  // Extract balanced block body starting at the opening '{' after `selectorMatch`
  const extractBlock = (source: string, startRegex: RegExp): string => {
    const match = startRegex.exec(source);
    if (!match) return '';
    let idx = match.index + match[0].length;
    let depth = 1;
    const start = idx;
    while (idx < source.length && depth > 0) {
      if (source[idx] === '{') depth++;
      else if (source[idx] === '}') depth--;
      idx++;
    }
    return source.slice(start, idx - 1);
  };

  // Parse top-level :root block (first occurrence) with category headers
  const rootBody = extractBlock(tokensCssContent, /:root\s*\{/);
  let currentCategory = 'General';
  for (const rawLine of rootBody.split(/\r?\n/)) {
    const line = rawLine.trim();
    const catMatch = /^(\d+\.\s+.+)$/.exec(line);
    if (catMatch) {
      currentCategory = catMatch[1];
      if (!categories[currentCategory]) categories[currentCategory] = {};
      continue;
    }
    const propMatch = /^(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/.exec(line);
    if (propMatch) {
      const [, name, value] = propMatch;
      const cleanVal = value.trim();
      light[name] = cleanVal;
      if (!categories[currentCategory]) categories[currentCategory] = {};
      categories[currentCategory][name] = cleanVal;
    }
  }

  // Parse [data-theme='dark'] block
  const darkBody = extractBlock(tokensCssContent, /\[data-theme='dark'\]\s*\{/);
  for (const rawLine of darkBody.split(/\r?\n/)) {
    const propMatch = /^(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/.exec(rawLine.trim());
    if (propMatch) {
      dark[propMatch[1]] = propMatch[2].trim();
    }
  }

  // Parse responsive @media (min-width: 768px) :root overrides
  const mediaBody = extractBlock(tokensCssContent, /@media\s*\(min-width:\s*768px\)\s*\{/);
  const mediaRootBody = extractBlock(mediaBody, /:root\s*\{/);
  if (mediaRootBody) {
    const bpMap: Record<string, string> = {};
    for (const rawLine of mediaRootBody.split(/\r?\n/)) {
      const propMatch = /^(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);/.exec(rawLine.trim());
      if (propMatch) {
        bpMap[propMatch[1]] = propMatch[2].trim();
      }
    }
    if (Object.keys(bpMap).length > 0) {
      responsive['min-width: 768px'] = bpMap;
    }
  }

  return {
    name: 'asterisk* Design System',
    version: '1.0.0',
    generatedFrom: 'src/design-system/tokens.css',
    endpoints: {
      tokensCss: '/ds/tokens.css',
      tokensRootCss: '/tokens.css',
      fontsCss: '/ds/fonts.css',
      baseCss: '/ds/base.css',
      componentsCss: '/ds/components.css',
      bundleCss: '/ds/asterisk.css',
      tokensJson: '/ds/tokens.json',
    },
    light,
    dark,
    responsive,
    categories,
  };
}

function buildDesignSystemAssets(rootDir: string) {
  const dsDir = path.resolve(rootDir, 'src/design-system');
  const tokens = fs.readFileSync(path.join(dsDir, 'tokens.css'), 'utf-8');
  const fonts = fs.readFileSync(path.join(dsDir, 'fonts.css'), 'utf-8');
  const base = fs.readFileSync(path.join(dsDir, 'base.css'), 'utf-8');
  const components = fs.readFileSync(path.join(dsDir, 'components.css'), 'utf-8');

  const bundle = [
    '/* ==========================================================================',
    '   asterisk* Design System — Flattened Production Bundle',
    '   Includes: tokens.css + base.css + components.css (Single flattened stylesheet)',
    '   ========================================================================== */',
    '',
    tokens.trim(),
    '',
    base.trim(),
    '',
    components.trim(),
    '',
  ].join('\n');

  const tokensJson = JSON.stringify(parseTokensCss(tokens), null, 2) + '\n';

  return {
    '/ds/tokens.css': { body: tokens, contentType: 'text/css; charset=utf-8' },
    '/tokens.css': { body: tokens, contentType: 'text/css; charset=utf-8' },
    '/ds/fonts.css': { body: fonts, contentType: 'text/css; charset=utf-8' },
    '/ds/base.css': { body: base, contentType: 'text/css; charset=utf-8' },
    '/ds/components.css': { body: components, contentType: 'text/css; charset=utf-8' },
    '/ds/asterisk.css': { body: bundle, contentType: 'text/css; charset=utf-8' },
    '/ds/tokens.json': { body: tokensJson, contentType: 'application/json; charset=utf-8' },
  } as Record<string, { body: string; contentType: string }>;
}

function designSystemPublishPlugin(): Plugin {
  return {
    name: 'design-system-publish-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const urlPath = (req.url || '').split('?')[0];
        const assets = buildDesignSystemAssets(__dirname);
        const match = assets[urlPath];
        if (!match) return next();

        res.statusCode = 200;
        res.setHeader('Content-Type', match.contentType);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Cache-Control', 'no-cache');
        res.end(match.body);
      });
    },
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const dsOutDir = path.join(distDir, 'ds');
      if (!fs.existsSync(dsOutDir)) {
        fs.mkdirSync(dsOutDir, { recursive: true });
      }

      const assets = buildDesignSystemAssets(__dirname);
      for (const [routePath, asset] of Object.entries(assets)) {
        const relPath = routePath.replace(/^\/+/, '');
        const outFile = path.join(distDir, relPath);
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, asset.body, 'utf-8');
      }
    },
  };
}

function spaFallbackPlugin(): Plugin {
  const routes = ['ai', 'license', 'design', 'credits', 'overview'];
  return {
    name: 'spa-fallback-plugin',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distDir, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const indexContent = fs.readFileSync(indexPath, 'utf-8');

      for (const route of routes) {
        const routeDir = path.join(distDir, route);
        if (!fs.existsSync(routeDir)) {
          fs.mkdirSync(routeDir, { recursive: true });
        }
        fs.writeFileSync(path.join(routeDir, 'index.html'), indexContent);
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), spaFallbackPlugin(), designSystemPublishPlugin()],
});
