# Portfolio - Nuxt 4 + Nuxt Content v3

## Project Overview
A bilingual (EN/RU) portfolio website showcasing programming skills, work experience, projects, and contact information. Built with Nuxt 4 and Nuxt Content v3 collections as the data source for all content.

### Pages
- **Stack/Skills** (`/stack`): Categorized list of skills with Iconify icons, names, and links
- **Experience** (`/experience`): Work experience with company details, dates, job titles, and markdown descriptions
- **Projects** (`/projects`): Project showcase with multi-select filters for company and stack technologies
- **Contacts** (`/contacts`): Contact information and form that submits to Telegram via server route
- **About Me** (`/about`): Personal information page

### Key Features
- Bilingual support with language switcher
- Nuxt Content v3 collections for all data (skills, experience, projects, contacts, about)
- Multi-select filtering for projects by company and stack
- Server-side contact form submission to Telegram
- Iconify icons for skills

## Tech Stack
- Nuxt 4.4.2 with Nuxt Content v3 collections
- Nuxt UI v4 + Tailwind CSS v4
- pnpm workspace (monorepo structure)
- TypeScript with project references
- SQLite (better-sqlite3)

## Commands
```bash
pnpm dev          # Start dev server
pnpm build        # Build for production
pnpm generate     # Generate static site
pnpm preview      # Preview production build
pnpm lint         # Run ESLint 
pnpm lint:vue     # Run nuxt typecheck
pnpm lint:fix     # Run ESlint with autofix
```

## Architecture
For architecture details view [architercure doc](ARCHITECTURE.md)

## Design
For architecture details view [design doc](DESIGN.md)


## Important Notes
- Use `queryCollection()` API for Nuxt Content v3, not old `queryContent()`
- Pages collection requires `/pages` prefix in path queries
- Do not run `build`, `dev` or `generate` commands if you were not asked. For result validation use `lint` and `lint:vue`
- Projects fetched in app.vue are available globally
- ESLint config extends Nuxt's generated config (`.nuxt/eslint.config.mjs`)
- No test framework or CI/CD configured
- OpenCode MCP integration with Nuxt UI available via opencode.json
- For component files use kebab-case