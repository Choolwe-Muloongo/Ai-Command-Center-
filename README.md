# AI Command Center Foundation

## Architecture Map
- `apps/generator`: internal platform (auth, intake, template selection, project generation).
- `apps/generated-runtime`: optional runtime host for generated systems.
- `packages/business-os-core`: RBAC, scoping, audit helpers.
- `packages/module-registry`: template modules.
- `packages/style-presets`: theme presets.
- `packages/reports-engine`: report configs.
- `packages/pdf-engine`: PDF config registry.
- `prisma`: core data model + seeds.

## Local Setup
1. `pnpm install`
2. Copy `.env.example` to `.env`.
3. For PostgreSQL local: keep `DATABASE_PROVIDER=postgresql`.
4. For SQLite preview: set `DATABASE_PROVIDER=sqlite` and `DATABASE_URL=$SQLITE_DATABASE_URL`.
5. `pnpm prisma:generate && pnpm prisma:migrate && pnpm prisma:seed`
6. `pnpm dev`

## Generator UX Baseline
- Internal login: `/login`
- Template selector: `/admin/templates`
- Intake form + pricing tier scaffold: `/admin/intake`
- Generate project API: `POST /api/generate-project`

## Tenant/Rental Vertical Slice
See `docs/tenant-rental-handover.md`.
