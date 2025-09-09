import { describe, it, expect } from 'vitest'

const baseUrl = 'http://localhost:4321'

describe('T006 - Contract: Server endpoints (forms, newsletter, search)', () => {
  it('form submission should accept valid data and return submission id', async () => {
    const formData = { formName: 'contact', data: { name: 'Test', email: 'test@example.com', message: 'hello' } }

    const res = await fetch(`${baseUrl}/api/forms/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    // Contract expects 200 for valid submission
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(json.submissionId).toBeDefined()
  })

  it('newsletter should accept subscription and return confirmation flag', async () => {
    const payload = { email: 'sub@example.com' }

    const res = await fetch(`${baseUrl}/api/newsletter/subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.success).toBe(true)
    expect(typeof json.requiresConfirmation).toBe('boolean')
  })

  it('search endpoint should return structured results', async () => {
    const res = await fetch(`${baseUrl}/api/search?q=test`)
    expect(res.status).toBe(200)
    const json = await res.json()
    expect(json.results).toBeDefined()
    expect(Array.isArray(json.results)).toBe(true)
    expect(typeof json.total).toBe('number')
  })
})
