import { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => {
  return {
    ...render(ui, { ...options }),
    user: userEvent.setup(),
  }
}

const createMockApiResponse = <T>(data: T) => {
  return {
    json: () => Promise.resolve(data),
    ok: true,
    status: 200,
  }
}

const createErrorResponse = (status = 500, message = 'Internal Server Error') => {
  return {
    json: () => Promise.resolve({ message }),
    ok: false,
    status,
  }
}

export * from '@testing-library/react'
export { customRender as render }
export { createMockApiResponse, createErrorResponse }