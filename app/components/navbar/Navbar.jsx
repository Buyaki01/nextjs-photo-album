'use client'

import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut } from "next-auth/react"
import { AiFillCaretDown } from "react-icons/ai"
import SignoutModal from "../SignoutModal"
import { useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { FaHome } from "react-icons/fa"
import { IoMdAlbums } from "react-icons/io"
import { MdMenu } from "react-icons/md"
import MobileMenu from "./MobileMenu"

const Navbar = () => {
  const user = useCurrentUser()
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const navigateToHome = () => {
    if (!user) {
      toast.error("Please login before proceeding to the homepage")
      return
    }

    router.push('/home')
  }

  const handleSignOutClick = () => {
    setIsSignOutModalOpen(true)
  }

  const handleSignOutConfirm = () => {
    signOut()
    setIsSignOutModalOpen(false)
  }

  const handleSignOutCancel = () => {
    setIsSignOutModalOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className="relative">
      <div className="flex justify-between bg-secondary text-white p-2 md:p-4 items-center mb-4 border">
        <h1 className="text-xl md:text-3xl font-bold md:p-2">
          <button
            className="cursor-pointer hover:underline flex items-center gap-1 whitespace-nowrap"
            onClick={navigateToHome}
          >
            <IoMdAlbums />
            Photo Album
          </button>
        </h1>

        <div className={`md:hidden ${isMenuOpen ? 'hidden' : 'block'}`}>
          <MdMenu
            className="text-xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        <div className={`flex gap-4 p-2 items-center text-lg md:text-xl ${isMenuOpen ? "flex-col md:flex" : "hidden md:flex"}`}>
          <div className="hidden md:block">
            <button
              className="cursor-pointer hover:underline flex items-center gap-1 whitespace-nowrap"
              onClick={navigateToHome}
            >
              <FaHome />
              <span>Home</span>
            </button>
          </div>

          <div>
            {user && (
              <div className="relative group">
                <div 
                  className="flex gap-1 items-center border rounded-full px-4 py-1 cursor-pointer hover:text-primary"
                  onClick={handleSignOutClick}
                >
                  <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="hidden md:block">Hi, {user.name.split(' ')[0]}</span>
                  <AiFillCaretDown className="mt-1"/>
                </div>

                <div className={`md:${isSignOutModalOpen ? 'SignoutModal' : ''}`}>
                  {isSignOutModalOpen && (
                    <SignoutModal
                      isOpen={isSignOutModalOpen}
                      title="Sign Out"
                      description={`Are you sure you want to sign out, ${user?.name}?`}
                      confirmText="Sign Out"
                      onCancel={handleSignOutCancel}
                      onConfirm={handleSignOutConfirm}
                    />
                  )}
                </div>

              </div>
              )
            }
          </div>
        </div>

        {isMenuOpen && (
          <MobileMenu
            onClose={closeMenu}
            onHomeClick={navigateToHome}
            isUserSignedIn={!!user}
          />
        )}

      </div>
    </div>
  )
}

export default Navbar