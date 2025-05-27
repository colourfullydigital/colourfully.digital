# Color Contrast Guidelines

## WCAG 2.1 AA Requirements

Our website must meet WCAG 2.1 AA contrast requirements:

- **Normal Text**: Minimum contrast ratio of 4.5:1
- **Large Text**: Minimum contrast ratio of 3:1 (18pt or 14pt bold)
- **UI Components**: Minimum contrast ratio of 3:1 for interactive elements and visual information

## High Contrast Mode

Our website supports high contrast mode through:

1. System preference detection (`prefers-contrast: more`)
2. Enhanced color combinations:
   - Pure black text (#000000) on white background (#FFFFFF)
   - Pure white text (#FFFFFF) on black background (#000000)
   - Blue links (#0000EE) with underlines
   - Purple visited links (#551A8B)

### Testing High Contrast Mode

Test high contrast mode using:
1. System settings
2. Browser developer tools (under Rendering > Emulate CSS media feature prefers-contrast)

## Maintaining Contrast Standards

### Design Phase
1. Use the contrast checker in design tools
2. Choose accessible color combinations
3. Consider both light and dark themes
4. Test with high contrast mode

### Development Phase
1. Use CSS custom properties for colors
2. Run automated contrast tests
3. Test with screen readers
4. Verify focus indicators are visible

### Testing
1. Run `npm test` to execute contrast ratio tests
2. Check all interactive elements have sufficient contrast
3. Verify high contrast mode works correctly
4. Test with various browser/OS combinations

## Automated Testing

We use automated tests to verify contrast ratios:

```typescript
import { meetsWCAGAA } from '../utils/contrast';

// Test color combinations
const colors = {
  background: '#FFFFFF',
  text: '#121212'
};

test('text meets WCAG AA standards', () => {
  expect(meetsWCAGAA(colors.text, colors.background)).toBe(true);
});
```

## Known Issues and Workarounds

1. SVG icons should have sufficient contrast
2. Form inputs must maintain contrast in all states
3. Focus indicators must be clearly visible
4. Text over images requires additional consideration

## Resources

- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [High Contrast Mode Best Practices](https://www.w3.org/WAI/WCAG21/Understanding/contrast-enhanced.html)
