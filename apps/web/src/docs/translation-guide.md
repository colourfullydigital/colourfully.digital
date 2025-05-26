# Content Translation Guide

## Overview

This guide explains how to manage translations for the Colourfully Digital website. We support both English (en) and French (fr) content using a combination of JSON and YAML files.

## File Structure

Translations are organized into three main categories:

```
src/i18n/
├── common/       # Shared translations (navigation, footer, etc.)
├── pages/        # Page-specific content
└── components/   # Component-specific translations
```

## File Formats

We use two file formats:

1. **JSON** (.json) - For simple key-value translations
2. **YAML** (.yaml) - For complex, nested content with multiline text

### When to Use JSON vs YAML

- Use **JSON** for:
  - Simple translations
  - Navigation items
  - Button labels
  - Form fields

- Use **YAML** for:
  - Long content blocks
  - Complex nested structures
  - Content with multiple paragraphs
  - Marketing copy

## Translation Structure

### Basic Translation

Each translation key must include both English and French versions:

```yaml
welcome:
  title:
    en: "Welcome to our site"
    fr: "Bienvenue sur notre site"
```

### Pluralization

For content that changes based on numbers, use plural forms:

```yaml
items:
  zero:              # When count is 0
    en: "No items"
    fr: "Aucun élément"
  one:               # When count is 1
    en: "One item"
    fr: "Un élément"
  other:             # For all other numbers
    en: "{{count}} items"
    fr: "{{count}} éléments"
```

### Variables

Use double curly braces for variables:

```yaml
greeting:
  en: "Hello, {{name}}!"
  fr: "Bonjour, {{name}} !"
```

## Best Practices

1. **Keep Keys Organized**
   - Use descriptive key names
   - Group related translations together
   - Follow the established hierarchy

2. **Maintain Consistency**
   - Use consistent terminology
   - Keep the same structure in both languages
   - Preserve formatting and punctuation

3. **Context Comments**
   - Add comments for complex translations
   - Explain any special formatting
   - Note any character limits

Example with comments:
```yaml
# Main call-to-action button - keep text short (max 20 chars)
cta:
  button:
    en: "Get Started"
    fr: "Commencer"

# Homepage hero section - HTML allowed
hero:
  title:
    en: "Welcome to <em>Our Site</em>"
    fr: "Bienvenue sur <em>Notre Site</em>"
```

## Translation Process

1. **Adding New Content**
   - Add the English version first
   - Mark it for translation (TODO comment)
   - Notify the translation team

2. **Review Process**
   - Technical review (format check)
   - Content review (accuracy)
   - Final approval

3. **Deployment**
   - Translations are deployed with code updates
   - Emergency fixes can be deployed separately

## Testing Translations

Before submitting:
1. Check for missing translations
2. Verify variables are correctly used
3. Test plural forms
4. Preview in both languages

## Common Issues

1. **Missing Translations**
   - Every key must have both 'en' and 'fr' versions
   - Use TODO comments for pending translations

2. **Invalid Format**
   - Check proper nesting
   - Verify quotes around text
   - Maintain consistent indentation

3. **Character Limits**
   - Button text: 20 characters max
   - Titles: 60 characters max
   - Meta descriptions: 155 characters max

## Tools and Resources

- Translation validation tool: `npm run validate-translations`
- Translation status: `npm run translation-status`
- Preview tool: `npm run preview-translations`

## Need Help?

- Technical issues: Contact the development team
- Translation questions: Contact the content team
- Urgent fixes: Use the emergency translation process
