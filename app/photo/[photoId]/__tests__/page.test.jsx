import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import EditPhotoPage from '../page'
import axios from "axios"

jest.mock("axios")

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

describe("Edit Photo Page", () => {
  beforeEach(() => {
    axios.get.mockResolvedValue(mockPhoto)
  })
  it('should render a header with the text Album Photo', () => {
    render(<EditPhotoPage />)

    expect(screen.getByText("Album Photo")).toBeInTheDocument()
  })

  it('should display loading spinner when loading is true', () => {
    render(<EditPhotoPage  loading={true}/>)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
