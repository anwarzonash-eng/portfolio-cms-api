# Roadmap

Planned work on this project:

## Security and configuration
- [ ] Restrict CORS to configured origins instead of `*`
- [ ] Rename the `aws_*` / `adminUser` env variables to consistent UPPER_CASE names
- [ ] Add rate limiting and request logging
- [ ] Review all endpoints for authorization checks

## Quality
- [ ] Add automated tests (Jest + Supertest) for auth, profiles and reports
- [ ] Add ESLint and Prettier
- [ ] Replace deprecated `aws-sdk` v2 with AWS SDK v3
- [ ] Remove dead / commented-out code across services

## Features
- [ ] Database migrations instead of ad-hoc SQL files
- [ ] Seed script with sample data
- [ ] OpenAPI / Swagger documentation for all routes
- [ ] Pagination and filtering on list endpoints
- [ ] Improve the CV / report generation queries

## DevOps
- [ ] Improve the Dockerfile (multi-stage build, `npm ci`, non-root user)
- [ ] GitHub Actions workflow for lint, test and build
- [ ] Add a docker-compose file with PostgreSQL for local development
