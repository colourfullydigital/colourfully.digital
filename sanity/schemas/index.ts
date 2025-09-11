import blogPost from './blog-post'
import author from './author'
import category from './category'
import homepageContent from './homepage-content'
import form from './form'
import formSubmission from './form-submission'
import siteConfiguration from './site-configuration'
// Note: `translation-keys.ts` schema is planned (T018). The workspace may ignore new files named like this; create it manually if needed.

export const schemas = [
  blogPost,
  author,
  category,
  homepageContent,
  form,
  formSubmission,
  siteConfiguration,
]

export default schemas
