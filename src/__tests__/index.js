import {
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react'

beforeAll(() => {
  const root = document.createElement('div')
  root.id = 'root'
  document.body.append(root)
})

test('renders the book search', async () => {
  require('../index')

  fireEvent.change(screen.getByPlaceholderText(/search/i), {
    target: {value: 'voice of war'},
  })
  fireEvent.click(screen.getByLabelText(/search/i))
  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(/voice of war/i)).toBeInTheDocument()
})
