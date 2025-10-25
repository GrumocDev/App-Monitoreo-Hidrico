# =============================
# STAGE 1 - Build
# =============================
FROM node:18-alpine AS builder

WORKDIR /app

# Definir variables de entorno (build-time)
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MQTT
ARG NEXT_PUBLIC_MQTT_TOPIC

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL \
    NEXT_PUBLIC_MQTT=$NEXT_PUBLIC_MQTT \
    NEXT_PUBLIC_MQTT_TOPIC=$NEXT_PUBLIC_MQTT_TOPIC

# Copiar solo los archivos necesarios para instalar dependencias
COPY package.json yarn.lock ./

# Instalar dependencias solo de producción y build
RUN yarn install --frozen-lockfile

# Copiar código fuente y compilar
COPY . .
RUN yarn build

# =============================
# STAGE 2 - Runtime
# =============================
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copiar solo lo necesario desde la etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/yarn.lock ./yarn.lock

# Instalar solo dependencias necesarias para producción
RUN yarn install --frozen-lockfile --production --ignore-scripts --prefer-offline

EXPOSE 3000
CMD ["yarn", "start"]
