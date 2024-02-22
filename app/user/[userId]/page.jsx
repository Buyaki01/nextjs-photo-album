'use client'

import BackArrow from "@/app/components/BackArrow"
import Spinner from "@/app/components/Spinner"
import getUser from "@/lib/getUser"
import getUserAlbums from "@/lib/getUserAlbums"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BiPhotoAlbum } from "react-icons/bi"

const UserPage = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userAlbums, setUserAlbums] = useState([])

  const router = useRouter()

  const params = useParams()
  const { userId } = params

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUser(userId)
        setUser(userData)

        const albumsList = await getUserAlbums(userId)
        setUserAlbums(albumsList)

      } catch (error) {
        console.error('Error fetching data:', error)
        toast.error('Error fetching user albums data')
      } finally {
        setLoading(false)
      }
    }

    if (userId) {
      fetchData()
    }
  }, [userId])

  return (
    <div>
      <div>
        <div className="cursor-pointer text-secondary font-bold mx-3" onClick={() => router.back()}>
          <BackArrow />
        </div>
        <div className="text-center my-3">
          <h1 className="text-3xl text-primary">User&rsquo;s Albums</h1>
        </div>
      </div>
      {loading 
        ? <div className="flex flex-col items-center justify-center mt-10 h-32"> 
            <Spinner />
          </div>
        : (
          <div className="m-3">
            <div className="text-center my-5">
              <h1 data-testid="user-name" className="text-xl font-bold">{user.name}&rsquo;s Albums</h1>
              <p data-testid="user-email" className="italic text-sm">{user.email}</p>
              <p data-testid="user-phone" className="italic text-sm">{user.phone && `${user.phone}`}</p>
              <p className="italic text-sm">
                {user.address && `${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}`}
              </p>
            </div>
            <div className="m-3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4 p-4">
                {userAlbums.map((album) => (
                  <Link href={`/album/${album.id}`} key={album.id}>
                    <div
                      className="p-2 border border-gray-300 rounded-xl h-24 flex flex-col items-center justify-center"
                    >
                      <BiPhotoAlbum className="text-primary text-4xl"/>
                    </div>
                    <h3 
                      className="text-xl truncate w-full text-center px-3 hover:underline hover:text-[#a00a7c]"
                    > 
                      {album.title}
                    </h3> 
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

export default UserPage