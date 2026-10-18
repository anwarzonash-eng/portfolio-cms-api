# Portfolio CMS API

A REST API that powers my personal portfolio / CV website and its admin panel. It stores profile data (experience, education, skills, portfolios, testimonials, photos, videos), generates CV / home / portfolio reports, manages email templates and short URLs, and can send emails with attachments through Gmail.

It is built for a single owner (me) who manages the content through a separate admin frontend, while a public website reads the same data.

## Tech stack

- Node.js, Express 4, Babel (ES modules via `@babel/preset-env`)
- PostgreSQL with Sequelize
- JWT authentication (`jsonwebtoken`, `bcrypt`)
- AWS S3 (uploads) and SES (email), Gmail OAuth2 via `googleapis` / `nodemailer`
- `class-validator` / `class-transformer` DTO validation
- Docker support (`Dockerfile`)

## Getting started

Requirements: Node.js 18+ and a PostgreSQL database.

```bash
git clone <this-repo-url>
cd <repo-folder>
npm install
cp .env.example .env     # then fill in your own values
npm run dev              # starts the API with nodemon + babel-node
```

Production build:

```bash
npm run build            # compiles src/ to dist/
npm start
```

Configuration is read from environment variables; see [.env.example](.env.example) for the full list. Real credentials must never be committed.

## Project structure

```
src/
  config/        environment configuration
  controllers/   Express routers (auth, profiles, portfolios, reports, leads, ...)
  dtos/          request validation classes
  models/        Sequelize models
  services/      business logic
  middleware/    auth, validation, error handling
  utils/         database, AWS, JWT, SQL report queries
```

## Roadmap

See [ROADMAP.md](ROADMAP.md).

## License

[MIT](LICENSE)
