import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import HomePage from '../page'

describe('HomePage', () => {
  it('should render a header with the text "Users"', () => {
    render(<HomePage />)

    expect(screen.getByText('Users')).toBeInTheDocument()
  })
})
