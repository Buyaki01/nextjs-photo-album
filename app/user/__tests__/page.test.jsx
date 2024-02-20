import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import UserPage from '../[userId]/page'
import { useParams as useParamsMock } from 'next/router'

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

const mockSetUser = jest.fn()

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

const mockSetAlbum = jest.fn()

jest.mock('next/router', () => ({
  ...jest.requireActual('next/router'),
  useParams: jest.fn(),
}))

describe('User Page', () => {
  it('should render a header with the text "User’s Albums"', () => {
    useParamsMock.mockReturnValue({ userId: '1' })
    render(<UserPage />)

    expect(screen.getByText("User’s Albums")).toBeInTheDocument()
  })

  it('should display loading spinner when loading is true', () => {
    render(<UserPage loading={true} />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it("should render a User's Albums when loading is false", async () => {
    render(<UserPage loading={false} user={mockUser} setUser={mockSetUser} album={mockAlbum} setAlbum={mockSetAlbum} />)

    await waitFor(() => {
      const userName = screen.getByText(user.name)
      expect(userName).toBeInTheDocument()

      const userEmail = screen.getByText(user.email)
      expect(userEmail).toBeInTheDocument()

      const userPhone = screen.getByText(user.phone)
      expect(userPhone).toBeInTheDocument()

      mockAlbum.forEach(async (album) => {
        const albumTitle = await screen.findByText(album.title)
        expect(albumTitle).toBeInTheDocument()
      })
    })
  })
})
