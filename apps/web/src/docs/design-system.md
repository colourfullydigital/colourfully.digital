# Colourfully Digital Design System

This document outlines the core design system elements used across Colourfully Digital's web properties, implementing a neo-brutalist design approach with vibrant colors, bold typography, and playful elements.

## Design Tokens

### Colors

Our color system uses CSS custom properties for maximum flexibility and maintainability.

#### Primary Colors
```css
--color-green: #76E07F;
--color-orange: #FE6A25;
--color-yellow: #FFDA6B;
--color-blue: #5B7CFA;
--color-black: #121212;
--color-white: #FFFFFF;
```

#### Secondary Colors
```css
--color-green-light: #A0EBA6;
--color-green-dark: #4CB653;
--color-orange-light: #FF8F5A;
--color-orange-dark: #D44C0A;
--color-yellow-light: #FFE59A;
--color-yellow-dark: #E5B83C;
--color-blue-light: #8A9FFF;
--color-blue-dark: #3A5AD7;
```

#### System Colors
```css
--color-background: #FFFFFF;
--color-surface: #F5F5F5;
--color-surface-variant: #EEEEEE;
--color-border: #DDDDDD;

--color-text-primary: #121212;
--color-text-secondary: #555555;
--color-text-hint: #888888;
--color-text-on-primary: #FFFFFF;
--color-text-on-dark: #FFFFFF;
```

### Typography

#### Font Families
```css
--font-primary: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'Roboto Mono', 'Courier New', monospace;
```

#### Font Sizes
```css
--font-size-xs: 0.75rem;
--font-size-sm: 0.875rem;
--font-size-base: 1rem;
--font-size-lg: 1.125rem;
--font-size-xl: 1.25rem;
--font-size-2xl: 1.5rem;
--font-size-3xl: 1.875rem;
--font-size-4xl: 2.25rem;
--font-size-5xl: 3rem;
--font-size-6xl: 3.75rem;
--font-size-7xl: 4.5rem;
```

#### Font Weights
```css
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
--font-weight-black: 900;
```

### Spacing

```css
--space-unit: 0.25rem;
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 0.75rem;
--space-4: 1rem;
--space-5: 1.5rem;
--space-6: 2rem;
--space-8: 2.5rem;
--space-10: 3rem;
--space-12: 4rem;
--space-16: 6rem;
--space-20: 8rem;
```

### Shadows

Our neo-brutalist design uses bold, offset shadows:

```css
--shadow-none: none;
--shadow-sm: 4px 4px 0 0 rgba(0, 0, 0, 0.9);
--shadow-md: 8px 8px 0 0 rgba(0, 0, 0, 0.9);
--shadow-lg: 12px 12px 0 0 rgba(0, 0, 0, 0.9);
--shadow-inner: inset 4px 4px 0 0 rgba(0, 0, 0, 0.1);
```

### Border Radius

```css
--radius-none: 0;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-2xl: 24px;
--radius-full: 9999px;
```

## Dark Mode

Dark mode is implemented using a data-theme attribute on the HTML element. Example usage:

```css
[data-theme="dark"] {
  --color-background: #121212;
  --color-surface: #1E1E1E;
  --color-surface-variant: #2A2A2A;
  --color-border: #333333;
  
  --color-text-primary: #FFFFFF;
  --color-text-secondary: #BBBBBB;
  --color-text-hint: #888888;
}
```

### Animations & Transitions

Our animation system emphasizes playful, energetic movements that complement our neo-brutalist design approach. We use a combination of transforms and transitions to create engaging interactions.

#### Timing Variables
```css
--animation-fast: 150ms;
--animation-normal: 300ms;
--animation-slow: 500ms;
--animation-very-slow: 1000ms;

--ease-bounce: cubic-bezier(0.68, -0.6, 0.32, 1.6);
--ease-out: cubic-bezier(0.0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

#### Transform Properties
```css
--transform-bounce-up: translateY(-6px);
--transform-bounce-down: translateY(2px);
--transform-bounce-scale: scale(1.05);
--transform-press: translateY(2px);
--transform-tilt: rotate(-2deg);
```

#### Common Animation Patterns

1. **Button Press**
```css
.button {
  transition: transform var(--animation-fast) var(--ease-out);
}

.button:active {
  transform: var(--transform-press);
}
```

2. **Hover Lift**
```css
.card {
  transition: transform var(--animation-normal) var(--ease-bounce),
              box-shadow var(--animation-normal) var(--ease-out);
}

.card:hover {
  transform: var(--transform-bounce-up);
}
```

3. **Playful Bounce**
```css
.interactive-element {
  transition: transform var(--animation-normal) var(--ease-bounce);
}

.interactive-element:hover {
  transform: var(--transform-bounce-scale);
}
```

4. **Menu Open/Close**
```css
.menu {
  transition: opacity var(--animation-normal) var(--ease-in-out),
              transform var(--animation-normal) var(--ease-in-out);
}

.menu[data-state="closed"] {
  opacity: 0;
  transform: translateY(-10px);
}

.menu[data-state="open"] {
  opacity: 1;
  transform: translateY(0);
}
```

5. **Page Transitions**
```css
.page-transition {
  transition: opacity var(--animation-slow) var(--ease-in-out);
}

.page-exit {
  opacity: 0;
}

