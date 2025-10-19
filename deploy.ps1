function Write-Info($message) { Write-Host "[INFO] $message" -ForegroundColor Green }
function Write-Warn($message) { Write-Host "[WARN] $message" -ForegroundColor Yellow }
function Write-Error-Custom($message) { Write-Host "[ERROR] $message" -ForegroundColor Red }

Write-Host "======================================================================" -ForegroundColor Blue
Write-Host "   SISTEMA DE MONITOREO HIDRICO UDC - DESPLIEGUE AUTOMATICO" -ForegroundColor Blue  
Write-Host "======================================================================" -ForegroundColor Blue

# Detectar IP pública
Write-Info "Detectando IP publica..."
$publicIP = "localhost"
try {
    $publicIP = (Invoke-RestMethod -Uri "http://ipinfo.io/ip" -TimeoutSec 5 -ErrorAction Stop).Trim()
    Write-Info "IP detectada: $publicIP"
} catch {
    Write-Warn "No se pudo detectar IP publica. Usando localhost."
}

# Verificar Docker
Write-Info "Verificando Docker..."
try {
    docker --version | Out-Null
    docker ps | Out-Null
    Write-Info "Docker OK"
} catch {
    Write-Error-Custom "Docker no esta disponible"
    exit 1
}

# Crear .env
Write-Info "Creando configuracion..."
@"
DOMAIN=$publicIP
DB_HOST=udc_postgres
DB_PORT=5432
DB_USER=udc_user
DB_PASSWORD=S3cret
DB_NAME=udc_db_develop
COMPOSE_PROJECT_NAME=udc_monitoring
WEB_PORT=8000
DASHBOARD_PORT=8080
"@ | Out-File -FilePath ".env" -Encoding UTF8

# Crear configuración de Mosquitto
Write-Info "Verificando configuracion de Mosquitto..."
$mosquittoConfigDir = "volumes\mosquitto\config"
$mosquittoDataDir = "volumes\mosquitto\data"
$mosquittoLogDir = "volumes\mosquitto\log"
$mosquittoConfigFile = "$mosquittoConfigDir\mosquitto.conf"
$mosquittoPasswdFile = "$mosquittoConfigDir\passwd"

if (-not (Test-Path $mosquittoConfigDir)) {
    New-Item -ItemType Directory -Path $mosquittoConfigDir -Force | Out-Null
}
if (-not (Test-Path $mosquittoDataDir)) {
    New-Item -ItemType Directory -Path $mosquittoDataDir -Force | Out-Null
}
if (-not (Test-Path $mosquittoLogDir)) {
    New-Item -ItemType Directory -Path $mosquittoLogDir -Force | Out-Null
}

Write-Info "Creando configuracion de Mosquitto..."
$mosquittoConfig = @"
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
"@
[System.IO.File]::WriteAllText($mosquittoConfigFile, $mosquittoConfig, [System.Text.Encoding]::UTF8)

if (-not (Test-Path $mosquittoPasswdFile)) {
    Write-Info "Creando archivo de passwords de Mosquitto..."
    @"
# Mosquitto password file
# Format: username:password_hash
# Leave empty for anonymous access
"@ | Out-File -FilePath $mosquittoPasswdFile -Encoding UTF8
}

# Limpiar y desplegar
Write-Info "Limpiando despliegue anterior..."
try { docker compose down --remove-orphans 2>$null } catch { }

Write-Info "Desplegando aplicacion..."
docker compose up -d --build

Write-Info "Esperando servicios..."
Start-Sleep -Seconds 30

# Verificar que PostgreSQL esté funcionando correctamente
Write-Info "Verificando PostgreSQL..."
$maxRetries = 10
$retryCount = 0
do {
    $pgStatus = docker exec udc_postgres pg_isready -U udc_user -d udc_db_develop 2>&1
    if ($pgStatus -like "*accepting connections*") {
        Write-Info "PostgreSQL listo"
        break
    }
    $retryCount++
    Start-Sleep -Seconds 3
} while ($retryCount -lt $maxRetries)

if ($retryCount -eq $maxRetries) {
    Write-Error-Custom "PostgreSQL no está listo después de $($maxRetries * 3) segundos"
}

Write-Info "Ejecutando migraciones de base de datos..."
try {
    docker exec udc_api flask db upgrade
    Write-Info "Migraciones completadas"
} catch {
    Write-Warn "No se pudieron ejecutar migraciones (puede ser normal en primer despliegue)"
}

# Verificar
Write-Info "Verificando despliegue..."
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8000" -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
    Write-Info "Frontend OK"
} catch {
    Write-Warn "Frontend no accesible"
}

Write-Host "======================================================================" -ForegroundColor Green
Write-Host "   DESPLIEGUE COMPLETADO!" -ForegroundColor Green
Write-Host "======================================================================" -ForegroundColor Green
Write-Host "URLs de acceso:" -ForegroundColor Blue
Write-Host "   * Frontend: http://localhost:8000"
if ($publicIP -ne "localhost") {
    Write-Host "   * Publico:  http://$publicIP`:8000"
}
Write-Host "   * Dashboard: http://localhost:8080"
Write-Host "Sistema listo para usar!" -ForegroundColor Green