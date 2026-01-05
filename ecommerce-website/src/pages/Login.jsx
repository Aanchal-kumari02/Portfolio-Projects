import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, authLoading, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      if (formData.email && formData.password) {
        const result = login(formData.email, formData.password)
        if (result.success) {
          navigate(from, { replace: true })
        }
      } else {
        setError('Please fill in all fields')
      }
      setLoading(false)
    }, 500)
  }

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    )
  }

  // Don't render if already authenticated (will redirect)
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-decoration">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
          <div className="auth-content">
            <h1 className="auth-title">Welcome Back!</h1>
            <p className="auth-subtitle">
              Sign in to access exclusive deals, track your orders, and manage your account.
            </p>
            <div className="auth-features">
              <div className="feature-item">
                <span className="feature-icon">🛒</span>
                <span>Add to Cart</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">❤️</span>
                <span>Save Wishlist</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎁</span>
                <span>Exclusive Deals</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>Sign In</h2>
              <p>Enter your credentials to continue</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>
                  <FiMail className="input-icon" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  <FiLock className="input-icon" />
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
                <FiArrowRight />
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button className="social-button google">
                <span>🔵</span> Continue with Google
              </button>
              <button className="social-button facebook">
                <span>🔵</span> Continue with Facebook
              </button>
            </div>

            <p className="auth-footer">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login

