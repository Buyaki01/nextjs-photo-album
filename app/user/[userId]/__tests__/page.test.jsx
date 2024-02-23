import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import UserPage from '../page'
import axios from "axios"

jest.mock("axios")

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

const mockUserAlbums = [
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
jest.mock('../../../../lib/getUserAlbums', () => jest.fn(() => Promise.resolve(mockUserAlbums)))

axios.get.mockResolvedValue(mockUser)
axios.get.mockResolvedValue(mockUserAlbums)

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => ({
    userId: '1',
  }),
  useRouter: () => ({
    back: jest.fn()
  }),
}))

describe('User Page', () => {
  it('should render a header with the text "User’s Albums"', () => {
    render(<UserPage />)

    expect(screen.getByText("User’s Albums")).toBeInTheDocument()
  })

  it('should display loading spinner when loading is true', () => {
    render(<UserPage loading={true} />)
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it("should render user's albums when loading is false", async () => {
    render(<UserPage loading={false} />)

    await waitFor(() => {
      mockUserAlbums.forEach(async (album) => {
        const albumTitle = await screen.findByText(album.title)
        expect(albumTitle).toBeInTheDocument()
      })
    })
  })
})
