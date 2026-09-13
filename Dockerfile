# ============================================================
#  Groupe Nanei — site web (vitrine + admin), build statique servi par nginx
#  Stage 1 : build   → compile le SPA React/Vite
#  Stage 2 : runner  → nginx léger, sert dist/ et relaie /api vers l'API
# ============================================================

FROM node:22.20.0-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --no-fund
COPY . .
# VITE_API_URL est injectée au BUILD (variable statique dans le bundle) —
# voir docker-compose.prod.yml pour sa valeur en production.
ARG VITE_API_URL=/api/v1
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

FROM nginx:1.27-alpine AS runner
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
