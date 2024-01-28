FROM nginx:alpine

WORKDIR /app

COPY ./static/ ./static/

COPY ./static/nginx.conf /etc/nginx/nginx.conf