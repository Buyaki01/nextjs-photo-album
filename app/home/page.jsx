'use client'

import getAlbums from "@/lib/getAlbums"
import getUsers from "@/lib/getUsers"
import Link from "next/link"
import { useEffect, useState } from "react"
import Spinner from "../components/Spinner"
import toast from "react-hot-toast"

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
        console.error('Error fetching users:', error)
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
      <h1 className="text-center text-2xl font-bold text-primary">Users</h1>
      {loading 
        ? (
          <div className="flex flex-col items-center justify-center mt-10 h-32"> 
            <Spinner />
          </div>
        ) 
        : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 m-3 gap-2 md:gap-4">
            {users.map(user => (
              <div 
                key={user.id}
                className="border h-48 flex flex-col items-center justify-center"
              >
                <h3 className="text-primary text-xl truncate w-full text-center px-2 hover:underline hover:text-[#a00a7c]">
                  <Link href={`/user/${user.id}`}>{user.name}</Link>
                </h3>
                <p>{getUserAlbumCount(user.id)} Albums</p>
              </div>
            ))}
          </div>
        )
      }
    </div>
  )
}

export default HomePage