import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

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
  plugins: [react(), spaFallbackPlugin()],
});
