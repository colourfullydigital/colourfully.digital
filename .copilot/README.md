# Copilot Configuration

This directory contains configuration files that guide GitHub Copilot in providing appropriate suggestions for our project's specific tech stack.

## Tech Stack Specifications

- **Astro**: v5.8
- **Vite**: v6
- **Tailwind CSS**: v4.1.7
- **PostCSS**: v8.5.3

## How It Works

The `stack-rules.json` file provides Copilot with:
- Version-specific requirements for each technology
- Links to official documentation
- Specific rules and best practices
- Compatibility requirements
- General coding guidelines

## Enforcement

The configuration enforces:
1. **Documentation Checks**: Copilot must reference official documentation
2. **Version Validation**: Ensures suggestions match our versions
3. **Compatibility Verification**: Validates cross-tool compatibility
4. **Update Policy**: Requires manual review of version updates

## Updating Rules

When updating any part of the tech stack:
1. Update the corresponding version in `stack-rules.json`
2. Update documentation URLs if needed
3. Review and update specific rules for the changed technology
4. Verify compatibility with other tools in the stack

## Need Help?

Reference the official documentation for each tool:
- Astro: https://docs.astro.build/
- Vite: https://vitejs.dev/guide/
- Tailwind: https://tailwindcss.com/docs
- PostCSS: https://postcss.org/docs/
