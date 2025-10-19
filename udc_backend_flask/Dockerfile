# Utiliza una imagen base de Python
FROM python:3.10.16-slim-bookworm

# Instala las dependencias del sistema necesarias
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY . .

# Instala las dependencias de la aplicación
RUN pip install -r requirements.txt

# Crea el directorio de logs
RUN mkdir -p logs

# Expone el puerto en el que se ejecutará la aplicación Flask
EXPOSE 5000

# Comando para ejecutar la aplicación Flask con Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "--access-logfile", "logs/access.log", "--error-logfile", "logs/error.log", "entrypoint:app"]
