import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Le site est servi sous /groupe-nanei (ex. http://localhost:5173/groupe-nanei).
const BASE = '/groupe-nanei';

// En dev comme en `vite preview` : http://localhost:5173/ redirige vers
// /groupe-nanei, et /groupe-nanei (sans slash final) sert l'application.
function redirectionVersBase() {
  const middleware = (req, res, next) => {
    const [chemin, requete = ''] = req.url.split('?');
    const suffixe = requete ? `?${requete}` : '';
    if (chemin === '/' || chemin === '/index.html') {
      res.writeHead(302, { Location: `${BASE}${suffixe}` });
      res.end();
      return;
    }
    if (chemin === BASE) req.url = `${BASE}/${suffixe}`;
    next();
  };
  return {
    name: 'redirection-vers-base',
    configureServer(server) {
      server.middlewares.use(middleware);
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}

export default defineConfig({
  base: `${BASE}/`,
  plugins: [react(), redirectionVersBase()],
  server: {
    port: 5173,
  },
});
