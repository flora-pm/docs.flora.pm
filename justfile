[doc("Install the dependencies")]
@deps:
    @npm ci

[doc("Build the site into .vitepress/dist")]
@build:
    @npm run docs:build

[doc("Start the development server")]
@start:
    @npm run docs:dev

[doc("Start the development server with the API Reference reading a local flora-server")]
@start-local port="8084":
    @VITE_OPENAPI_URL=http://localhost:{{ port }}/documentation/openapi.json npm run docs:dev

[doc("Serve the built site")]
@preview: build
    @npm run docs:preview
