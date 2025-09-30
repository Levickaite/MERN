import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import { DarkModeContext } from '../context/DarkModeContext'
import { useContext } from 'react'
import { Moon, Sun } from 'lucide-react'

const Navbar = () => {
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext)
    const [isOpen, setIsOpen] = useState(false)
    const handleClick = (e) =>{
        logout()
    }
    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Mano pratimai</h1>
                </Link>
                <nav className={isOpen ? 'open' : ''}>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <Link to='/stats' onClick={() => setIsOpen(false)}>Statistika </Link>

                            <button onClick={handleClick}>Atsijungti</button>
                            <button className='darkmode-toggle' onClick={toggleDarkMode}>
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                    )}
                    {!user && (
                        <div>
                            <Link to='/login' onClick={() => setIsOpen(false)}>Prisijungti</Link>
                            <Link to='/signup' onClick={() => setIsOpen(false)}>Registracija</Link>
                            <button className='darkmode-toggle' onClick={toggleDarkMode}>
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                    )}
                </nav>
                <button className='hamburger' onClick={toggleMenu} aria-label="Toggle menu">
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </button>
            </div>
        </header>
    )
}

export default Navbar
