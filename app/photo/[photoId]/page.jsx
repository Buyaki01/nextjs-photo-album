'use client'

import BackArrow from "@/app/components/BackArrow"
import Spinner from "@/app/components/Spinner"
import axios from "axios"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const EditPhotoPage = () => {
  const [loading, setLoading] = useState(true)
  const [photo, setPhoto] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editedTitle, setEditedTitle] = useState("")

  const router = useRouter()

  const params = useParams()
  const { photoId } = params
  
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`/api/photos/${photoId}`)
        setPhoto(response.data)

      } catch (error) {
        console.error('Error fetching photo data:', error)
        toast.error('Sorry, something went wrong! Please try again')
      } finally {
        setLoading(false)
      }
    }

    if (photoId) {
      fetchPhoto()
    }
  }, [photoId])

  const openEditModal = () => {
    setIsEditModalOpen(true)
    setEditedTitle(photo.title)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
  }

  const saveEditedTitle = async () => {
    try {
      const response = await axios.patch(`/api/photos/${photoId}`, { photoId, editedTitle })

      if (response.status === 200) {
        toast.success('Photo title updated successfully')
        closeEditModal()
      } else {
        toast.error('Sorry, something went wrong! Please try again')
      }
    } catch (error) {
      console.error('Error updating photo title:', error)
      toast.error('Sorry, something went wrong! Please try again')
    }
  }

  return (
    <div>
      <div>
        <div 
          className="cursor-pointer text-secondary font-bold mx-3" 
          onClick={() => router.back()}
        >
          <BackArrow />
        </div>
        <div className="text-center mt-3 mb-5">
          <h1 data-testid="heading-photo-page" className="text-3xl text-primary">Album Photo</h1>
        </div>
      </div>
      {loading 
        ? (
            <div className="flex flex-col items-center justify-center mt-10 h-32"> 
              <Spinner />
            </div>
          ) 
        : (
          <div className="border border-gray-300 p-4 my-3 mx-8 grid grid-cols-1 md:grid-cols-5 gap-2">
            <div className="flex flex-col items-center p-4">
              {photo && (
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="rounded-lg"
                  height={150}
                  width={150}
                  priority={true}
                />
              )}
            </div>

            <div className="flex flex-col col-span-4 p-4">
              {photo && (
                <div>
                  <p data-testid="title-of-photoImage" className="text-lg text-wrap">
                    <span className="font-semibold"> Title: </span> {photo.title}
                  </p>
                </div>
              )}
              
              <div className="py-2">
                <button
                  data-testid="editname-photo-page"
                  className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
                  onClick={openEditModal}
                >
                  Edit Photo Title
                </button>
              </div>

              {isEditModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
                  <div className="bg-white p-6 rounded-md w-1/2">
                    <label htmlFor="editedTitle" className="block text-sm font-medium text-gray-700">
                      Edit Photo Title
                    </label>
                    <input
                      type="text"
                      id="editedTitle"
                      className="mt-1 p-2 border rounded-md w-full"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end gap-2">
                      <button
                        className="bg-primary text-white px-4 py-2 rounded-md"
                        onClick={saveEditedTitle}
                      >
                        Save
                      </button>
                      <button
                        data-testid="cancel"
                        className="bg-gray-700 text-white px-4 py-2 rounded-md"
                        onClick={closeEditModal}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default EditPhotoPage