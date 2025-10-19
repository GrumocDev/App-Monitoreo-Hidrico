FROM node:18-alpine

# Instalar dependencias del sistema
RUN apk add --no-cache libc6-compat

# Establecer directorio de trabajo
WORKDIR /app

# Variables de entorno para Next.js
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_MQTT
ARG NEXT_PUBLIC_MQTT_TOPIC

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_MQTT=$NEXT_PUBLIC_MQTT
ENV NEXT_PUBLIC_MQTT_TOPIC=$NEXT_PUBLIC_MQTT_TOPIC

# Copiar archivos de configuración primero
COPY package*.json ./
COPY yarn.lock* ./
COPY tsconfig.json ./
COPY next.config.js ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Instalar dependencias
RUN yarn install --frozen-lockfile

# Copiar código fuente
COPY . .

# Construir la aplicación
RUN yarn build

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["yarn", "start"]
