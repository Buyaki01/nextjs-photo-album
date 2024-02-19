import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('should render header with logo and navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Photo Album')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
  })
})