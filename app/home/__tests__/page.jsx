import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '../page'
import toast from 'react-hot-toast'

jest.mock('@/lib/getUsers', () => jest.fn(() => Promise.resolve(mockUsers)))
jest.mock('@/lib/getAlbums', () => jest.fn(() => Promise.resolve(mockAlbums)))

jest.mock('react-hot-toast', () => ({
  error: jest.fn(),
}))

describe('HomePage', () => {
  it('should render a header with the text "Users"', () => {
    render(<HomePage />)

    expect(screen.getByText('Users')).toBeInTheDocument()
  })

  it('should display loading spinner when loading is true', () => {
    render(<HomePage loading={true} />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('should render UsersList when loading is false', async () => {
    render(<HomePage loading={false} />)

    await waitFor(() => {
      mockUsers.forEach(async (user) => {
        const username = await screen.findByTestId(`user-name-${user.id}`)
        expect(username).toBeInTheDocument()

        const userAlbumCount = mockAlbums.filter(album => album.userId === user.id).length
        const userAlbumCountText = screen.getByText(`${userAlbumCount} Albums`)
        expect(userAlbumCountText).toBeInTheDocument()
      })
    })
  })

  it('displays an error message if fetching users fails', async () => {
    jest.mock('@/lib/getUsers', () => jest.fn(() => Promise.reject(new Error('Error fetching users'))))
  
    render(<HomePage />)
  
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Error fetching users data')
    })
  })
})
