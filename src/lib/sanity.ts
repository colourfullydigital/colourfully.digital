
/**
 * Sanity client wrapper (T020)
 * - Reads configuration from environment variables
 * - Attempts to dynamically import `@sanity/client` if it's installed
 * - Exposes a minimal `fetch` helper with the same signature used across the project
 *
 * Env vars used:
 * - `SANITY_PROJECT_ID` (required)
 * - `SANITY_DATASET` (defaults to `production`)
 * - `SANITY_API_VERSION` (optional, defaults to a sensible date)
 * - `SANITY_API_TOKEN` (optional, used for preview/private requests)
 * - `SANITY_USE_CDN` (optional, when `true` uses the CDN for public reads)
 */


const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'your_project_id'
const DATASET = process.env.SANITY_DATASET || 'production'
const API_VERSION = process.env.SANITY_API_VERSION || '2024-01-01'
const TOKEN = process.env.SANITY_API_TOKEN
const USE_CDN = (process.env.SANITY_USE_CDN || (process.env.NODE_ENV === 'production' ? 'true' : 'false')) === 'true'

// Lazy holder for the real client (if available)
let _sanityClient: any | null = null

async function initSanityClient() {
  if (_sanityClient) return _sanityClient

  try {
    // Try to dynamically import the official Sanity client if present
    // This keeps the dependency optional for environments that don't need it
    // (e.g., tests that stub out data).
  // @ts-ignore - optional dependency; runtime import may fail when not installed
  const mod = await import('@sanity/client')
    const createClient = mod.default ?? mod
    _sanityClient = createClient({
      projectId: PROJECT_ID,
      dataset: DATASET,
      apiVersion: API_VERSION,
      useCdn: USE_CDN,
      token: TOKEN,
    })
    return _sanityClient
  } catch (err) {
    // If import fails, leave _sanityClient as null and let callers know
    _sanityClient = null
    return null
  }
}

/**
 * Minimal exported interface used by the rest of the codebase.
 * - `fetch(query, params)` mirrors the official `client.fetch` signature
 */
export const sanityClient = {
  projectId: PROJECT_ID,
  dataset: DATASET,

  async fetch<T = unknown>(query: string, params?: Record<string, unknown>): Promise<T> {
    const client = await initSanityClient()
    if (client && typeof client.fetch === 'function') {
      return client.fetch(query, params) as Promise<T>
    }

    // Helpful error when the official client is not installed.
    // This keeps the repo runnable without forcing an immediate dependency
    // change; consumers can either install `@sanity/client` or stub this
    // module in tests.
    throw new Error(
      'Sanity client is not available. Install `@sanity/client` (npm install @sanity/client) or provide a test stub.\n' +
        `Expected SANITY_PROJECT_ID=${PROJECT_ID}, dataset=${DATASET}`,
    )
  },

  /**
   * Helper to create a preview client (disables CDN and uses token if provided)
   */
  async previewClient(token?: string) {
    try {
  // @ts-ignore - optional dependency; runtime import may fail when not installed
  const mod = await import('@sanity/client')
      const createClient = mod.default ?? mod
      return createClient({
        projectId: PROJECT_ID,
        dataset: DATASET,
        apiVersion: API_VERSION,
        useCdn: false,
        token: token ?? TOKEN,
      })
    } catch (err) {
      return null
    }
  },
}

