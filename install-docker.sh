#!/bin/sh

set -e

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log() { echo -e "${GREEN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; }

echo "========================================================================"
echo "  INSTALADOR AUTOMÁTICO DE DOCKER - SISTEMA MONITOREO UDC"
echo "========================================================================"

# Detectar distribución
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$NAME
    VERSION=$VERSION_ID
else
    error "No se pudo detectar la distribución del sistema"
    exit 1
fi

log "Detectado: $OS $VERSION"

# Verificar si Docker ya está instalado
if command -v docker >/dev/null 2>&1; then
    log "Docker ya esta instalado"
    docker --version
    
    # Verificar docker compose
    if docker compose version >/dev/null 2>&1; then
        log "Docker Compose ya esta instalado"
        docker compose version
        log "Sistema listo! Puedes ejecutar ./deploy.sh"
        exit 0
    fi
fi

log "Instalando Docker..."

case "$OS" in
    "Ubuntu"*)
        log "Instalando en Ubuntu..."
        sudo apt-get update
        sudo apt-get install -y ca-certificates curl gnupg lsb-release
        
        # Agregar clave GPG oficial de Docker
        sudo mkdir -p /etc/apt/keyrings
        curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        
        # Agregar repositorio
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        
        # Instalar Docker
        sudo apt-get update
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
        ;;
        
    "Debian"*)
        log "Instalando en Debian..."
        sudo apt-get update
        sudo apt-get install -y ca-certificates curl gnupg lsb-release
        
        sudo mkdir -p /etc/apt/keyrings
        curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
        
        echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
        
        sudo apt-get update
        sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
        ;;
        
    "CentOS"*|"Red Hat"*|"Rocky"*|"AlmaLinux"*)
        log "Instalando en CentOS/RHEL..."
        sudo yum install -y yum-utils
        sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
        sudo yum install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
        ;;
        
    "Fedora"*)
        log "Instalando en Fedora..."
        sudo dnf -y install dnf-plugins-core
        sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
        sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
        ;;
        
    *)
        error "Distribución no soportada: $OS"
        error "Instala Docker manualmente: https://docs.docker.com/engine/install/"
        exit 1
        ;;
esac

# Iniciar y habilitar Docker
log "Iniciando Docker..."
sudo systemctl start docker
sudo systemctl enable docker

# Agregar usuario al grupo docker (opcional)
log "Agregando usuario al grupo docker..."
sudo usermod -aG docker $USER

# Verificar instalación
log "Verificando instalacion..."
sudo docker --version
sudo docker compose version

log "Docker instalado correctamente!"
warn "IMPORTANTE: Cierra y vuelve a abrir la sesion para aplicar permisos de grupo"
warn "O ejecuta: newgrp docker"
echo ""
log "Ahora puedes ejecutar: ./deploy.sh"