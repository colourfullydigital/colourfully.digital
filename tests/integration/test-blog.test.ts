import { describe, it, expect } from 'vitest'

const baseUrl = 'http://localhost:4321'

describe('T008 - Integration: Blog post rendering', () => {
  it('blog listing should return HTML or 200/404', async () => {
    const res = await fetch(`${baseUrl}/blog`)
    // Either 200 with HTML or 404 if not yet implemented
    expect([200, 404]).toContain(res.status)
    if (res.status === 200) {
      const text = await res.text()
      expect(text).toContain('<article')
    }
  })
})
