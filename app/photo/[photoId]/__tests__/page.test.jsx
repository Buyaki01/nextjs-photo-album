import '@testing-library/jest-dom'
import { render, screen, waitFor } from '@testing-library/react'
import EditPhotoPage from '../page'

const mockPhoto = {
  "albumId": 1,
  "id": 1,
  "title": "accusamus beatae ad facilis cum similique qui sunt",
  "url": "https://via.placeholder.com/600/92c952",
  "thumbnailUrl": "https://via.placeholder.com/150/92c952"
}

jest.mock('../../../../lib/getPhoto', () => jest.fn(() => Promise.resolve(mockPhoto)))
jest.mock('../../../../lib/updatePhotoTitle', () => jest.fn(() => Promise.resolve(mockPhoto)))

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useParams: () => ({
    photoId: '1',
  }),
  useRouter: () => ({
    back: jest.fn()
  }),
}))

describe("Photo Page", () => {
  it('should render a header with the text Album Photo', () => {
    render(<EditPhotoPage />)

    expect(screen.getByText("Album Photo")).toBeInTheDocument()
  })

  it('should display loading spinner when loading is true', () => {
    render(<EditPhotoPage  loading={true}/>)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it("should render title of the photo when loading is false", async () => {
    render(<EditPhotoPage  loading={false}/>)

    await waitFor(() => {
      expect(screen.getByTestId('photoname-photo-page')).toHaveTextContent(mockPhoto.title)
    })
    const photoImage = screen.getByTestId('photoimage-photo-page')
    expect(photoImage).toBeInTheDocument()
  })
})
