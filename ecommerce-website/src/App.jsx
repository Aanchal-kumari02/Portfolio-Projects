import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Featured from './pages/Featured'
import Deals from './pages/Deals'
import './App.css'

function App() {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const addToCart = (product) => {
    setCart([...cart, product])
    showToast(`${product.name} added to cart!`, 'success')
  }

  const toggleWishlist = (product) => {
    if (wishlist.find(p => p.id === product.id)) {
      setWishlist(wishlist.filter(p => p.id !== product.id))
      showToast(`${product.name} removed from wishlist`, 'info')
    } else {
      setWishlist([...wishlist, product])
      showToast(`${product.name} added to wishlist!`, 'success')
    }
  }

  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header 
            cart={cart}
            wishlist={wishlist}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <main className="main-content">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/" 
                element={
                  <Home 
                    cart={cart}
                    wishlist={wishlist}
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                  />
                } 
              />
              <Route 
                path="/products" 
                element={
                  <Products 
                    cart={cart}
                    wishlist={wishlist}
                    onAddToCart={addToCart}
                    onToggleWishlist={toggleWishlist}
                  />
                } 
              />
              <Route 
                path="/products/:id" 
                element={
                  <ProtectedRoute>
                    <ProductDetails 
                      cart={cart}
                      wishlist={wishlist}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                    />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/cart" 
                element={
                  <ProtectedRoute>
                    <Cart cart={cart} setCart={setCart} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/wishlist" 
                element={
                  <ProtectedRoute>
                    <Wishlist 
                      cart={cart}
                      wishlist={wishlist}
                      onAddToCart={addToCart}
                      onToggleWishlist={toggleWishlist}
                    />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/checkout" 
                element={
                  <ProtectedRoute>
                    <Checkout cart={cart} setCart={setCart} />
                  </ProtectedRoute>
                } 
              />
              <Route path="/featured" element={<Featured cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />} />
              <Route path="/deals" element={<Deals cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWishlist={toggleWishlist} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTop />
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
