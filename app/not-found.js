'use client'

import { useRouter } from "next/navigation"
 
export default function NotFound() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      
        <h2 className="text-3xl font-bold text-pink-500 mb-4">Not Found</h2>
        <p className="text-gray-600 mb-4">Could not find the requested resource.</p>
        <button
          className="bg-secondary px-4 py-2 rounded-md text-white font-semibold hover:underline"
          onClick={() => router.back()}
        >
          Return Back
        </button>
      
    </div>
  )
}