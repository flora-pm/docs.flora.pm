# docs.flora.pm

Documentation for [Flora](https://flora.pm).

## Run locally

```bash
npm ci
npm run docs:dev
```

The API Reference page (`.vitepress/api-reference.html`) loads the OpenAPI
specification from `https://flora.pm/documentation/openapi.json`.

To use a local flora-server instead, set `VITE_OPENAPI_URL`:

```bash
VITE_OPENAPI_URL=http://localhost:8084/documentation/openapi.json npm run docs:dev
```

`VITE_OPENAPI_URL` can also be set in a `.env` file. It is read when VitePress starts.

## Build

```bash
npm run docs:build
npm run docs:preview
```
