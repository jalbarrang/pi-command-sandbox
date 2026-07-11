# @dreki-gg/pi-command-sandbox

## [0.4.0](https://github.com/jalbarrang/pi-command-sandbox/compare/v0.3.2...v0.4.0) (2026-07-11)


### Features

* extract pi-command-sandbox from dreki-gg/pi-extensions monorepo ([05412c8](https://github.com/jalbarrang/pi-command-sandbox/commit/05412c8648b0808b18e1fe1c4c585e291bf52e40))

## 0.3.0

### Minor Changes

- Add safe patterns for help, version, and man commands (--help, -h, --version, -v/-V, man, help, info) so sandboxed modes can explore CLI options without being blocked.

## 0.2.1

### Patch Changes

- Fix stderr redirects to /dev/null (e.g. `2>/dev/null`) being incorrectly blocked as dangerous redirects. Only stdout redirects (`>`, `>>`) are now flagged.

## 0.2.0

### Minor Changes

- Make package public — no longer private, published to registry as a standalone dependency.
