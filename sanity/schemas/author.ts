export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    { name: 'name', type: 'string', title: 'Name' },
    { name: 'slug', type: 'slug', title: 'Slug', options: { source: 'name' } },
    { name: 'bio', type: 'text', title: 'Short Bio' },
    { name: 'avatar', type: 'image', title: 'Avatar' },
    { name: 'social', type: 'array', of: [{ type: 'object', fields: [
      { name: 'platform', type: 'string', title: 'Platform' },
      { name: 'url', type: 'url', title: 'Profile URL' },
    ] }] },
  ],
  preview: { select: { title: 'name', media: 'avatar' } },
}
