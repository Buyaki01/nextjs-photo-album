import Link from "next/link"

const Header = () => {
  return (
    <div className="flex justify-between bg-secondary text-white p-4 items-center mb-4">
      <h1 className="text-3xl font-bold">
        <Link href='/'>Photo Album</Link>
      </h1>
      <div className="flex gap-4">
        <div>
          <Link href='/home'>Home</Link>
        </div>
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default Header