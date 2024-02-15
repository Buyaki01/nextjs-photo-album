import { FaGoogle } from "react-icons/fa"

const LandingPage = () => {
  return ( 
    <div className="-mt-4 pt-10 p-5 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          Discover Your Memories with Our Photo Album App
        </h1>
        <p className="text-gray-700 text-lg mb-8">
          Explore and organize your memories with our photo album application.
          <br />
          Ready to get started? Login with your Google account below:
        </p>
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
