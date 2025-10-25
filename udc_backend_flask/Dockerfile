# =============================
# STAGE 1 - Build de dependencias
# =============================
FROM python:3.10-slim-bookworm AS builder

# Instalar herramientas necesarias solo para compilación
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar solo dependencias primero (mejora la caché)
COPY requirements.txt .

# Crear entorno virtual (para aislar dependencias)
RUN python -m venv /opt/venv \
    && /opt/venv/bin/pip install --no-cache-dir --upgrade pip \
    && /opt/venv/bin/pip install --no-cache-dir -r requirements.txt

# =============================
# STAGE 2 - Imagen final ligera
# =============================
FROM python:3.10-slim-bookworm

ENV PATH="/opt/venv/bin:$PATH"
WORKDIR /app

# Copiar entorno virtual ya listo
COPY --from=builder /opt/venv /opt/venv

# Copiar solo el código fuente
COPY . .

# Crear directorio de logs
RUN mkdir -p logs

# Exponer puerto Flask
EXPOSE 5000

# Usar gunicorn como servidor de producción
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--access-logfile", "logs/access.log", "--error-logfile", "logs/error.log", "entrypoint:app"]
