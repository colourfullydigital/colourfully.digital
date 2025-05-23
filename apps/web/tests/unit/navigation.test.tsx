import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { render } from '../utils/test-utils';
import '@testing-library/jest-dom';

describe('Navigation Component', () => {
  const navigationItems = [
    { label: 'Home', href: '/' },
    { 
      label: 'Services', 
      href: '/services',
      children: [
        { label: 'Web Development', href: '/services/web-development' },
        { label: 'Design', href: '/services/design' },
        { label: 'Consulting', href: '/services/consulting' }
      ]
    },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];

  it('renders desktop navigation items', async () => {
    const { user } = render(
      <nav className="nav-desktop">
        <ul className="nav-list">
          {navigationItems.map(item => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('opens and closes mobile menu', async () => {
    const { user } = render(
      <nav>
        <button 
          className="hamburger"
          aria-label="Menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <span>Menu</span>
        </button>
        <div id="mobile-menu" aria-hidden="true">
          <ul>
            {navigationItems.map(item => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );

    const hamburger = screen.getByLabelText('Menu');
    const menu = screen.getByRole('list').parentElement;

    // Initial state
    expect(menu).toHaveAttribute('aria-hidden', 'true');

    // Open menu
    await user.click(hamburger);
    expect(menu).toHaveAttribute('aria-hidden', 'false');

    // Close menu
    await user.click(hamburger);
    expect(menu).toHaveAttribute('aria-hidden', 'true');
  });

  it('handles keyboard navigation', async () => {
    const { user } = render(
      <nav>
        <button 
          className="nav-button"
          aria-expanded="false"
          aria-haspopup="true"
        >
          Services
        </button>
        <ul className="dropdown" role="menu">
          {navigationItems[1].children?.map(child => (
            <li key={child.href} role="none">
              <a href={child.href} role="menuitem">{child.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    );

    const button = screen.getByText('Services');
    const dropdown = screen.getByRole('menu');

    // Initial state
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Open dropdown with Enter key
    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Close dropdown with Escape key
    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});