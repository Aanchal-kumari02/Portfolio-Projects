import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup, isAuthenticated, loading: authLoading } = useAuth()
  const navigate = useNavigate()

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

  const validatePassword = (password) => {
    return password.length >= 6
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Validation
    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long')
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      if (formData.name && formData.email && formData.password) {
        const result = signup(formData.name, formData.email, formData.password)
        if (result.success) {
          navigate('/', { replace: true })
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

  const passwordStrength = formData.password.length > 0 ? (
    formData.password.length >= 8 ? 'strong' :
    formData.password.length >= 6 ? 'medium' : 'weak'
  ) : ''

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
            <h1 className="auth-title">Join ShopHub!</h1>
            <p className="auth-subtitle">
              Create an account to unlock exclusive features and start shopping.
            </p>
            <div className="auth-features">
              <div className="feature-item">
                <FiCheck className="check-icon" />
                <span>Access to all products</span>
              </div>
              <div className="feature-item">
                <FiCheck className="check-icon" />
                <span>Advanced filters & search</span>
              </div>
              <div className="feature-item">
                <FiCheck className="check-icon" />
                <span>Save items to wishlist</span>
              </div>
              <div className="feature-item">
                <FiCheck className="check-icon" />
                <span>Track your orders</span>
              </div>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            <div className="auth-header">
              <h2>Create Account</h2>
              <p>Fill in your details to get started</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>
                  <FiUser className="input-icon" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

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
                    placeholder="Create a password"
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
                {formData.password && (
                  <div className={`password-strength ${passwordStrength}`}>
                    <div className="strength-bar"></div>
                    <span className="strength-text">
                      {passwordStrength === 'strong' ? 'Strong' :
                       passwordStrength === 'medium' ? 'Medium' : 'Weak'}
                    </span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>
                  <FiLock className="input-icon" />
                  Confirm Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <div className="password-match">
                    <FiCheck /> Passwords match
                  </div>
                )}
              </div>

              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" required />
                  <span>I agree to the <Link to="/terms">Terms & Conditions</Link> and <Link to="/privacy">Privacy Policy</Link></span>
                </label>
              </div>

              <button type="submit" className="auth-button" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
                <FiArrowRight />
              </button>
            </form>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="social-login">
              <button type="button" className="social-button google">
                <span>🔵</span> Continue with Google
              </button>
              <button type="button" className="social-button facebook">
                <span>🔵</span> Continue with Facebook
              </button>
            </div>

            <p className="auth-footer">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup

