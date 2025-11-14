import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <Link to='/' className='flex items-center justify-center'>
            <img src="/logo.png" alt="logo" width={42} height={42} />
            <p className='text-2xl font-bold text-gradient'>REVALYZE</p>
        </Link>
        <Link to='/upload' className='primary-button w-fit'>
            Upload Resume
        </Link>
    </nav>
  )
}

export default Navbar