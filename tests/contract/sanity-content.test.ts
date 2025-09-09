import { describe, it, expect } from 'vitest'
import { sanityClient } from '../../src/lib/sanity.js'

describe('T005 - Contract: Sanity content queries', () => {
  it('homepage content should include required fields', async () => {
    const query = `*[_type == "homepageContent"][0]{ title, heroTitle, seoDescription }`
    const result: any = await sanityClient.fetch(query)

    // Contract asserts these fields must exist and be strings
    expect(result).toBeDefined()
    expect(result.title).toBeDefined()
    expect(typeof result.title).toBe('string')
    expect(result.heroTitle).toBeDefined()
    expect(typeof result.heroTitle).toBe('string')
    expect(result.seoDescription).toBeDefined()
    expect(typeof result.seoDescription).toBe('string')
  })

  it('should return blog posts list with expected fields', async () => {
    const query = `*[_type == "blogPost" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc)[0...10]{ _id, title, slug, author->{ name }, publishedAt }`
  const results = (await sanityClient.fetch(query)) as any[]

    expect(Array.isArray(results)).toBe(true)

    if (results.length > 0) {
      const post = results[0]
      expect(post._id).toBeDefined()
      expect(post.title).toBeDefined()
      expect(post.slug).toBeDefined()
      expect(post.author).toBeDefined()
      expect(typeof post.title).toBe('string')
    }
  })

  it('should fetch form configuration with validation rules', async () => {
    const query = `*[_type == "form"]{ name, fields[]{ name, type, required } }`
  const forms = (await sanityClient.fetch(query)) as any[]

    expect(Array.isArray(forms)).toBe(true)

    if (forms.length > 0) {
      const form = forms[0]
      expect(form.name).toBeDefined()
      expect(Array.isArray(form.fields)).toBe(true)
      expect(form.fields.length).toBeGreaterThan(0)
      form.fields.forEach((f: any) => {
        expect(f.name).toBeDefined()
        expect(f.type).toBeDefined()
      })
    }
  })
})
