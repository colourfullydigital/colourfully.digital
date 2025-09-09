// Placeholder Sanity client config (T020 will implement fully)
const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'your_project_id'
const DATASET = process.env.SANITY_DATASET || 'production'

export const sanityClient = {
  projectId: PROJECT_ID,
  dataset: DATASET,
  fetch: async (_query: string, _params?: Record<string, unknown>) => {
    // Stubbed fetch - real client will be wired in T020
    return [] as unknown
  },
}
