'use client'
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-red-500">Something went wrong!</h2>
      <p className="text-gray-600 mb-5">
        Please try again later.
      </p>
      <button
        onClick={() => reset()}
        className="bg-secondary text-white px-4 py-2 rounded-md transition duration-300 hover:bg-green-700 focus:outline-none focus:ring focus:border-green-300"
      >
        Try again
      </button>
    </div>
  )
}