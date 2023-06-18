FROM node:14 AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:1.21-alpine
COPY --from=builder /app/dist/ecommerce-website-frontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]