#!/bin/bash
echo "🚀 Creando estructura completa del proyecto Angular..."

# Crear directorios principales
mkdir -p src/app/components/headers
mkdir -p src/app/components/auth
mkdir -p src/app/components/dashboard
mkdir -p src/app/components/institutions
mkdir -p src/app/components/careers
mkdir -p src/app/components/users
mkdir -p src/app/components/charts
mkdir -p src/app/components/excel
mkdir -p src/app/components/profile
mkdir -p src/app/components/reports

mkdir -p src/app/services
mkdir -p src/app/guards
mkdir -p src/app/interceptors
mkdir -p src/app/models
mkdir -p src/assets
mkdir -p src/environments

# Crear archivos de componentes
# Headers
touch src/app/components/headers/gobierno-header.component.ts
touch src/app/components/headers/gobierno-header.component.html
touch src/app/components/headers/gobierno-header.component.css

touch src/app/components/headers/main-header.component.ts
touch src/app/components/headers/main-header.component.html
touch src/app/components/headers/main-header.component.css

# Auth
touch src/app/components/auth/login.component.ts
touch src/app/components/auth/login.component.html
touch src/app/components/auth/login.component.css

touch src/app/components/auth/register.component.ts
touch src/app/components/auth/register.component.html
touch src/app/components/auth/register.component.css

# Dashboard
touch src/app/components/dashboard/dashboard.component.ts
touch src/app/components/dashboard/dashboard.component.html
touch src/app/components/dashboard/dashboard.component.css

# Institutions
touch src/app/components/institutions/institution-list.component.ts
touch src/app/components/institutions/institution-list.component.html
touch src/app/components/institutions/institution-list.component.css

touch src/app/components/institutions/institution-form.component.ts
touch src/app/components/institutions/institution-form.component.html
touch src/app/components/institutions/institution-form.component.css

# Careers
touch src/app/components/careers/career-list.component.ts
touch src/app/components/careers/career-list.component.html
touch src/app/components/careers/career-list.component.css

touch src/app/components/careers/career-form.component.ts
touch src/app/components/careers/career-form.component.html
touch src/app/components/careers/career-form.component.css

# Users
touch src/app/components/users/user-list.component.ts
touch src/app/components/users/user-list.component.html
touch src/app/components/users/user-list.component.css

touch src/app/components/users/user-form.component.ts
touch src/app/components/users/user-form.component.html
touch src/app/components/users/user-form.component.css

# Charts
touch src/app/components/charts/population-chart.component.ts
touch src/app/components/charts/population-chart.component.html
touch src/app/components/charts/population-chart.component.css

touch src/app/components/charts/modalidad-chart.component.ts
touch src/app/components/charts/modalidad-chart.component.html
touch src/app/components/charts/modalidad-chart.component.css

# Excel
touch src/app/components/excel/excel-upload.component.ts
touch src/app/components/excel/excel-upload.component.html
touch src/app/components/excel/excel-upload.component.css

# Profile
touch src/app/components/profile/profile.component.ts
touch src/app/components/profile/profile.component.html
touch src/app/components/profile/profile.component.css

# Reports
touch src/app/components/reports/reports.component.ts
touch src/app/components/reports/reports.component.html
touch src/app/components/reports/reports.component.css

# Services
touch src/app/services/auth.service.ts
touch src/app/services/institution.service.ts
touch src/app/services/career.service.ts
touch src/app/services/user.service.ts
touch src/app/services/excel.service.ts
touch src/app/services/chart.service.ts
touch src/app/services/api-url.ts

# Guards
touch src/app/guards/auth.guard.ts
touch src/app/guards/admin.guard.ts

# Interceptors
touch src/app/interceptors/auth.interceptor.ts

# Models
touch src/app/models/user.model.ts
touch src/app/models/institution.model.ts
touch src/app/models/career.model.ts

# Environments
touch src/environments/environment.ts
touch src/environments/environment.prod.ts

# Assets (crear archivos de ejemplo)
echo "placeholder" > src/assets/gobierno-logo.png
echo "placeholder" > src/assets/tec-logo.png
echo "placeholder" > src/assets/default-avatar.png
echo "placeholder" > src/assets/default-institution.png

# Crear archivos de configuración
touch src/app/app.component.ts
touch src/app/app.component.html
touch src/app/app.component.css
touch src/app/app.module.ts
touch src/app/app-routing.module.ts

# Crear archivo de estilos globales
touch src/styles.css

# Crear archivo proxy para desarrollo
touch proxy.conf.json

echo "✅ Estructura de archivos creada exitosamente!"
echo ""
echo "📁 Estructura creada:"
find src/app -type f -name "*.ts" -o -name "*.html" -o -name "*.css" | sort