# Focus Management Guide

This document outlines the focus management implementation in our web application, ensuring keyboard accessibility and compliance with WCAG 2.1 guidelines.

## Key Features

1. Skip to Content Link
- Implemented at the top of each page
- Visible only when focused
- Jumps to main content area when activated

2. Focus Visible Styles
- High-contrast focus indicators for all interactive elements
- Customizable through CSS custom properties:
  ```css
  --focus-ring-color: var(--color-blue);
  --focus-ring-width: 4px;
  --focus-ring-offset: 2px;
  ```

3. Keyboard Navigation
- Full keyboard support for all interactive elements
- Arrow key navigation in dropdown menus
- Enter/Space to activate buttons and links
- Escape key to close dropdowns and modals

4. Focus Trapping
- Implemented using focus-trap library
- Applied to modals and dropdown menus
- Prevents focus from leaving modal contexts
- Returns focus to trigger element on close

## Implementation Details

### Skip Links
```astro
<a href="#main-content" class="skip-to-content">
  Skip to Content
</a>

<main id="main-content" tabindex="-1">
  <!-- Content -->
</main>
```

### Focus Trap Usage
```typescript
import { createFocusTrap } from 'focus-trap';

const trap = createFocusTrap(element, {
  allowOutsideClick: true,
  escapeDeactivates: true,
  returnFocusOnDeactivate: true,
  fallbackFocus: element
});

// Activate when opening modal/dropdown
trap.activate();

// Deactivate when closing
trap.deactivate();
```

### Keyboard Interaction Patterns

1. Dropdown Menus
- Tab: Navigate between top-level items
- Enter/Space: Open dropdown
- Arrow keys: Navigate within dropdown
- Escape: Close dropdown
- Tab (in dropdown): Navigate dropdown items

2. Mobile Menu
- Hamburger button activates menu
- Tab through menu items
- Escape closes menu
- Returns focus to hamburger button

3. Interactive Cards
- Tab to focus card
- Enter/Space to activate
- Clear focus indication

## Accessibility Features

1. ARIA Attributes
- `aria-expanded` for dropdowns
- `aria-hidden` for closed menus
- `aria-controls` for relating buttons to their controlled elements
- `aria-label` for descriptive labels
- `role` attributes for semantic meaning

2. High Contrast Support
```css
@media (forced-colors: active) {
  *:focus-visible {
    outline: 3px solid CanvasText;
  }
}
```

3. Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Testing Focus Management

1. Keyboard Navigation Test
```typescript
it('handles keyboard navigation', async () => {
  const user = userEvent.setup();
  
  render(<NavigationComponent />);
  
  // Test dropdown activation
  const button = screen.getByText('Services');
  await user.keyboard('{Tab}');
  expect(button).toHaveFocus();
  
  await user.keyboard('{Enter}');
  expect(button).toHaveAttribute('aria-expanded', 'true');
  
  // Test escape closing
  await user.keyboard('{Escape}');
  expect(button).toHaveAttribute('aria-expanded', 'false');
});
```

2. Focus Trap Test
```typescript
it('traps focus in modal', async () => {
  const user = userEvent.setup();
  
  render(<Modal />);
  
  // Open modal
  await user.click(screen.getByText('Open Modal'));
  
  // Try to tab through all focusable elements
  const focusableElements = screen.getAllByRole('button');
  for (let i = 0; i < focusableElements.length + 2; i++) {
    await user.keyboard('{Tab}');
  }
  
  // Focus should stay within modal
  expect(focusableElements[0]).toHaveFocus();
});
```

## Best Practices

1. Always provide visible focus indicators
2. Ensure logical tab order
3. Implement keyboard shortcuts for power users
4. Test with screen readers
5. Support both mouse and keyboard interactions
6. Return focus after interactions
7. Trap focus in modals and drawers
8. Provide skip links for main content
9. Support standard keyboard interactions
10. Test with keyboard-only navigation

## References

- [WCAG 2.1 Focus Visible (2.4.7)](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)
- [Focus Trap Documentation](https://github.com/focus-trap/focus-trap)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
