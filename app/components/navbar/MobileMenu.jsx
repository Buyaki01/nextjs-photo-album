import { AiOutlineLogout } from "react-icons/ai"
import { FaHome } from "react-icons/fa"
import { MdClose } from "react-icons/md"

const MobileMenu = ({ onClose, onHomeClick, onSignOutClick, isUserSignedIn }) => {
  return (
    <div className="fixed inset-x-0 top-20 z-50 bg-gray-500 bg-opacity-75">
      <div className="bg-mobile-menu p-6 rounded-md text-white">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-black">
            <MdClose className="text-2xl" />
          </button>
        </div>
        <div className="mt-4">
          <button
            className="cursor-pointer hover:underline flex items-center gap-2 whitespace-nowrap"
            onClick={onHomeClick}
          >
            <FaHome />
            <span>Home</span>
          </button>
        </div>
        {isUserSignedIn && (
          <div className="mt-4">
            <button
              className="cursor-pointer hover:underline flex items-center gap-1 whitespace-nowrap"
              onClick={onSignOutClick}
            >
              <AiOutlineLogout />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MobileMenu