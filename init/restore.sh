#!/bin/bash

# Script de restauración para la base de datos UDC

set -e

echo "Iniciando configuración de base de datos..."

# Verificar si existe backup.dump y es un archivo válido
if [ -f "/docker-entrypoint-initdb.d/backup.dump" ] && [ -s "/docker-entrypoint-initdb.d/backup.dump" ]; then
    echo "Encontrado archivo backup.dump, restaurando..."
    
    # Restaurar desde backup
    pg_restore -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v /docker-entrypoint-initdb.d/backup.dump || {
        echo "Error al restaurar desde backup.dump, continuando con inicialización básica..."
    }
else
    echo "No se encontró backup.dump válido, inicializando base de datos básica..."
    
    # Crear esquema básico si no existe backup
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
        -- Crear esquemas básicos si es necesario
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        
        -- Aquí puedes agregar más configuraciones iniciales de la BD
        SELECT 'Base de datos inicializada correctamente' as mensaje;
EOSQL
fi

echo "Configuración de base de datos completada."