'use client'

import Spinner from "@/app/components/Spinner"
import getUser from "@/lib/getUser"
import getUserAlbums from "@/lib/getUserAlbums"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const UserPage = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userAlbums, setUserAlbums] = useState([])

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
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return (
    <div>
      {loading 
        ? <div className="flex flex-col items-center justify-center mt-10 h-32"> 
            <Spinner />
          </div>
        : (
          <div className="m-3">
            <div className="cursor-pointer text-secondary font-bold" onClick={() => history.back()}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </div>
            <div className="text-center my-3">
              <h1 className="text-xl font-bold text-primary">{user.name}</h1>
              <p className="italic text-sm">{user.email}</p>
              <p className="italic text-sm">{user.phone && `${user.phone}`}</p>
            </div>
            <div className="m-3">
              <h3 className="font-bold text-xl mb-2">Albums</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
                {userAlbums.map((album) => (
                  <div 
                    key={album.id}
                    className="border h-40 flex flex-col items-center justify-center"
                  >
                    <h3 
                      className="text-xl truncate w-full text-center px-3 hover:underline hover:text-[#a00a7c]"
                    >
                      <Link href={`/album/${album.id}`}>{album.title}</Link>
                    </h3>  
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

export default UserPage