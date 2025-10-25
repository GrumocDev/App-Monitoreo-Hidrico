#!/bin/sh

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo -e "${BLUE}======================================================================"
echo "   SISTEMA DE MONITOREO HIDRICO UDC - DESPLIEGUE AUTOMATICO"
echo "======================================================================${NC}"

# Detectar IP pública
log "Detectando IP publica..."
PUBLIC_IP=""

# Intentar diferentes métodos para obtener la IP pública
if command -v curl >/dev/null 2>&1; then
    PUBLIC_IP=$(curl -s --connect-timeout 5 ipinfo.io/ip 2>/dev/null || \
                curl -s --connect-timeout 5 ifconfig.me 2>/dev/null || \
                curl -s --connect-timeout 5 icanhazip.com 2>/dev/null || echo "")
elif command -v wget >/dev/null 2>&1; then
    PUBLIC_IP=$(wget -qO- --timeout=5 ipinfo.io/ip 2>/dev/null || \
                wget -qO- --timeout=5 ifconfig.me 2>/dev/null || echo "")
fi

if [ -z "$PUBLIC_IP" ]; then
    warn "No se pudo detectar IP publica. Usando localhost."
    warn "Para acceso publico, configura manualmente la IP en el archivo .env"
    PUBLIC_IP="localhost"
fi
log "IP detectada: ${PUBLIC_IP}"

# Verificar Docker
log "Verificando Docker..."
DOCKER_CMD="docker"

# Detectar si estamos en WSL o Linux nativo
if command -v docker.exe >/dev/null 2>&1; then
    DOCKER_CMD="docker.exe"
    log "Detectado entorno WSL"
elif command -v docker >/dev/null 2>&1; then
    DOCKER_CMD="docker"
    log "Detectado entorno Linux nativo"
else
    error "Docker no esta instalado. Instala Docker primero:"
    error "  Ubuntu/Debian: apt update && apt install docker.io docker-compose-plugin"
    error "  CentOS/RHEL:   yum install docker docker-compose-plugin"
    error "  O visita: https://docs.docker.com/engine/install/"
    exit 1
fi

if ! $DOCKER_CMD ps >/dev/null 2>&1; then
    error "Docker no esta ejecutandose."
    error "Inicia Docker con: sudo systemctl start docker"
    error "O en WSL: asegurate de que Docker Desktop este iniciado."
    exit 1
fi
log "Docker OK"

# Verificar puertos
log "Verificando disponibilidad de puertos..."
if command -v netstat >/dev/null 2>&1; then
    if netstat -tuln | grep -q ":8000 "; then
        warn "Puerto 8000 ya esta en uso"
    fi
    if netstat -tuln | grep -q ":8080 "; then
        warn "Puerto 8080 ya esta en uso"
    fi
fi

# Crear .env
log "Creando configuracion..."
cat > .env << EOF
DOMAIN=${PUBLIC_IP}
DB_HOST=udc_postgres
DB_PORT=5432
DB_USER=udc_user
DB_PASSWORD=S3cret
DB_NAME=udc_db_develop
COMPOSE_PROJECT_NAME=udc_monitoring
WEB_PORT=8000
DASHBOARD_PORT=8080
EOF
log "Configuracion creada"

# Crear configuración de Mosquitto
log "Verificando configuracion de Mosquitto..."
MOSQUITTO_CONFIG_DIR="volumes/mosquitto/config"
MOSQUITTO_CONFIG_FILE="$MOSQUITTO_CONFIG_DIR/mosquitto.conf"
MOSQUITTO_PASSWD_FILE="$MOSQUITTO_CONFIG_DIR/passwd"

mkdir -p "$MOSQUITTO_CONFIG_DIR"
mkdir -p "volumes/mosquitto/data"
mkdir -p "volumes/mosquitto/log"

log "Creando configuracion de Mosquitto..."
cat > "$MOSQUITTO_CONFIG_FILE" << 'EOF'
# Mosquitto configuration file

# General
user mosquitto

# Network
listener 1883 0.0.0.0
protocol mqtt

# WebSocket listener
listener 9001 0.0.0.0
protocol websockets

# Security
allow_anonymous true
password_file /mosquitto/config/passwd

# Persistence
persistence true
persistence_location /mosquitto/data/
autosave_interval 300

# Logging
log_dest file /mosquitto/log/mosquitto.log
log_dest stdout
log_type error
log_type warning
log_type notice
log_type information
log_timestamp true
EOF

if [ ! -f "$MOSQUITTO_PASSWD_FILE" ]; then
    log "Creando archivo de passwords de Mosquitto..."
    cat > "$MOSQUITTO_PASSWD_FILE" << 'EOF'
# Mosquitto password file
# Format: username:password_hash
# Leave empty for anonymous access
EOF
fi

# Limpiar y desplegar
log "Limpiando despliegue anterior..."
$DOCKER_CMD compose down --remove-orphans 2>/dev/null || true

log "Desplegando aplicacion..."
$DOCKER_CMD compose up -d --build

log "Esperando servicios..."
sleep 15

log "Ejecutando migraciones de base de datos..."
if $DOCKER_CMD exec udc_api flask db upgrade 2>/dev/null; then
    log "Migraciones completadas"
else
    warn "No se pudieron ejecutar migraciones (puede ser normal en primer despliegue)"
fi

# Verificar
log "Verificando despliegue..."
if curl -s --connect-timeout 10 "http://localhost:8000" > /dev/null; then
    log "Frontend OK"
else
    warn "Frontend no accesible"
fi

echo -e "${GREEN}======================================================================"
echo "   DESPLIEGUE COMPLETADO!"
echo "======================================================================${NC}"
echo -e "${BLUE}URLs de acceso:${NC}"
echo "   * Local:    http://localhost:8000"
if [ "$PUBLIC_IP" != "localhost" ]; then
    echo "   * Publico:  http://${PUBLIC_IP}:8000"
    echo "   * Dashboard: http://${PUBLIC_IP}:8080"
    echo ""
    echo -e "${YELLOW}IMPORTANTE para VPS:${NC}"
    echo "   * Asegurate de que los puertos 8000 y 8080 esten abiertos en el firewall"
    echo "   * Ubuntu/Debian: sudo ufw allow 8000 && sudo ufw allow 8080"
    echo "   * CentOS/RHEL:   sudo firewall-cmd --add-port=8000/tcp --permanent"
    echo "                    sudo firewall-cmd --add-port=8080/tcp --permanent"
    echo "                    sudo firewall-cmd --reload"
else
    echo "   * Dashboard: http://localhost:8080"
fi
echo ""
echo -e "${GREEN}Sistema listo para usar!${NC}"