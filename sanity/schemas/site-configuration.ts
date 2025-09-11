export default {
  name: 'siteConfiguration',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    { name: 'siteTitle', type: 'string', title: 'Site Title' },
    { name: 'siteDescription', type: 'text', title: 'Site Description' },
    { name: 'logo', type: 'image', title: 'Logo' },
    { name: 'defaultLocale', type: 'string', title: 'Default Locale', options: { list: ['en','fr'] } },
  ],
}
