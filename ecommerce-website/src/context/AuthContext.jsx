import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simulate login - in real app, this would be an API call
    const userData = {
      id: Date.now(),
      email,
      name: email.split('@')[0],
      loginTime: new Date().toISOString()
    }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return { success: true, user: userData }
  }

  const signup = (name, email, password) => {
    // Simulate signup - in real app, this would be an API call
    const userData = {
      id: Date.now(),
      email,
      name,
      loginTime: new Date().toISOString()
    }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return { success: true, user: userData }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

