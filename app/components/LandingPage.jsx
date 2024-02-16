'use client'

import { FaGoogle } from "react-icons/fa"
import { signIn } from "next-auth/react"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

const LandingPage = () => {
  const handleGoogleSignIn = () => {
    signIn("google", {
      callbackUrl: DEFAULT_LOGIN_REDIRECT
    })
  }

  return ( 
    <div className="-mt-4 pt-10 p-5 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Discover Your Memories with Our Photo Album App
        </h1>
        <p className="text-gray-700 text-md md:text-lg mb-2">
          Explore and organize your memories with our photo album application.
        </p>
        <p className="text-gray-700 text-lg mb-2">
          Ready to get started? 
        </p>
        <p className="text-gray-700 text-lg mb-6 font-bold"> Please login with your Google account below before proceeding to the Home Page</p>
        <div className="flex justify-center">
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 bg-gray-400 rounded-lg w-2/3 text-white px-4 py-2 font-semibold hover:bg-opacity-80"
          >
            <FaGoogle className="text-lg"/>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
