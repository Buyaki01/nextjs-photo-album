import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import HomePage from '../page'
import toast from 'react-hot-toast'

const mockUsers = [
  {
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
  },
  {
    "id": 2,
    "name": "Ervin Howell",
    "username": "Antonette",
    "email": "Shanna@melissa.tv",
    "address": {
      "street": "Victor Plains",
      "suite": "Suite 879",
      "city": "Wisokyburgh",
      "zipcode": "90566-7771",
      "geo": {
        "lat": "-43.9509",
        "lng": "-34.4618"
      }
    },
    "phone": "010-692-6593 x09125",
    "website": "anastasia.net",
    "company": {
      "name": "Deckow-Crist",
      "catchPhrase": "Proactive didactic contingency",
      "bs": "synergize scalable supply-chains"
    }
  }
]

const mockAlbums = [
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
  },
  {
    "userId": 2,
    "id": 11,
    "title": "quam nostrum impedit mollitia quod et dolor"
  },
  {
    "userId": 2,
    "id": 12,
    "title": "consequatur autem doloribus natus consectetur"
  }
]

jest.mock('../../../lib/getUsers', () => jest.fn(() => Promise.resolve(mockUsers)))
jest.mock('../../../lib/getAlbums', () => jest.fn(() => Promise.resolve(mockAlbums)))

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
})
