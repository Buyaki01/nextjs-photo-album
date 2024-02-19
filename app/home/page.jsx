'use client'

import getAlbums from "@/lib/getAlbums"
import getUsers from "@/lib/getUsers/getUsers"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Spinner from "../components/Spinner"
import UsersList from "../components/UsersList"

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
              <UsersList key={user.id} user={user} albums={albums} />
            ))}
          </div>
        )
      }
    </div>
  )
}

export default HomePage