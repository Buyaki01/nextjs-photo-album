import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import UserPage from '../page'

const mockUser = {
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
}

const mockAlbum = [
  {
    "userId": 1,
    "id": 8,
    "title": "qui fuga est a eum"
  },
  {
    "userId": 1,
    "id": 9,
    "title": "saepe unde necessitatibus rem"
  },
  {
    "userId": 1,
    "id": 10,
    "title": "distinctio laborum qui"
  }
]

jest.mock('../../../../lib/getUser', () => jest.fn(() => Promise.resolve(mockUser)))
jest.mock('../../../../lib/getUserAlbums', () => jest.fn(() => Promise.resolve(mockAlbum)))

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
