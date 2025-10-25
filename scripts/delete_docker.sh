#!/bin/bash
set -euo pipefail

echo "======================================================================"
echo "   DESINSTALANDO DOCKER Y COMPONENTES RELACIONADOS - AMAZON LINUX 2023"
echo "======================================================================"

# 1️⃣ Detener servicio Docker si existe
if systemctl list-unit-files | grep -q docker.service; then
  echo "[INFO] Deteniendo y deshabilitando servicio Docker..."
  sudo systemctl stop docker || true
  sudo systemctl disable docker || true
fi

# 2️⃣ Eliminar paquetes Docker y dependencias
echo "[INFO] Eliminando paquetes Docker y Docker Compose..."
sudo dnf remove -y \
  docker-ce docker-ce-cli containerd.io \
  docker-compose-plugin docker-buildx-plugin \
  docker-ce-rootless-extras docker || true

# 3️⃣ Eliminar versiones antiguas instaladas manualmente
echo "[INFO] Eliminando binarios antiguos..."
sudo rm -f /usr/local/bin/docker-compose || true
sudo rm -f /usr/bin/docker-compose || true
sudo rm -f /usr/bin/docker || true

# 4️⃣ Eliminar repositorios y datos residuales
echo "[INFO] Limpiando datos y configuración..."
sudo rm -rf /var/lib/docker /var/lib/containerd /etc/docker /etc/yum.repos.d/docker-ce.repo || true

# 5️⃣ Limpiar caché del gestor de paquetes
echo "[INFO] Limpiando caché de dnf..."
sudo dnf clean all -y || true

# 6️⃣ Verificación final
if command -v docker >/dev/null 2>&1; then
  echo "[WARN] Docker aún está en el sistema: $(which docker)"
else
  echo "[INFO] Docker eliminado correctamente."
fi

if command -v docker-compose >/dev/null 2>&1; then
  echo "[WARN] Docker Compose aún está en el sistema: $(which docker-compose)"
else
  echo "[INFO] Docker Compose eliminado correctamente."
fi

echo "======================================================================"
echo "   DESINSTALACIÓN COMPLETADA"
echo "======================================================================"

