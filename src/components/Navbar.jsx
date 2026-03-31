import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Navbar = () => {
    const cartState = useSelector(state => state.handleCart)
    const wishlistState = useSelector(state => state.handleWishlist)
    const navigate = useNavigate()
    const isLoggedIn = Boolean(localStorage.getItem('greenleafUser'))

    const handleLogout = () => {
        localStorage.removeItem('greenleafUser')
        navigate('/')
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-custom py-2 sticky-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold px-2 d-flex align-items-center" to="/">
                    <img src="/assets/images/logo.png" alt="Logo" width="100" height="100" className="me-2" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/product">Plants</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center d-flex align-items-center gap-2 flex-wrap justify-content-center">
                        <NavLink to="/wishlist" className="btn btn-nature m-2" title="Wishlist" aria-label="Wishlist" style={{ minWidth: '46px' }}>
                            <i className="fa fa-heart"></i>
                            {wishlistState.length > 0 && (
                                <span className="ms-1">({wishlistState.length})</span>
                            )}
                        </NavLink>
                        <NavLink to="/cart" className="btn btn-nature m-2" title="Cart" aria-label="Cart" style={{ minWidth: '46px' }}>
                            <i className="fa fa-shopping-cart"></i>
                            {cartState.length > 0 && (
                                <span className="ms-1">({cartState.length})</span>
                            )}
                        </NavLink>
                        {!isLoggedIn ? (
                            <NavLink to="/login" className="btn btn-nature m-2">
                                <i className="fa fa-user-plus me-1"></i>Login/Signup
                            </NavLink>
                        ) : (
                            <button className="btn btn-outline-nature m-2" onClick={handleLogout}>
                                <i className="fa fa-sign-out me-1"></i>Logout
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar