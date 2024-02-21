'use client'

import getAlbums from "@/lib/getAlbums"
import getUsers from "@/lib/getUsers"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Spinner from "../components/Spinner"
import Link from "next/link"

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userList = await getUsers()
        setUsers(userList)

        const albumsList = await getAlbums()
        setAlbums(albumsList)
      } catch (error) {
        console.error('Error fetching users')
        toast.error('Error fetching users data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const getUserAlbumCount = (userId) => {
    return albums.filter((album) => album.userId === userId).length
  }

  return (
    <div>
      <h1 className="text-center text-3xl font-bold text-primary">Users</h1>
      {loading 
        ? (
          <div className="flex flex-col items-center justify-center mt-10 h-32"> 
            <Spinner />
          </div>
        ) 
        : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 m-3 gap-2 md:gap-6 p-3">
            {users.map(user => (
              <Link
                key={user.id}
                href={`/user/${user.id}`} 
                className="border py-3 rounded-lg border-gray-300 flex flex-col items-center"
              >
                <div className="flex items-center justify-center bg-pink-500 text-white rounded-full w-16 h-16 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
        
                <h3
                  data-testid={`user-name-${user.id}`}
                  className="text-xl truncate w-full text-center px-2 hover:underline hover:text-[#a00a7c]"
                >
                  {user.name}
                </h3>
                <p>{getUserAlbumCount(user.id)} Albums</p>
              </Link>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default HomePage