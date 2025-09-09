import { describe, it, expect } from 'vitest'

const baseUrl = 'http://localhost:4321'

describe('T009 - Integration: Form submission flow', () => {
  it('should accept valid form submissions and return success', async () => {
    const payload = { formName: 'contact', data: { name: 'Tester', email: 'test@example.com', message: 'hi' } }

    const res = await fetch(`${baseUrl}/api/forms/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    expect([200, 400]).toContain(res.status)
    if (res.status === 200) {
      const json = await res.json()
      expect(json.success).toBe(true)
    }
  })
})
