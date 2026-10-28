import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import type { Plugin, ResolvedConfig } from 'vite'

const require = createRequire(import.meta.url)
const bundlePath = require.resolve('redoc/bundles/redoc.standalone.js')
const templatePath = new URL('./api-reference.html', import.meta.url)
const tokensPath = new URL('./theme/tokens.css', import.meta.url)

function render(config: ResolvedConfig, redocSrc: string): string {
  const base = config.base
  const specUrl = config.env.VITE_OPENAPI_URL || 'https://flora.pm/documentation/openapi.json'
  const tokens = readFileSync(tokensPath, 'utf8').replaceAll('url("/', () => `url("${base}`)
  return readFileSync(templatePath, 'utf8')
    .replace('%TOKENS%', () => tokens)
    .replaceAll('%BASE%', () => base)
    .replace('%REDOC_SRC%', () => redocSrc)
    .replace('%SPEC_URL%', () => JSON.stringify(specUrl).replace(/</g, '\\u003c'))
}

export function redocPage(): Plugin[] {
  return [
    {
      name: 'flora-redoc-page:serve',
      apply: 'serve',
      configureServer(server) {
        const base = server.config.base
        server.middlewares.use((req, res, next) => {
          const path = req.url?.split(/[?#]/)[0]
          if (path === `${base}api-reference` || path === `${base}api-reference.html`) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end(render(server.config, `${base}redoc.standalone.js`))
          } else if (path === `${base}redoc.standalone.js`) {
            res.setHeader('Content-Type', 'text/javascript; charset=utf-8')
            res.end(readFileSync(bundlePath))
          } else {
            next()
          }
        })
      },
    },
    buildPlugin(),
  ]
}

function buildPlugin(): Plugin {
  let config: ResolvedConfig
  return {
    name: 'flora-redoc-page:build',
    apply: (userConfig, { command }) => command === 'build' && !userConfig.build?.ssr,
    configResolved(resolved) {
      config = resolved
    },
    generateBundle() {
      const bundle = this.emitFile({ type: 'asset', name: 'redoc.standalone.js', source: readFileSync(bundlePath) })
      const page = render(config, `${config.base}${this.getFileName(bundle)}`)
      this.emitFile({ type: 'asset', fileName: 'api-reference.html', source: page })
    },
  }
}
