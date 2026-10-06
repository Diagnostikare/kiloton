# Despliegue de producción en Google Cloud Run

Este runbook prepara y opera la landing Kilotón. Sustituye los valores en mayúsculas antes de ejecutar comandos.

## 1. Prerrequisitos

- Proyecto y facturación de Google Cloud activos.
- Repositorio conectado a GitHub.
- Dominio de producción y acceso a su DNS.
- Canal de notificaciones de Monitoring validado.
- Tokens históricos del API legado y DatoCMS revocados o rotados. Eliminar `.env` no los elimina del historial Git.

Define el contexto de la sesión:

```bash
export PROJECT_ID="PROJECT_ID"
export REGION="us-central1"
export REPOSITORY="cloud-run-source-deploy"
export SERVICE="kiloton"
export BUILD_SA="kiloton-build@${PROJECT_ID}.iam.gserviceaccount.com"
export RUNTIME_SA="kiloton-runtime@${PROJECT_ID}.iam.gserviceaccount.com"
gcloud config set project "${PROJECT_ID}"
```

## 2. APIs y Artifact Registry

```bash
gcloud services enable \
  artifactregistry.googleapis.com \
  cloudbuild.googleapis.com \
  iam.googleapis.com \
  logging.googleapis.com \
  monitoring.googleapis.com \
  run.googleapis.com

gcloud artifacts repositories create "${REPOSITORY}" \
  --repository-format=docker \
  --location="${REGION}" \
  --description="Imágenes de Kilotón"
```

Configura una política de limpieza en Artifact Registry para conservar las revisiones necesarias para rollback y eliminar imágenes sin tag o antiguas según la política corporativa. No borres una imagen usada por una revisión activa.

## 3. Identidades e IAM mínimo

Crea una cuenta sin roles de proyecto para runtime y otra para build/deploy:

```bash
gcloud iam service-accounts create kiloton-runtime \
  --display-name="Kilotón Cloud Run runtime"

gcloud iam service-accounts create kiloton-build \
  --display-name="Kilotón Cloud Build deployer"

for role in roles/artifactregistry.writer roles/run.developer roles/logging.logWriter; do
  gcloud projects add-iam-policy-binding "${PROJECT_ID}" \
    --member="serviceAccount:${BUILD_SA}" \
    --role="${role}"
done

gcloud iam service-accounts add-iam-policy-binding "${RUNTIME_SA}" \
  --member="serviceAccount:${BUILD_SA}" \
  --role="roles/iam.serviceAccountUser"
```

No asignes roles de proyecto a `RUNTIME_SA`. Revisa periódicamente:

```bash
gcloud projects get-iam-policy "${PROJECT_ID}" \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:${RUNTIME_SA}" \
  --format="table(bindings.role)"
```

El resultado debe estar vacío. La cuenta que crea o actualiza el trigger necesita permiso para actuar como `BUILD_SA`.

## 4. Primer despliegue y acceso público

El primer despliegue no tiene una revisión previa que proteger. Ejecuta el build de forma controlada, valida la URL etiquetada y habilita acceso público una sola vez:

```bash
gcloud builds submit \
  --region="${REGION}" \
  --config=cloudbuild.yaml \
  --service-account="projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA}" \
  --substitutions="_REGION=${REGION},_REPOSITORY=${REPOSITORY},_SERVICE_NAME=${SERVICE},_RUNTIME_SERVICE_ACCOUNT=${RUNTIME_SA}"

gcloud run services add-iam-policy-binding "${SERVICE}" \
  --region="${REGION}" \
  --member="allUsers" \
  --role="roles/run.invoker"
```

El pipeline no modifica IAM. Cada commit se publica únicamente con `$COMMIT_SHA`, despliega `candidate-$SHORT_SHA` con 0% de tráfico, ejecuta smoke tests y promueve el tag solo al pasar.

## 5. Trigger GitHub sobre `main`

Después de conectar GitHub en Cloud Build, crea el trigger regional:

