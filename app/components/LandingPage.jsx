import { auth } from "@/auth"
import { FaGoogle } from "react-icons/fa"

const LandingPage = async () => {
  const session = await auth()

  return ( 
    <div className="-mt-4 pt-10 p-5 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Discover Your Memories with Our Photo Album App
        </h1>
        <p className="text-gray-700 text-md md:text-lg mb-2">
          Explore and organize your memories with our photo album application.
        </p>
        <p className="text-gray-700 text-md mb-6">
          Ready to get started? 
          <span className="font-bold"> Please login with your Google account below before proceeding to the Home Page</span>
        </p>
        <div className="flex justify-center">
          <button 
            className="flex items-center justify-center gap-2 bg-gray-400 rounded-lg w-2/3 text-white px-4 py-2 font-semibold hover:bg-opacity-80"
          >
            <FaGoogle className="text-lg"/>
            Continue with Google
          </button>
        </div>
      </div>

      {/* {JSON.stringify(session)} */}
    </div>
  )
}

export default LandingPage
