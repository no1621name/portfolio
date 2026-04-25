# Portfolio Architecture

## Content Structure

The portfolio uses a hybrid approach for internationalization:

- **Shared data** (skills): Stored directly in `content/` - these are reusable across all locales
- **Localized content** (experience, projects, about, contacts): Stored in locale directories `content/en/` and `content/ru/`

```
content/
  skills.json              # Shared across all locales
  en/                  # English content
    experience/
    projects/
    about.md
    contacts.md
  ru/                  # Russian content
    experience/
    projects/
    about.md
    contacts.md
```

## Content Collections

### Relationships Between Collections

The portfolio uses custom `slug` fields to create one-to-many relationships between collections. This approach is necessary because:

- File-based i18n requires consistent identifiers across locales
- Nuxt Content's built-in `stem` field includes directory paths (e.g., `skills/react`), making it unsuitable for clean references
- Custom `slug` fields provide locale-independent, human-readable identifiers

**How it works:**
- Each entity (skill, company) has a unique `slug` field
- Projects reference skills and companies using these slugs
- Queries use `where('slug', 'in', array)` to fetch related items

### Skills Collection
**Source**: `content/skills.json`

**Fields**:
- `slug` (string): Unique identifier for referencing (e.g., `react`, `vue`)
- `name` (string): Skill name
- `icon` (string): Iconify icon identifier (e.g., `i-logos-react`)
- `link` (string): URL to documentation or resource
- `category` (string): Category for grouping (e.g., "Frontend", "Backend", "Tools")
- `description` (string, optional): Short description

**Example** (`content/skills.json`):
```json
{
  "slug": "react",
  "name": "React",
  "icon": "i-logos-react",
  "link": "https://react.dev/",
  "category": "Frontend",
}
```

### Experience Collection
**Source**: `content/{locale}/experience/**/*.md`

**Fields**:
- `slug` (string): Unique identifier for referencing (e.g., `uscode`, `drozzi`)
- `company` (string): Company name
- `startDate` (string): Start date (ISO format)
- `endDate` (string, optional): End date (ISO format, or "present")
- `jobTitle` (string): Job title
- **Content**: Markdown description of responsibilities and achievements

**Example** (`content/en/experience/uscode.md`):
```yaml
---
slug: uscode
company: UsCode
startDate: 2024-12-01
endDate: 2025-08-01
jobTitle: Frontend Developer / Lead
---

...description
```

### Projects Collection
**Source**: `content/{locale}/projects/**/*.md`

**Fields**:
- `name` (string): Project name
- `stack` (array<string>): Array of skill slugs (references to skills collection)
- `company` (string, optional): Company slug (reference to experience collection)
- `link` (string, optional): Project URL
- **Content**: Markdown description of the project

**Example** (`content/en/projects/ai-notes.md`):
```yaml
---
name: AI Notes
stack:
  - vue
  - tanstack-query
  - tiptap
  - supabase
company: uscode
link: https://github.com/example/ai-notes
---

...description
```

**Querying related skills:**
```javascript
// Get skills for a project (skills are shared across all locales)
const skills = await queryCollection('skills')
  .where('slug', 'in', project.stack)
  .all()
```

### About Collection
**Source**: `content/{locale}/about.md`

**Fields**:
- `title` (string): Page title
- **Content**: Markdown content about the person

### Contacts Collection
**Source**: `content/{locale}/contacts.md`

**Fields**:
- `title` (string): Page title
- `email` (string): Email address
- `telegram` (string): Telegram username
- `github` (string, optional): GitHub username
- `linkedin` (string, optional): LinkedIn URL
- **Content**: Markdown content (additional contact info)

## Querying Relationships

### Fetching Skills for a Project
```javascript
const project = await queryCollection('projects_en').path('/en/projects/ai-notes').first()

// Get all skills referenced by the project (skills are shared across all locales)
const skills = await queryCollection('skills')
  .where('slug', 'in', project.stack)
  .all()
```

### Fetching Company for a Project
```javascript
const project = await queryCollection('projects_en').path('/en/projects/ai-notes').first()

// Get company details if project has a company reference (experience is locale-specific)
if (project.company) {
  const company = await queryCollection('experience_en')
    .where('slug', '=', project.company)
    .first()
}
```

### Fetching Projects by Company
```javascript
// Get all projects for a specific company (locale-specific)
const companyProjects = await queryCollection('projects_en')
  .where('company', '=', 'uscode')
  .all()
```

### Fetching Projects by Skill
```javascript
// Get all projects that use a specific skill (locale-specific)
const skillProjects = await queryCollection('projects_en')
  .where('stack', 'contains', 'vue')
  .all()
```

## Pages Structure

### `/stack` - Skills Page
- Fetches skills from `skills` collection (shared across all locales)
- Groups skills by category
- Displays icon, name, and link for each skill
- Locale determined by URL path (e.g., `/en/stack`, `/ru/stack`)

### `/experience` - Experience Page
- Fetches experience entries from `experience` collection in current locale directory
- Sorts by date (most recent first)
- Displays company, dates, job title, and markdown description
- Locale determined by URL path

### `/projects` - Projects Page
- Fetches projects from `projects` collection in current locale directory
- Multi-select filters for:
  - Company (unique values from projects)
  - Stack (unique values from projects)
- Displays project name, description, stack tags, and link
- Locale determined by URL path

### `/contacts` - Contacts Page
- Fetches contact info from `contacts` collection in current locale directory
- Displays contact information (email, telegram, etc.)
- Contact form with fields: name, email, message
- Form submits to server route `/api/contact`
- Locale determined by URL path

### `/about` - About Me Page
- Fetches content from `about` collection in current locale directory
- Displays markdown content
- Locale determined by URL path

## Server Routes

### `/api/contact` - Contact Form Handler
- Method: POST
- Body: `{ name, telegram, message }`
- Validates input
- Sends message to Telegram bot API
- Returns success/error response
- Protected with CAPTCHA

## Components

### Navigation
- Links to all pages
- Language switcher (EN/RU)

### Language Switcher
- Toggles between English and Russian
- Updates URL locale parameter
- Persists preference

### Project Filters
- Multi-select checkboxes for company and stack
- Updates project list based on selected filters

### Contact Form
- Form with name, email, message fields
- Client-side validation
- Submits to `/api/contact`

## Internationalization

- Uses Nuxt i18n module with file-structure based locales
- **Shared data**: Skills stored in `content/skills/` - available across all locales
- **Localized content**: Experience, projects, about, and contacts stored in locale directories `content/en/` and `content/ru/`
- Locale parameter in URL (e.g., `/en/stack`, `/ru/stack`)
- Nuxt Content automatically serves content from the correct locale directory based on current locale
- Default locale: Russian
- No `locale` field needed in content files - determined by directory structure
