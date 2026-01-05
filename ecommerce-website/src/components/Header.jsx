import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiShoppingCart, FiHeart, FiSearch, FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import './Header.css'

function Header({ cart, wishlist, searchTerm, setSearchTerm, onSearch }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const userMenuRef = useRef(null)

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserMenu])

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🛍️</span>
          <span className="logo-text">ShopHub</span>
        </Link>
        
          <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            onClick={() => setMobileMenuOpen(false)}
            className={isActive('/') ? 'active' : ''}
          >
            Home
          </Link>
          <Link 
            to="/products" 
            onClick={() => setMobileMenuOpen(false)}
            className={isActive('/products') ? 'active' : ''}
          >
            Products
          </Link>
          <Link 
            to="/featured" 
            onClick={() => setMobileMenuOpen(false)}
            className={isActive('/featured') ? 'active' : ''}
          >
            Featured
          </Link>
          <Link 
            to="/deals" 
            onClick={() => setMobileMenuOpen(false)}
            className={isActive('/deals') ? 'active' : ''}
          >
            Deals
          </Link>
          <Link 
            to="/about" 
            onClick={() => setMobileMenuOpen(false)}
            className={isActive('/about') ? 'active' : ''}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            onClick={() => setMobileMenuOpen(false)}
            className={isActive('/contact') ? 'active' : ''}
          >
            Contact
          </Link>
        </div>
        
        <div className="nav-actions">
          <form className="search-box" onSubmit={handleSearchSubmit}>
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
          
          {isAuthenticated && (
            <>
              <Link to="/wishlist" className="icon-btn cart-btn">
                <FiHeart />
                {/* </wdqwew> */}
                {wishlist.length > 0 && <span className="badge">{wishlist.length}</span>}
              </Link>
              
              <Link to="/cart" className="icon-btn cart-btn">
                <FiShoppingCart />
                {cart.length > 0 && <span className="badge">{cart.length}</span>}
              </Link>
            </>
          )}

          {isAuthenticated ? (
            <div className="user-menu-container" ref={userMenuRef}>
              <button 
                className="icon-btn user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <FiUser />
              </button>
              {showUserMenu && (
                <div className="user-menu">
                  <div className="user-info">
                    <div className="user-avatar">{user?.name?.charAt(0).toUpperCase() || 'U'}</div>
                    <div>
                      <div className="user-name">{user?.name || 'User'}</div>
                      <div className="user-email">{user?.email}</div>
                    </div>
                  </div>
                  <div className="user-menu-divider"></div>
                  <Link to="/profile" className="user-menu-item" onClick={() => setShowUserMenu(false)}>
                    <FiUser /> Profile
                  </Link>
                  <button className="user-menu-item logout-btn" onClick={() => {
                    logout()
                    setShowUserMenu(false)
                    navigate('/')
                  }}>
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="login-link-btn">
              Sign In
            </Link>
          )}
          
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header

