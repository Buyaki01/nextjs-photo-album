import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import LandingPage from '../LandingPage'

jest.mock('next-auth/react')

//Getting this error message: Cannot find module 'next-auth/react' from 'app/components/landingPage/LandingPage.jsx'

describe('LandingPage', () => {
  it('should render a landing page with title, description, and Github sign-in button', () => {
    render(<LandingPage />)
    expect(screen.getByText(/Discover Your Memories With Our Photo Album App/i)).toBeInTheDocument()
    expect(screen.getByText(/Explore and organize your memories with our photo album application./i)).toBeInTheDocument()
    expect(screen.getByText(/Please login with your Github account below before proceeding to the Home Page/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Continue with Github/i })).toBeInTheDocument()
  })
})