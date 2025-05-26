/// <reference types="./globals.d.ts" />
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TranslationProvider, useTranslation } from '../src/react';
import { TranslationLoader } from '../src/loader';
import type { NestedTranslations } from '../src/types';

// Silence namespace warnings during tests
const originalConsoleWarn = console.warn;
beforeEach(() => {
  console.warn = (msg: string) => {
    if (!msg.includes('Namespace')) {
      originalConsoleWarn(msg);
    }
  };
});

// Restore console.warn after tests
afterEach(() => {
  console.warn = originalConsoleWarn;
});

const mockTranslations: NestedTranslations = {
  common: {
    greeting: {
      en: 'Hello',
      fr: 'Bonjour'
    },
    items: {
      zero: {
        en: 'No items',
        fr: 'Aucun élément'
      },
      one: {
        en: 'One item',
        fr: 'Un élément'
      },
      other: {
        en: '{count} items',
        fr: '{count} éléments'
      }
    }
  }
};

function TestComponent() {
  const { t, setLocale } = useTranslation();
  return (
    <div>
      <span data-testid="greeting">{t('common.greeting')}</span>
      <span data-testid="items">{t('common.items', { count: 2 })}</span>
      <button onClick={() => setLocale('fr')}>Switch to French</button>
    </div>
  );
}

describe('TranslationProvider', () => {
  const MockLoader = {
    loadNamespace: vi.fn().mockImplementation(async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      return mockTranslations.common;
    })
  } as unknown as TranslationLoader;

  it('should provide translations through context', async () => {
    const user = userEvent.setup();
    
    await act(async () => {
      render(
        <TranslationProvider
          loader={MockLoader}
          initialLocale="en"
          namespaces={['common']}
        >
          <TestComponent />
        </TranslationProvider>
      );
    });

    // Wait for translations to load
    await waitFor(() => {
      expect(screen.getByTestId('greeting')).toHaveTextContent('Hello');
      expect(screen.getByTestId('items')).toHaveTextContent('2 items');
    });

    // Test locale switching
    await act(async () => {
      await user.click(screen.getByText('Switch to French'));
    });
    
    await waitFor(() => {
      expect(screen.getByTestId('greeting')).toHaveTextContent('Bonjour');
      expect(screen.getByTestId('items')).toHaveTextContent('2 éléments');
    });
  });

  it('should handle loading state', async () => {
    const slowLoader = {
      loadNamespace: vi.fn().mockImplementation(() => new Promise(() => {}))
    } as unknown as TranslationLoader;

    await act(async () => {
      render(
        <TranslationProvider
          loader={slowLoader}
          initialLocale="en"
          namespaces={['common']}
        >
          <TestComponent />
        </TranslationProvider>
      );
    });

    // During loading, the keys should be returned
    await waitFor(() => {
      expect(screen.getByTestId('greeting')).toHaveTextContent('common.greeting');
    });
  });

  it('should handle missing translations', async () => {
    const emptyLoader = {
      loadNamespace: vi.fn().mockResolvedValue({})
    } as unknown as TranslationLoader;

    await act(async () => {
      render(
        <TranslationProvider
          loader={emptyLoader}
          initialLocale="en"
          namespaces={['common']}
        >
          <TestComponent />
        </TranslationProvider>
      );
    });

    // When translations are missing, the keys should be returned
    await waitFor(() => {
      expect(screen.getByTestId('greeting')).toHaveTextContent('common.greeting');
    });
  });
});
