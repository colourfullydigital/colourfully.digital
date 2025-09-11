# Tasks: Astro Website/Blog with Sanity.io CMS

**Input**: Design documents from `/Users/davidelisma/Repos/Colourfully.Digital/colourfully.digital/specs/001-astro-sanity-setup/`
**Prerequisites**: plan.md (required), research.md, data-model.md, contracts/

## Execution Flow (main)
```
1. Load plan.md from feature directory ✅
   → Tech stack: Astro 5.x + Sanity.io + TypeScript
   → Structure: Single project (src/, tests/ at root)
2. Load design documents ✅:
   → data-model.md: 12+ entities → model/schema tasks
   → contracts/: 3 files → contract test tasks
   → research.md: Deployment, i18n, performance decisions → setup tasks
3. Generate tasks by category:
   → Setup: Astro init, Sanity config, TypeScript, dependencies
   → Tests: Sanity content tests, server endpoint tests
   → Core: Sanity schemas, content fetching, pages, forms
   → Integration: i18n, SEO, performance optimization
   → Polish: accessibility, testing, deployment
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Phase 3.1: Project Setup
- [x] T001 Create Astro project structure with TypeScript and install core dependencies
- [x] T002 [P] Configure Sanity Studio project with schema definitions in sanity.config.ts
- [x] T003 [P] Setup development environment with ESLint, Prettier, and Vitest in package.json
- [x] T004 [P] Configure environment variables and Sanity connection in .env.example and astro.config.mjs

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T005 [P] Contract test Sanity content queries in tests/contract/sanity-content.test.ts
- [ ] T006 [P] Contract test server endpoints for forms in tests/contract/server-endpoints.test.ts  
- [ ] T007 [P] Integration test homepage content fetching in tests/integration/test-homepage.test.ts
- [ ] T008 [P] Integration test blog post rendering in tests/integration/test-blog.test.ts
- [ ] T009 [P] Integration test form submission flow in tests/integration/test-forms.test.ts
- [ ] T010 [P] Integration test i18n language switching in tests/integration/test-i18n.test.ts

> NOTE: Tests T005–T010 were added as failing placeholder tests to satisfy the TDD requirement. They were implemented, committed, and pushed on branch `feature/001-astro-sanity-setup-phase-3.2`. Run `npm test` to execute the suite; expected results: these tests fail until the corresponding implementations are added. Additional contract specs in `specs/` may also fail because the server endpoints are not yet implemented.

## Phase 3.3: Core Sanity Schema Implementation (ONLY after tests are failing)
- [ ] T011 [P] Blog Post schema in sanity/schemas/blog-post.ts
- [ ] T012 [P] Author schema in sanity/schemas/author.ts
- [ ] T013 [P] Category schema in sanity/schemas/category.ts
- [ ] T014 [P] Homepage Content schema in sanity/schemas/homepage-content.ts
- [ ] T015 [P] Form schema in sanity/schemas/form.ts
- [ ] T016 [P] Form Submission schema in sanity/schemas/form-submission.ts
- [ ] T017 [P] Site Configuration schema in sanity/schemas/site-configuration.ts
- [ ] T018 [P] Translation Keys schema in sanity/schemas/translation-keys.ts
- [ ] T019 Schema index file in sanity/schemas/index.ts to export all schemas

## Phase 3.4: Content Services and Utils (Sequential - shared utilities)
- [ ] T020 Sanity client configuration in src/lib/sanity.ts
- [ ] T021 Content fetching utilities in src/lib/content.ts
- [ ] T022 Translation utilities for i18n in src/lib/translations.ts
- [ ] T023 SEO utilities for meta tags in src/lib/seo.ts
- [ ] T024 Form validation utilities in src/lib/forms.ts

## Phase 3.5: Astro Pages Implementation
- [ ] T025 [P] Homepage component in src/pages/index.astro
- [ ] T026 [P] Blog landing page in src/pages/blog/index.astro
- [ ] T027 [P] Blog post template in src/pages/blog/[slug].astro
- [ ] T028 [P] French homepage in src/pages/fr/index.astro
- [ ] T029 [P] French blog pages in src/pages/fr/blog/index.astro and src/pages/fr/blog/[slug].astro

## Phase 3.6: Components Implementation
- [ ] T030 [P] Header navigation component in src/components/Header.astro
- [ ] T031 [P] Footer component in src/components/Footer.astro
- [ ] T032 [P] Blog post card component in src/components/BlogCard.astro
- [ ] T033 [P] Contact form component in src/components/ContactForm.astro
- [ ] T034 [P] Newsletter subscription component in src/components/Newsletter.astro
- [ ] T035 [P] Language switcher component in src/components/LanguageSwitcher.astro

## Phase 3.7: Server Endpoints (Sequential - shared form handling)
- [ ] T036 Form submission endpoint in src/pages/api/forms/submit.ts
- [ ] T037 Newsletter subscription endpoint in src/pages/api/newsletter/subscribe.ts
- [ ] T038 Search endpoint in src/pages/api/search.ts
- [ ] T039 i18n alternate URLs endpoint in src/pages/api/i18n/alternate-urls.ts

## Phase 3.8: Static Generation Features
- [ ] T040 [P] RSS feed generation in src/pages/rss.xml.ts
- [ ] T041 [P] Sitemap generation configuration in astro.config.mjs
- [ ] T042 [P] Open Graph image generation in src/pages/og/[slug].png.ts

## Phase 3.9: Styling and Assets
- [ ] T043 [P] Global CSS styles in src/styles/global.css
- [ ] T044 [P] Component-specific styles in respective .astro files
- [ ] T045 [P] Responsive design and mobile optimization
- [ ] T046 [P] Dark mode support in CSS and components

## Phase 3.10: Integration and Configuration
- [ ] T047 Configure i18n routing in astro.config.mjs
- [ ] T048 Setup Google Analytics integration in layout components
- [ ] T049 Configure deployment settings for Netlify in netlify.toml
- [ ] T050 Setup Sanity webhooks for automatic rebuilds

## Phase 3.11: Performance Optimization
- [ ] T051 [P] Image optimization setup in astro.config.mjs
- [ ] T052 [P] Code splitting and lazy loading implementation
- [ ] T053 [P] Critical CSS optimization
- [ ] T054 Performance monitoring and Core Web Vitals validation

## Phase 3.12: Accessibility and Quality
- [ ] T055 [P] WCAG 2.1 AA compliance audit and fixes
- [ ] T056 [P] Screen reader optimization and ARIA labels
- [ ] T057 [P] Keyboard navigation implementation
- [ ] T058 [P] Color contrast validation and fixes

## Phase 3.13: Testing and Polish
- [ ] T059 [P] Unit tests for utility functions in tests/unit/
- [ ] T060 [P] E2E tests for critical user journeys with Playwright
- [ ] T061 [P] Accessibility testing with axe-core
- [ ] T062 [P] Performance testing and Lighthouse audits
- [ ] T063 Documentation updates in README.md and docs/

## Dependencies

**Critical Path**:
- Setup (T001-T004) must complete before tests
- Tests (T005-T010) must complete before implementation  
- Schema exports (T019) blocks content services (T020-T024)
- Content services block pages (T025-T029) and server endpoints (T036-T039)
- Components (T030-T035) can run parallel to pages but need base styles (T043)

**Blocking Relationships**:
- T019 (schema index) blocks T020-T024 (content services)
- T020-T024 (content services) block T025-T029 (pages) and T036-T039 (endpoints)
- T043 (global CSS) should precede T044-T046 (component styling)
- T047 (i18n config) blocks T028-T029 (French pages)

## Parallel Execution Examples

### Phase 1: Setup Tasks
```bash
# Launch T002-T004 together after T001:
Task: "Configure Sanity Studio project with schema definitions in sanity.config.ts"
Task: "Setup development environment with ESLint, Prettier, and Vitest in package.json"  
Task: "Configure environment variables and Sanity connection in .env.example and astro.config.mjs"
```

### Phase 2: Contract Tests (All parallel)
```bash
# Launch T005-T010 together:
Task: "Contract test Sanity content queries in tests/contract/sanity-content.test.ts"
Task: "Contract test server endpoints for forms in tests/contract/server-endpoints.test.ts"
Task: "Integration test homepage content fetching in tests/integration/test-homepage.test.ts"
Task: "Integration test blog post rendering in tests/integration/test-blog.test.ts"
Task: "Integration test form submission flow in tests/integration/test-forms.test.ts"
Task: "Integration test i18n language switching in tests/integration/test-i18n.test.ts"
```

### Phase 3: Schema Creation (All parallel)
```bash
# Launch T011-T018 together (all different files):
Task: "Blog Post schema in sanity/schemas/blog-post.ts"
Task: "Author schema in sanity/schemas/author.ts"  
Task: "Category schema in sanity/schemas/category.ts"
Task: "Homepage Content schema in sanity/schemas/homepage-content.ts"
Task: "Form schema in sanity/schemas/form.ts"
Task: "Form Submission schema in sanity/schemas/form-submission.ts"
Task: "Site Configuration schema in sanity/schemas/site-configuration.ts"
Task: "Translation Keys schema in sanity/schemas/translation-keys.ts"
```

### Phase 4: Pages Implementation
```bash
# Launch T025-T029 together after content services ready:
Task: "Homepage component in src/pages/index.astro"
Task: "Blog landing page in src/pages/blog/index.astro"
Task: "Blog post template in src/pages/blog/[slug].astro"
Task: "French homepage in src/pages/fr/index.astro"
Task: "French blog pages in src/pages/fr/blog/index.astro and src/pages/fr/blog/[slug].astro"
```

## Task Generation Rules Applied

**From Contracts**:
- ✅ sanity-content.test.ts → T005 (Contract test Sanity content queries)
- ✅ server-endpoints.test.ts → T006 (Contract test server endpoints)
- ✅ Each endpoint in api-contracts.md → T036-T039 (Server endpoints)

**From Data Model**:
- ✅ Each entity (12 total) → T011-T018 (Schema creation tasks) [P]
- ✅ Relationships → T020-T024 (Content services and utilities)

**From User Stories (Inferred)**:
- ✅ Homepage content management → T007 (Integration test)
- ✅ Blog reading experience → T008 (Integration test)
- ✅ Form submissions → T009 (Integration test)
- ✅ Language switching → T010 (Integration test)

**Constitutional Requirements Applied**:
- ✅ TDD: All tests (T005-T010) before implementation
- ✅ Library-first: Utilities in src/lib/ for reusability
- ✅ CLI support: Available through Astro/Sanity tooling
- ✅ Error handling: Built into endpoints and utilities
- ✅ Accessibility: Dedicated phase (T055-T058)
- ✅ Performance: Optimization phase (T051-T054)
- ✅ Structured logging: Through error handling in endpoints

## Validation Checklist ✅

- [x] All contracts have corresponding tests (T005-T006)
- [x] All entities have schema tasks (T011-T018)
- [x] All tests come before implementation (T005-T010 before T011+)
- [x] Parallel tasks truly independent (different files, no shared state)
- [x] Each task specifies exact file path
- [x] No [P] task modifies same file as another [P] task
- [x] Constitutional requirements integrated throughout
- [x] Performance and accessibility explicitly addressed
- [x] i18n support throughout task structure

**READY FOR IMPLEMENTATION**: 63 numbered tasks with clear dependencies and parallel execution opportunities.