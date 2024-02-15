import { FaGoogle } from "react-icons/fa"

const LandingPage = () => {
  return ( 
    <div className="-mt-4 pt-10 p-5 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Discover Your Memories with Our Photo Album App
        </h1>
        <p className="text-gray-700 text-md md:text-lg mb-2">
          Explore and organize your memories with our photo album application.
        </p>
        <p className="text-gray-700 text-lg mb-6"><span className="font-bold">Ready to get started?</span> Login with your Google account below:</p>
        <div className="flex justify-center">
          <button 
            className="bg-gray-500 flex items-center justify-center gap-3 rounded-lg w-2/3 text-white px-6 py-3 font-semibold hover:bg-opacity-80"
          >
            <FaGoogle />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
