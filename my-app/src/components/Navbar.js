import {Link} from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { DarkModeContext } from '../context/DarkModeContext'
import { useContext } from 'react'



const Navbar = () => {
    const {darkMode, toggleDarkMode} = useContext(DarkModeContext)
    const {user} = useAuthContext()
    const {logout} = useLogout()
    const handleClick = (e) =>{
        logout()
    }
    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Mano pratimai</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <Link to='/stats'>Statistika </Link>

                            <span>{user.email}</span>
                            <button onClick={handleClick}>Atsijungti</button>
                            <div className='mode'>
                                <label className='switchh'>
                                    <input type='checkbox' checked={darkMode} onChange={toggleDarkMode}/>
                                    <span className='slider round'></span>
                                </label>
                            </div>
                        </div>

                    )}
                    {!user && (
                        <div>
                            <Link to='/login'>Prisijungti</Link>
                            <Link to='/signup'>Registracija</Link>
                            <div className='mode'>
                                <label className='switchh'>
                                    <input type='checkbox' checked={darkMode} onChange={toggleDarkMode}/>
                                    <span className='slider round'></span>
                                </label>
                            </div>
                        </div>

                    )}
                </nav>
            </div>
        </header> 
    )
}

export default Navbar