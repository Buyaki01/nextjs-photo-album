import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import AlbumPage from '../page'

const mockAlbum = {
  "userId": 1,
  "id": 1,
  "title": "quidem molestiae enim"
}

const mockAlbumPhotos = [
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  },
  {
    "albumId": 1,
    "id": 2,
    "title": "reprehenderit est deserunt velit ipsam",
    "url": "https://via.placeholder.com/600/771796",
    "thumbnailUrl": "https://via.placeholder.com/150/771796"
  },
  {
    "albumId": 1,
    "id": 3,
    "title": "officia porro iure quia iusto qui ipsa ut modi",
    "url": "https://via.placeholder.com/600/24f355",
    "thumbnailUrl": "https://via.placeholder.com/150/24f355"
  },
]

jest.mock('../../../../lib/getAlbum', () => jest.fn(() => Promise.resolve(mockAlbum)))
jest.mock('../../../../lib/getAlbumPhotos', () => jest.fn(() => Promise.resolve(mockAlbumPhotos)))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => ({
    albumId: '1',
  }),
  useRouter: () => ({
    back: jest.fn()
  }),
}))

describe("Album's Photos Page", () => {
  it('should render a header with the text "Albums’s Photos"', () => {
    render(<AlbumPage />)

    expect(screen.getByTestId('album-page-heading')).toBeInTheDocument()
  })

  it('should display loading spinner when loading is true', () => {
    render(<AlbumPage  loading={true}/>)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it("should render title of the album when loading is false", async () => {
    render(<AlbumPage  loading={false}/>)

    await waitFor(() => {
      const albumName = screen.getByTestId('album-name-album-page')
      
      expect(albumName).toBeInTheDocument()
    })
  })

  it("should render album's photos when loading is false", async () => {
    render(<AlbumPage loading={false} />)

    await waitFor(() => {
      mockAlbumPhotos.forEach(async (photo) => {
        const photoImage = await screen.findByAltText(photo.title)
        expect(photoImage).toHaveAttribute("src", photo.thumbnailUrl)
  
        const photoTitles = await screen.findAllByText(photo.title)
        expect(photoTitles).toHaveLength(1)
        expect(photoTitles[0]).toBeInTheDocument()
      })
    })
  })
})
