# Colourfully Digital

[![CI](https://github.com/your-org/colourfully-digital/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/colourfully-digital/actions/workflows/ci.yml)
[![CD](https://github.com/your-org/colourfully-digital/actions/workflows/cd.yml/badge.svg)](https://github.com/your-org/colourfully-digital/actions/workflows/cd.yml)

This is a monorepo containing the Colourfully Digital website and CMS.

## What's inside?

This monorepo uses [pnpm](https://pnpm.io) as a package manager and [Turborepo](https://turbo.build/repo) as a build system. It includes the following packages/apps:

### Apps

- `web`: The main Colourfully Digital website
- `cms`: A Sanity-powered CMS for content management

### Packages

- `shared`: Shared utilities and types
- `eslint-config-custom`: Shared ESLint configuration
- `typescript-config`: Shared TypeScript configuration

## Setup

### Prerequisites

- Node.js >= 18
- pnpm >= 8

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/colourfully-digital.git
   cd colourfully-digital
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development

To develop all apps and packages:

```bash
pnpm dev
```

The web app will be available at `http://localhost:3000`
The CMS will be available at `http://localhost:3001`

### Build

To build all apps and packages:

```bash
pnpm build
```

### Lint

To lint all apps and packages:

```bash
pnpm lint
```

## Useful Commands

- `pnpm build` - Build all packages and apps
- `pnpm dev` - Develop all packages and apps
- `pnpm lint` - Lint all packages and apps
- `pnpm clean` - Clean all builds
- `pnpm format` - Format all files with Prettier

## Adding new packages

To create a new package:

1. Create a new directory in `packages/` or `apps/`
2. Add a `package.json`
3. Add the package to workspaces in root `package.json` if needed
4. Run `pnpm install` to update workspaces

## Version Control

This project uses Git for version control. Make sure to:

1. Create feature branches from `main`
2. Follow conventional commits
3. Submit pull requests for review

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Deployments

- Production: [https://colourfully.digital](https://colourfully.digital)
- Staging: [https://staging.colourfully.digital](https://staging.colourfully.digital)
- CMS Production: [https://cms.colourfully.digital](https://cms.colourfully.digital)
- CMS Staging: [https://staging-cms.colourfully.digital](https://staging-cms.colourfully.digital)
