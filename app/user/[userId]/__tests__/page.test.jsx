import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import UserPage from '../page'

jest.mock('@/lib/getUser', () => jest.fn(() => Promise.resolve(mockUser)))
jest.mock('@/lib/getUserAlbums', () => jest.fn(() => Promise.resolve(mockAlbum)))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => ({
    userId: '1',
  }),
}))

jest.mock('react-hot-toast')

describe('User Page', () => {
  it('should render a header with the text "User’s Albums"', () => {
    render(<UserPage />)

    expect(screen.getByText("User’s Albums")).toBeInTheDocument()
  })

  it('should display loading spinner when loading is true', () => {
    render(<UserPage loading={true} />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it("should render a User's Albums when loading is false", async () => {
    render(<UserPage loading={false} />)

    await waitFor(async () => {
      const userName = screen.getByTestId('user-name')
      const userEmail = screen.getByTestId('user-email')
      const userPhone = screen.getByTestId('user-phone')

      expect(userName).toHaveTextContent("Leanne Graham’s Albums")
      expect(userEmail).toHaveTextContent('Sincere@april.biz')
      expect(userPhone).toHaveTextContent('1-770-736-8031 x56442')

      mockAlbum.forEach(async (album) => {
        const albumTitle = await screen.findByText(album.title)
        expect(albumTitle).toBeInTheDocument()
      })
    })
  })
})
