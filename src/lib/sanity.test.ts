import { describe, it, expect, vi, beforeAll } from 'vitest'

describe('Sanity client', () => {
  beforeAll(() => {
    // Set up environment variables before importing the module
    vi.stubEnv('SANITY_PROJECT_ID', 'test-project')
    vi.stubEnv('SANITY_DATASET', 'test')
  })

  it('should have correct project configuration', async () => {
    // Import after env vars are set
    const { sanityClient } = await import('./sanity')
    expect(sanityClient.projectId).toBe('test-project')
    expect(sanityClient.dataset).toBe('test')
  })

  it('should have fetch method', async () => {
    const { sanityClient } = await import('./sanity')
    expect(typeof sanityClient.fetch).toBe('function')
  })

  it('should have previewClient method', async () => {
    const { sanityClient } = await import('./sanity')
    expect(typeof sanityClient.previewClient).toBe('function')
  })

  it('should be able to import @sanity/client successfully', async () => {
    // This test validates that @sanity/client is properly installed
    const clientModule = await import('@sanity/client')
    expect(clientModule).toBeDefined()
    expect(typeof clientModule.default).toBe('function')
  })
})