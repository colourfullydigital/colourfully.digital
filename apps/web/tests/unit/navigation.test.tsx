import React from 'react';
import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../utils/test-utils';
import '@testing-library/jest-dom';

interface NavigationItem {
  label: string;
  href: string;
  children?: NavigationItem[];
}

describe('Navigation Component', () => {
  const navigationItems: NavigationItem[] = [
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
    render(
      <nav className="nav-desktop">
        <ul className="nav-list" role="menubar">
          {navigationItems.map(item => (
            <li key={item.href} role="none">
              <a href={item.href} role="menuitem">{item.label}</a>
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
    const user = userEvent.setup();
    
    render(
      <nav>
        <button 
          className="hamburger"
          aria-label="Menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
          onClick={(e) => {
            const button = e.currentTarget;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', (!isExpanded).toString());
            const menu = document.getElementById('mobile-menu');
            if (menu) {
              menu.setAttribute('aria-hidden', isExpanded.toString());
            }
          }}
        >
          <span>Menu</span>
        </button>
        <div id="mobile-menu" data-testid="mobile-menu" aria-hidden="true">
          <ul role="menu">
            {navigationItems.map(item => (
              <li key={item.href} role="none">
                <a href={item.href} role="menuitem">{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    );

    const hamburger = screen.getByLabelText('Menu');
    const menu = screen.getByTestId('mobile-menu');

    // Initial state
    expect(menu).toHaveAttribute('aria-hidden', 'true');

    // Open menu
    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    expect(menu).toHaveAttribute('aria-hidden', 'false');

    // Close menu
    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(menu).toHaveAttribute('aria-hidden', 'true');
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(
      <nav>
        <button 
          className="nav-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={(e) => {
            const button = e.currentTarget;
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            button.setAttribute('aria-expanded', (!isExpanded).toString());
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.currentTarget.click();
            } else if (e.key === 'Escape') {
              e.preventDefault();
              e.currentTarget.setAttribute('aria-expanded', 'false');
            }
          }}
        >
          Services
        </button>
        <ul 
          className="dropdown" 
          role="menu" 
          data-testid="services-dropdown"
        >
          {navigationItems[1].children?.map(child => (
            <li key={child.href} role="none">
              <a href={child.href} role="menuitem">{child.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    );

    const button = screen.getByText('Services');

    // Initial state
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Open dropdown with Enter key
    button.focus();
    await user.keyboard('{Enter}');
    expect(button).toHaveAttribute('aria-expanded', 'true');

    // Close dropdown with Escape key
    await user.keyboard('{Escape}');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    // Open dropdown with Space key
    await user.keyboard(' ');
    expect(button).toHaveAttribute('aria-expanded', 'true');
  });
});