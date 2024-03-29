'use client'

import BackArrow from "@/app/components/BackArrow"
import Spinner from "@/app/components/Spinner"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
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
        const response = await axios.get(`/api/albums/${albumId}`)
        setAlbum(response.data.album)
        setAlbumPhotos(response.data.photos)
      } catch (error) {
        console.error('Error fetching album and album photos data:', error)
        toast.error('Sorry, something went wrong! Please try again')
      } finally {
        setLoading(false)
      }
    }

    if (albumId) {
      fetchData()
    }
  }, [albumId])

  return (
    <div>
      <div>
        <div 
          className="cursor-pointer text-secondary font-bold mx-3" 
          onClick={() => router.back()}
        >
          <BackArrow />
        </div>
        <div className="text-center my-3">
          <h1 data-testid="album-page-heading" className="text-3xl text-primary truncate w-full">Album&rsquo;s Photos</h1>
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
              <h1 
                className="text-xl font-bold truncate w-full"
                data-testid="album-name-heading"
              >
                {album && album.title.charAt(0).toUpperCase() + album.title.slice(1)} Album&rsquo;s Photos
              </h1>
            </div>
            <div className="m-3">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2 md:gap-4">
                {albumPhotos && albumPhotos.map((photo) => (
                  <Link href={`/photo/${photo.id}`} key={photo.id}>
                    <div
                      className="border h-40 flex flex-col items-center justify-center"
                    >
                      <Image
                        src={photo.thumbnailUrl}
                        alt={photo.title}
                        className="rounded-lg"
                        height={150}
                        width={150}
                      />
                    </div>
                    <p 
                      className="truncate w-full text-center"
                      data-testid="photo-name"
                    >
                      {photo.title}
                    </p>
                  </Link>
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