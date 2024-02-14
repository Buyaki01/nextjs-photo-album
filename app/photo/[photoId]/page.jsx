'use client'

import Spinner from "@/app/components/Spinner"
import getPhoto from "@/lib/getPhoto"
import updatePhotoTitle from "@/lib/updatePhotoTitle"
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
        const photoData = await getPhoto(photoId)
        setPhoto(photoData)

      } catch (error) {
        console.error('Error fetching photo data:', error)
        toast.error('Error fetching photo data')
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
      await updatePhotoTitle(photoId, editedTitle)
      toast.success('Photo title updated successfully')
      closeEditModal()
    } catch (error) {
      console.error('Error updating photo title:', error)
      toast.error('Failed to update photo title')
    }
  }

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
          <h1 className="text-3xl text-primary">Edit Photo Title</h1>
        </div>
      </div>
      {loading 
        ? (
            <div className="flex flex-col items-center justify-center mt-10 h-32"> 
              <Spinner />
            </div>
          ) 
        : (
          <div className="mx-auto max-w-lg">
            <div className="flex flex-col items-center">
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="rounded-lg"
                height={150}
                width={150}
              />
              <p className="mt-2 text-center text-lg font-semibold">{photo.title}</p>
              <button 
                className="mt-2 bg-primary text-white px-4 py-2 rounded-md"
                onClick={openEditModal}
              >
                Edit Photo Title
              </button>

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