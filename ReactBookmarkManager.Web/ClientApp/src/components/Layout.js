import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../AuthContext';

const Layout = ({ children }) => {
    const { user } = useAuthContext();
    const isLoggedIn = !!user;

    return (
        <div>
            <header>
                <nav className="navbar navbar-expand-sm navbar-dark fixed-top bg-dark border-bottom box-shadow">
                    <div className="container">
                        <Link to='/' className="navbar-brand">Bookmark Manager</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target=".navbar-collapse" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                            <ul className="navbar-nav flex-grow-1">
                                {!isLoggedIn && <>
                                    <li className="nav-item"><Link to="/signup" className='nav-link text-light'>Signup</Link></li>
                                    <li className="nav-item"><Link to="/login" className='nav-link text-light'>Login</Link></li>
                                </>}
                                {isLoggedIn && <>
                                    <li className="nav-item"><Link to="/addbookmark" className='nav-link text-light'>Add Bookmark</Link></li>
                                    <li className="nav-item"><Link to="/mybookmarks" className='nav-link text-light'>My Bookmarks</Link></li>
                                    <li className="nav-item"><Link to="/logout" className='nav-link text-light'>Logout</Link></li>
                                </>}
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <div className="container" style={{ marginTop: 60 }}>
                {children}
            </div>
        </div>
    )
}

export default Layout;