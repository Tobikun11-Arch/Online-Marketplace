import { render, screen } from '@testing-library/react'
import Page from '../app/page'
import '@testing-library/jest-dom'

test('renders the correct heading', () => {
  // Render the Page component
  render(<Page />)
  
  // Get the h1 element with specific text content
  const heading = screen.getByRole('heading', { level: 1, name: 'SajuBazaar' })
  
  // Assert that the heading is in the document
  expect(heading).toBeInTheDocument()
})
