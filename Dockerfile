# Etapa de build
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa final (runtime)
FROM node:22-alpine
WORKDIR /app

COPY --from=builder /app ./

# Escucha en 0.0.0.0:3000
EXPOSE 3000

CMD ["npm", "start"]
