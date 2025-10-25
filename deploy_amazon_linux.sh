#!/bin/bash
set -euo pipefail

# ========================
# 🚀 Script de despliegue para Amazon Linux 2023
# ========================

# Colores para logs
GREEN='\033[0;32m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }

log "Verificando utilidades básicas..."
sudo dnf install -y curl wget util-linux || true

log "Asegurando que Docker esté activo..."
sudo systemctl enable --now docker

# Detectar versión correcta de docker compose
if docker compose version &>/dev/null; then
  COMPOSE_CMD="docker compose"
elif command -v docker-compose &>/dev/null; then
  COMPOSE_CMD="docker-compose"
else
  log "⚠️  No se encontró Docker Compose. Instalando binario oficial..."
  DOCKER_COMPOSE_VERSION="v2.24.6"
  sudo curl -SL "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
  COMPOSE_CMD="docker-compose"
fi

log "Usando comando de Compose: $COMPOSE_CMD ($(which $COMPOSE_CMD || echo 'builtin docker compose'))"

# Detectar IP pública
log "Detectando IP pública..."
PUBLIC_IP=$(curl -s --connect-timeout 5 http://checkip.amazonaws.com || echo "0.0.0.0")
log "IP detectada: $PUBLIC_IP"

# Verificar puertos
log "Verificando puertos 8000 y 8080..."
for port in 8000 8080; do
  if ss -tuln | grep -q ":$port "; then
    log "⚠️  Puerto $port en uso"
  fi
done

# Crear archivo .env si no existe
log "Creando archivo .env..."
cat > .env <<EOF
# Variables de entorno
PUBLIC_IP=$PUBLIC_IP
EOF

# Configurar Mosquitto
log "Configurando Mosquitto..."
MOSQ_DIR=volumes/mosquitto
mkdir -p $MOSQ_DIR/{config,data,log}
chmod -R 775 $MOSQ_DIR
chown -R ec2-user:ec2-user $MOSQ_DIR

# Limpiar despliegue previo
log "Eliminando despliegue anterior..."
$COMPOSE_CMD down --remove-orphans || true

# Desplegar servicios
log "Desplegando servicios (esto puede tardar unos minutos)..."
$COMPOSE_CMD up -d --build

log "✅ Despliegue completado correctamente."

