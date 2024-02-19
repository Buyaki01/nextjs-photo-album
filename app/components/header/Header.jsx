'use client'

import { useCurrentUser } from "@/hooks/use-current-user"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { AiFillCaretDown } from "react-icons/ai"
import SignoutModal from "../SignoutModal"
import { useState } from "react"

const Header = () => {
  const user = useCurrentUser()
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false)

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

  return (
    <>
      <div className="flex justify-between bg-secondary text-white p-4 items-center mb-4">
        <h1 className="text-3xl font-bold p-2">
          <Link href='/'>Photo Album</Link>
        </h1>
        <div className="flex gap-4 p-2 items-center text-xl">
          <div>
            <Link
              className="cursor-pointer hover:text-primary"
              href='/home'>Home
            </Link>
          </div>

          <div>
            {user && (
              <div className="relative group">
                <div 
                  className="flex gap-1 items-center border rounded-full px-4 py-1 cursor-pointer hover:text-primary"
                  onClick={handleSignOutClick}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                  </svg>
                  <span className="inline-block"> Hi, {user.name.split(' ')[0]}</span>
                  <AiFillCaretDown />
                </div>

                <SignoutModal
                  isOpen={isSignOutModalOpen}
                  title="Sign Out"
                  description={`Are you sure you want to sign out, ${user?.name}?`}
                  confirmText="Sign Out"
                  onCancel={handleSignOutCancel}
                  onConfirm={handleSignOutConfirm}
                />
              </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Header