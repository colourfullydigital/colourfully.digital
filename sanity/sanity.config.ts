export default {
  projectId: process.env.SANITY_PROJECT_ID || 'your_project_id',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: process.env.SANITY_API_VERSION || '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
}
