#!/bin/bash
set -e

echo "======================================================================"
echo "   INSTALACIÓN DE DOCKER + DOCKER COMPOSE (v2) + BUILDX - AMAZON LINUX 2023"
echo "======================================================================"

# Función para verificar si un comando existe
command_exists() {
  command -v "$1" &> /dev/null
}

echo "[INFO] Actualizando sistema..."
sudo dnf update -y

echo "[INFO] Instalando dependencias necesarias..."
sudo dnf install -y tar wget ca-certificates dnf-plugins-core

# Swap 2GB
SWAPFILE="/swapfile"
if [ ! -f "$SWAPFILE" ]; then
  echo "[INFO] Creando archivo de swap de 2GB..."
  sudo fallocate -l 2G $SWAPFILE
  sudo chmod 600 $SWAPFILE
  sudo mkswap $SWAPFILE
  sudo swapon $SWAPFILE
  echo "$SWAPFILE swap swap defaults 0 0" | sudo tee -a /etc/fstab
  echo "[INFO] Swap de 2GB activado."
else
  echo "[INFO] Swap ya existe en $SWAPFILE, se omite creación."
fi

# Swap de curl
if rpm -q curl-minimal &> /dev/null; then
  echo "[INFO] Reemplazando curl-minimal por curl completo..."
  sudo dnf swap curl-minimal curl -y
else
  echo "[INFO] curl completo ya instalado o no es necesario swap."
fi

echo "[INFO] Verificando si ya existe una instalación previa de Docker..."
if command_exists docker; then
  echo "⚠️  Docker ya está instalado:"
  docker --version

  read -p "¿Deseas eliminar la instalación anterior y reinstalar Docker? (s/N): " confirm
  if [[ "$confirm" =~ ^[sS]$ ]]; then
    echo "[INFO] Eliminando Docker anterior..."
    sudo systemctl stop docker || true
    sudo dnf remove -y docker docker-cli docker-compose docker-compose-plugin docker-buildx-plugin containerd runc || true
    sudo rm -f /usr/local/bin/docker-compose /usr/libexec/docker/cli-plugins/docker-* || true
    echo "[INFO] Docker eliminado correctamente."
  else
    echo "[INFO] Se conservará la instalación actual de Docker."
  fi
fi

echo "[INFO] Instalando Docker desde los repos oficiales de Amazon..."
sudo dnf install -y docker

echo "[INFO] Habilitando e iniciando Docker..."
sudo systemctl enable --now docker

echo "[INFO] Agregando usuario actual al grupo docker..."
sudo usermod -aG docker $USER

echo "[INFO] Verificando instalación de Docker..."
docker --version || echo "⚠️ Docker no inició correctamente."

# ======================================================
# 🔧 Instalar manualmente los plugins Buildx y Compose
# ======================================================
PLUGIN_DIR="/usr/libexec/docker/cli-plugins"
sudo mkdir -p $PLUGIN_DIR

# Versión actualizada y estable
DOCKER_COMPOSE_VERSION="v2.40.1"
DOCKER_BUILDX_VERSION="v0.17.1"

echo "[INFO] Instalando Docker Compose v${DOCKER_COMPOSE_VERSION}..."
sudo curl -SL "https://github.com/docker/compose/releases/download/${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" \
  -o "${PLUGIN_DIR}/docker-compose"
sudo chmod +x "${PLUGIN_DIR}/docker-compose"

echo "[INFO] Instalando Docker Buildx v${DOCKER_BUILDX_VERSION}..."
sudo curl -SL "https://github.com/docker/buildx/releases/download/${DOCKER_BUILDX_VERSION}/buildx-${DOCKER_BUILDX_VERSION}.linux-amd64" \
  -o "${PLUGIN_DIR}/docker-buildx"
sudo chmod +x "${PLUGIN_DIR}/docker-buildx"

echo "[INFO] Verificando instalación de plugins..."
docker compose version
docker buildx version

echo "======================================================================"
echo "✅ Instalación completada correctamente."
echo "   - Docker: $(docker --version 2>/dev/null || echo '(no disponible)')"
echo "   - Compose: $(docker compose version 2>/dev/null || echo '(no disponible)')"
echo "   - Buildx: $(docker buildx version 2>/dev/null || echo '(no disponible)')"
echo "======================================================================"
echo "🔁 Cierra sesión y vuelve a entrar para usar Docker sin sudo."
echo "======================================================================"
