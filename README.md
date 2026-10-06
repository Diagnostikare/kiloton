# Kilotón Total

Landing pública de Kilotón Total. La aplicación muestra información del programa y dirige el inicio de sesión y el registro a `reto.kilotontotal.com`. No contiene formularios, credenciales ni integración con el API legado.

## Requisitos

- Node.js 22 LTS
- pnpm 10.14.0 mediante Corepack
- Docker, solo para validar la imagen de producción

## Desarrollo local

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev
```

La aplicación queda disponible en `http://localhost:3000` y el health check en `http://localhost:3000/api/health`.

## Calidad y producción

```bash
pnpm lint
pnpm build
pnpm start
BASE_URL=http://localhost:3000 pnpm smoke
```

Para probar el contenedor:

```bash
docker build -t kiloton:prod .
docker run --rm -p 8080:8080 kiloton:prod
BASE_URL=http://localhost:8080 pnpm smoke
```

## Arquitectura

- Next.js App Router con salida `standalone`.
- Imagen multi-stage sobre Node.js 22, ejecutada sin privilegios en el puerto 8080.
- Cloud Build publica una imagen inmutable por `$COMMIT_SHA`.
- Cloud Run recibe una revisión candidata sin tráfico; health y smoke tests deben pasar antes de promoverla al 100%.
- La identidad de runtime no requiere roles de proyecto. La identidad de build/deploy es independiente y tiene permisos mínimos.

La preparación de GCP, despliegue, monitoreo y rollback están documentados en [docs/production-deployment.md](docs/production-deployment.md).
