import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../utils/test-utils';

interface NavigationEvent {
  preventDefault: () => void;
  url: string;
}

describe('Navigation Flow', () => {
  it('should trigger navigation when clicking links', async () => {
    let navigationUrl = '';
    
    // Mock navigation event listener
    window.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A') {
        e.preventDefault();
        navigationUrl = target.href;
      }
    });

    const { user } = render(
      <nav>
        <a href="/about">About</a>
      </nav>
    );

    // Find and click the about link
    const aboutLink = screen.getByText('About');
    await user.click(aboutLink);

    // Assert the navigation was triggered with the correct URL
    expect(navigationUrl).toContain('/about');
  });

  it('should handle loading states during navigation', async () => {
    let isLoading = false;

    const Navigation = () => {
      const [loading, setLoading] = React.useState(false);

      const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate async navigation
        setTimeout(() => {
          setLoading(false);
        }, 100);
      };

      return (
        <nav>
          <a href="/dashboard" onClick={handleClick} data-testid="dashboard-link">
            Dashboard
          </a>
          {loading && <div>Loading...</div>}
        </nav>
      );
    };

    const { user } = render(<Navigation />);

    // Click the dashboard link
    const dashboardLink = screen.getByTestId('dashboard-link');
    await user.click(dashboardLink);

    // Assert loading state appears
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});