import { describe, it, expect } from 'vitest'

const baseUrl = 'http://localhost:4321'

describe('T007 - Integration: Homepage content fetching', () => {
  it('should return homepage HTML with expected title/meta', async () => {
    const res = await fetch(`${baseUrl}/`)
    expect(res.status).toBe(200)
    const text = await res.text()
    // Expect basic document structure and at least one meta description
    expect(text.includes('<!doctype html>') || text.includes('<!DOCTYPE html>')).toBe(true)
    expect(text.toLowerCase()).toContain('<meta')
    expect(text).toMatch(/<title>.*<\/title>/)
  })
})