.page-enter {
  opacity: 1;
}
```

#### Reduced Motion

We respect user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Touch Interactions

Our components are designed to work seamlessly across both mouse and touch interfaces. We follow these core principles for touch interactions:

### Touch Target Sizing

All interactive elements follow these minimum sizes for touch targets:

```css
:root {
  --touch-target-size: 44px;     /* Minimum touch target size */
  --touch-target-spacing: 8px;    /* Minimum spacing between targets */
  --touch-padding-base: 12px;     /* Base padding for touch targets */
}
```

### Touch-specific Behaviors

1. **Hover Alternatives**
   - Hover effects are disabled on touch devices
   - Active state feedback is provided through scale transforms
   - Touch feedback is immediate and distinct

```css
@media (hover: none) {
  .interactive-element:active {
    transform: scale(0.98);
  }
}
```

2. **Touch Optimizations**
   - Use of `touch-action: manipulation` for improved touch response
   - Removal of hover-dependent interactions
   - Clear visual feedback for touch actions

```css
.touch-optimized {
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}
```

3. **Dropdown Menus**
   - Click/tap to open instead of hover
   - Larger touch targets in dropdown items
   - Clear visual indication of dropdown state

### Implementation Guide

1. **Base Touch Support**
   ```css
   /* Add to interactive elements */
   .interactive-element {
     min-height: var(--touch-target-size);
     min-width: var(--touch-target-size);
     padding: var(--touch-padding-base);
     touch-action: manipulation;
   }
   ```

2. **Touch Feedback**
   ```css
   /* Active state feedback */
   .interactive-element:active {
     transform: scale(0.98);
   }
   ```

3. **Media Queries**
   ```css
   /* Touch-specific styles */
   @media (hover: none) and (pointer: coarse) {
     /* Touch-specific rules */
   }

   /* Non-touch devices */
   @media (hover: hover) {
     /* Hover-specific rules */
   }
   ```

### Accessibility Considerations

1. **ARIA Roles and States**
   - Use appropriate ARIA roles for touch interactions
   - Maintain proper focus management
   - Ensure keyboard accessibility is preserved

2. **Feedback Mechanisms**
   - Provide visual feedback for touch interactions
   - Ensure state changes are communicated to screen readers
   - Maintain proper contrast for touch feedback

3. **Motion and Animation**
   - Respect reduce-motion preferences
   - Keep animations subtle and purposeful
   - Ensure transitions don't interfere with touch interaction

### Testing Guidelines

1. **Device Testing**
   - Test on various touch devices (phones, tablets)
   - Verify touch target sizes are adequate
   - Check for proper touch feedback

2. **Gesture Support**
   - Verify tap gestures work as expected
   - Test scroll and swipe interactions
   - Ensure pinch-to-zoom works where appropriate

3. **Performance**
   - Monitor touch response time
   - Verify smooth animations
   - Check for any lag in feedback

## Components

### Buttons

Our buttons feature thick borders and playful hover states that emphasize the neo-brutalist design:

```css
.button {
  height: 3rem;
  padding: var(--space-4) var(--space-6);
  border: var(--border-width-thick) var(--color-black);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  font: var(--button-text);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.button:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
```

### Cards

Cards use bold borders and transformative hover states:

```css
.card {
  background: var(--color-white);
  border: var(--border-width-thick) var(--color-black);
  border-radius: var(--radius-md);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}
```

## Accessibility

Our design system follows WCAG 2.1 AA guidelines:

- Color contrast ratios meet or exceed 4.5:1 for normal text and 3:1 for large text
- Interactive elements have a minimum touch target size of 44x44px
- Focus states are clearly visible
- Semantic HTML is used throughout
- ARIA attributes are implemented where necessary

## Usage with Tailwind CSS v4

Our design system is implemented with Tailwind CSS v4, which uses a new approach compared to previous versions:

### Configuration Structure

```js
/** @type {import('@tailwindcss/postcss').Config} */
export default {
  theme: {
    extend: {
      borderWidth: {
        'brutalist': '8px',
      },
      colors: {
        // Primary Colors
        'brand-green': 'var(--color-green)',
        'brand-orange': 'var(--color-orange)',
        'brand-yellow': 'var(--color-yellow)',
        'brand-blue': 'var(--color-blue)',
        // ... other colors
      },
      boxShadow: {
        'brutalist-sm': 'var(--shadow-sm)',
        'brutalist-md': 'var(--shadow-md)',
        'brutalist-lg': 'var(--shadow-lg)',
      },
      borderRadius: {
        'brutalist-sm': 'var(--radius-sm)',
        'brutalist-md': 'var(--radius-md)',
        'brutalist-lg': 'var(--radius-lg)',
      },
      // ... other theme extensions
    },
  }
}
```

### Tailwind v4 CSS Implementation

```css
/* Instead of @tailwind directives, we use import */
@import "tailwindcss";

/* Custom components using @layer */
@layer components {
  .button {
    height: 3rem;
    padding: var(--space-4) var(--space-6);
    border: var(--border-width-thick) var(--color-black);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    /* More styles... */
  }
  
  /* Other components... */
}
```

### Example Usage in HTML/Astro Templates

```html
<!-- Using utility classes -->
<div class="bg-brand-green border-brutalist rounded-brutalist-md shadow-brutalist-sm">
  Utility-based styling
</div>

<!-- Using component classes -->
<button class="button button-primary">
  Component-based styling
</button>
```

### Key Differences with Tailwind v4

1. **Import-based approach**: Instead of `@tailwind` directives, we use `@import "tailwindcss"`
2. **Vite Integration**: Uses `@tailwindcss/vite` plugin in Astro config
3. **PostCSS Setup**: Uses `@tailwindcss/postcss` in PostCSS config
4. **CSS Layers**: Component styles are defined in `@layer components`

For a complete guide on our Tailwind v4 implementation, refer to the project documentation.