```bash
gcloud builds triggers create github \
  --name="kiloton-main" \
  --region="${REGION}" \
  --repo-owner="GITHUB_OWNER" \
  --repo-name="GITHUB_REPOSITORY" \
  --branch-pattern='^main$' \
  --build-config="cloudbuild.yaml" \
  --service-account="projects/${PROJECT_ID}/serviceAccounts/${BUILD_SA}" \
  --substitutions="_REGION=${REGION},_REPOSITORY=${REPOSITORY},_SERVICE_NAME=${SERVICE},_RUNTIME_SERVICE_ACCOUNT=${RUNTIME_SA}"
```

Confirma en la consola que la región, la expresión `^main$`, el archivo de configuración y la cuenta dedicada sean correctos. Ejecuta manualmente el trigger una vez y comprueba los pasos `validate`, `build`, `deploy-candidate`, `smoke-candidate` y `promote`.

## 6. Dominio y DNS

Crea el mapeo después de validar el servicio:

```bash
gcloud beta run domain-mappings create \
  --service="${SERVICE}" \
  --domain="DOMINIO_PRODUCCION" \
  --region="${REGION}"

gcloud beta run domain-mappings describe \
  --domain="DOMINIO_PRODUCCION" \
  --region="${REGION}"
```

Copia exactamente los registros DNS que devuelve Google. Espera a que el certificado figure como activo y verifica HTTPS, la home, `/api/health`, login y registro. No cierres el go-live con DNS/TLS pendiente.

## 7. Monitoreo y alertas

En Cloud Monitoring:

1. Crea un uptime check HTTPS público contra `https://DOMINIO_PRODUCCION/api/health` que espere HTTP 200 y `status` igual a `ok`.
2. Crea una política de alerta por dos o más fallas consecutivas y enlaza un canal de notificaciones operativo.
3. Configura alertas adicionales para respuestas 5xx de Cloud Run y latencia según el SLO del equipo.
4. Ejecuta una prueba del canal y registra su recepción antes del go-live.

Después de cada despliegue:

```bash
curl --fail --show-error --silent "https://DOMINIO_PRODUCCION/api/health"
BASE_URL="https://DOMINIO_PRODUCCION" pnpm smoke
gcloud run services describe "${SERVICE}" \
  --region="${REGION}" \
  --format="table(status.traffic.revisionName,status.traffic.tag,status.traffic.percent,status.traffic.url)"
```

Comprueba también los seis headers de seguridad con `curl -I`, la consola del navegador y la carga de imágenes, fuentes, carrusel, testimonios, premios y CTA en desktop/mobile.

## 8. Fallas y promoción segura

Si lint, build, health o smoke falla, Cloud Build termina antes de `promote`; la revisión candidata conserva 0% y producción sigue en la revisión anterior. Consulta logs y reproduce localmente antes de reintentar.

Para probar este mecanismo, usa una rama temporal con una falla controlada y ejecuta la configuración manualmente sin fusionarla a `main`. Confirma que `update-traffic` no se ejecute y que la revisión productiva mantenga 100%.

## 9. Rollback

Lista revisiones y tráfico:

```bash
gcloud run revisions list \
  --service="${SERVICE}" \
  --region="${REGION}" \
  --format="table(metadata.name,status.conditions[0].status,metadata.creationTimestamp)"

gcloud run services describe "${SERVICE}" \
  --region="${REGION}" \
  --format="table(status.traffic.revisionName,status.traffic.tag,status.traffic.percent)"
```

Envía todo el tráfico a una revisión conocida:

```bash
gcloud run services update-traffic "${SERVICE}" \
  --region="${REGION}" \
  --to-revisions="REVISION_ANTERIOR=100"
```

Ejecuta health y smoke contra producción. Para restaurar la revisión actual, repite el comando con su nombre. No elimines revisiones ni imágenes hasta terminar el ensayo y confirmar métricas.

## 10. Rotación y auditoría

- Revoca los tokens históricos del API legado y DatoCMS en sus proveedores antes del go-live, aunque ya no aparezcan en el árbol actual.
- Ejecuta secret scanning sobre el repositorio y su historial. Reescribe el historial únicamente si la política corporativa lo exige y coordina el cambio con todos los clones.
- Rota claves de cuentas humanas o de servicio; Cloud Build y Cloud Run deben usar identidades administradas sin archivos JSON.
- Revisa trimestralmente IAM, triggers, dominio/certificado, uptime check, canal de alertas y políticas de limpieza.
