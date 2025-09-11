export default {
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text', title: 'Excerpt' },
    { name: 'publishedAt', type: 'datetime', title: 'Published At' },
    { name: 'author', type: 'reference', to: [{ type: 'author' }], title: 'Author' },
    { name: 'categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }], title: 'Categories' },
    { name: 'content', type: 'array', of: [{ type: 'block' }, { type: 'image' }], title: 'Content' },
    { name: 'coverImage', type: 'image', title: 'Cover Image', options: { hotspot: true } },
    { name: 'readingTime', type: 'number', title: 'Estimated Reading Time (mins)' },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'coverImage',
    },
  },
}
