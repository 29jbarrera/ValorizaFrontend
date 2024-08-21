# Getting Started

NodeJs version: v20._._

Clone repo then install dependecies with

```bash
npm ci
```

Run dev mode

```bash
npm start
```

# CLI

Crear componente

```
ionic g component  --project=app-tablas --standalone
```

Crear pagina

```
ionic g page  --project=app-tablas --standalone
```

# Update swagger

Actualizar swagger maquinaria

```bash
bash update-swagger.sh
```

Actualizar swagger provisioning

```bash
bash update-swagger-provisioning.sh
```

# Testing

To run test we need run app in dev mode. Then we need prerate environment.

## Initialization

```bash
npx playwright codegen http://localhost:4200 --save-storage auth.json
```

Debemos realizar el login por popup. una vez realizado ya podemos

## Write test

```bash
npx playwright codegen http://localhost:4200 --load-storage auth.json
```
