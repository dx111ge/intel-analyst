FROM nginx:alpine

# Copy dashboard files
COPY dashboard/ /usr/share/nginx/html/

# Nginx config with reverse proxy to engram and searxng
COPY docker/dashboard/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
