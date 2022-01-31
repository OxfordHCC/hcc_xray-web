FROM node:lts as builder
ARG remote_host
ARG remote_port
ENV XRAY_CLIENT_REMOTE_HOST=remote_host
ENV XRAY_CLIENT_REMOTE_PORT=remote_port
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build web-client

FROM nginx:stable-alpine
COPY --from=builder /app/projects/web-client/build /usr/share/nginx/html
COPY ./projects/web-client/nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

