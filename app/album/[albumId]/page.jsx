'use client'

import Spinner from "@/app/components/Spinner"
import getAlbum from "@/lib/getAlbum"
import getAlbumPhotos from "@/lib/getAlbumPhotos"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const AlbumPage = () => {
  const [loading, setLoading] = useState(true)
  const [album, setAlbum] = useState(null)
  const [albumPhotos, setAlbumPhotos] = useState([])

  const router = useRouter()

  const params = useParams()
  const { albumId } = params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const albumData = await getAlbum(albumId)
        setAlbum(albumData)

        const albumPhotosList = await getAlbumPhotos(albumId)
        setAlbumPhotos(albumPhotosList)
      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Error fetching album data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [albumId])

  return (
    <div>
      <div>
        <div 
          className="cursor-pointer text-secondary font-bold" 
          onClick={() => router.back()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </div>
        <div className="text-center my-3">
          <h1 className="text-3xl text-primary">Album Photos</h1>
        </div>
      </div>
      {loading 
        ? (
            <div className="flex flex-col items-center justify-center mt-10 h-32"> 
              <Spinner />
            </div>
          ) 
        : (
          <div className="m-3">
            <div className="text-center my-3">
              <h1 className="text-xl font-bold">{album.title}</h1>
            </div>
            <div className="m-3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                {albumPhotos.map((photo) => (
                  <div 
                    key={photo.id}
                    className="border h-40 flex flex-col items-center justify-center"
                  >
                    <img 
                      src={photo.thumbnailUrl} 
                      alt={`Photo ${photo.id}`} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AlbumPage