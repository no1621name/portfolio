---
name: YMaps Parser
stack:
  - vue
  - vue-router
  - typescript
  - tanstack-query
  - tailwindcss
  - php
  - laravel
  - docker
link: https://github.com/no1621name/ymaps-parser
image: /images/projects/ymaps-parser.png
---

An application for parsing organization reviews from Yandex Maps. It accepts a link to an organization, extracts basic info (name, rating, review count), and collects all available reviews with pagination.

Architecture: a Vue 3 SPA communicates with a Laravel backend via REST API with Sanctum authentication. Heavy parsing operations are offloaded to a queue, and progress is streamed to the frontend via Server-Sent Events (SSE).

Key features:
- **Two-level parsing strategy** — primary API parser with parallel requests (concurrency = 3) and automatic fallback to a headless browser (Puppeteer via spatie/browsershot) on API errors
- **Rate-limit handling** — on 429 responses, automatically switches to sequential requests with random delay; on repeated 429, retries once
- **Canary check** — daily automated API health check via an artisan command that runs the full pipeline without writing to the database
- **Review storage** — reviews are persisted in a local database for extensibility (adding new metadata without losing old data) and convenient business analytics

The frontend follows the Feature-Sliced Design (FSD) architecture. UI is built with DaisyUI on top of Tailwind CSS, HTTP requests use ofetch. The network parsing path is covered by fixture-based tests (10 unit, 3 integration, plus headless parser tests).
