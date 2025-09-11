export default {
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    { name: 'heroText', type: 'string', title: 'Hero Text' },
    { name: 'heroImage', type: 'image', title: 'Hero Image', options: { hotspot: true } },
    { name: 'intro', type: 'array', of: [{ type: 'block' }], title: 'Intro Content' },
    { name: 'featuredPosts', type: 'array', of: [{ type: 'reference', to: [{ type: 'blogPost' }] }], title: 'Featured Posts' },
  ],
}
