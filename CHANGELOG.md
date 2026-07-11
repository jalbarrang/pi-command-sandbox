# @dreki-gg/pi-command-sandbox

## [0.4.2](https://github.com/jalbarrang/pi-command-sandbox/compare/v0.4.1...v0.4.2) (2026-07-11)


### Bug Fixes

* build dist before npm publish via prepublishOnly ([#6](https://github.com/jalbarrang/pi-command-sandbox/issues/6)) ([c527d17](https://github.com/jalbarrang/pi-command-sandbox/commit/c527d179ea8e97d0c9db828f038f726cf3213a48))

## [0.4.1](https://github.com/jalbarrang/pi-command-sandbox/compare/v0.4.0...v0.4.1) (2026-07-11)


### Bug Fixes

* expose top-level types and package metadata ([#2](https://github.com/jalbarrang/pi-command-sandbox/issues/2)) ([dc05bc8](https://github.com/jalbarrang/pi-command-sandbox/commit/dc05bc8f6ea854754e6c4678a5f1718deb8272aa))

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
