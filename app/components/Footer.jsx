import { FaLinkedin, FaGithub } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-secondary hover:bg-secondary hover:text-white text-white p-2 font-bold text-lg mt-3">
      <div className='flex justify-center'>
        <p>&copy; {new Date().getFullYear()} Photo Album. All Rights Reserved.</p>
      </div>
    
      <div className="flex justify-center gap-2 mt-3 text-2xl">
        <Link 
          href="https://www.linkedin.com/in/ritta-sweta"
          className='hover:text-primary'
        >
          <FaLinkedin />
        </Link>
        <Link 
          href="https://github.com/Buyaki01"
          className='hover:text-primary'
        >
          <FaGithub />
        </Link>
      </div>
    </footer>
  )
}

export default Footer