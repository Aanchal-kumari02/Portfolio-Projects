import { Link, useNavigate } from 'react-router-dom'
import { FiHeart, FiStar } from 'react-icons/fi'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import './ProductCard.css'

function ProductCard({ product, onAddToCart, onToggleWishlist, inWishlist, showQuickAdd = true }) {
  const [isHovered, setIsHovered] = useState(false)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {product.featured && <span className="featured-badge">Featured</span>}
      
      <button 
        className={`wishlist-icon ${inWishlist ? 'active' : ''}`}
        onClick={() => {
          if (isAuthenticated) {
            onToggleWishlist(product)
          } else {
            navigate('/login')
          }
        }}
        aria-label="Add to wishlist"
      >
        <FiHeart />
      </button>
      
      <Link to={`/products/${product.id}`} className="product-image-link">
        <div className="product-image">
          <div className="product-emoji">{product.image}</div>
          {showQuickAdd && (
            <button 
              className="add-to-cart-btn"
              onClick={(e) => {
                e.preventDefault();
                if (isAuthenticated) {
                  onAddToCart(product)
                } else {
                  navigate('/login')
                }
              }}
            >
              <span>{isAuthenticated ? 'Add to Cart' : 'Login to Add'}</span>
            </button>
          )}
        </div>
      </Link>
      
      <div className="product-info">
        <div className="product-name-container">
          <Link to={`/products/${product.id}`}>
            <h3 className="product-name">{product.name}</h3>
          </Link>
          {discount > 0 && <span className="discount-badge">-{discount}%</span>}
        </div>
        <p className="product-category">{product.category}</p>
        
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <FiStar 
                key={i} 
                className={i < Math.floor(product.rating) ? 'filled' : ''}
              />
            ))}
          </div>
          <span className="rating-value">{product.rating}</span>
          <span className="reviews-count">({product.reviews})</span>
        </div>
        
        <div className="product-price-container">
          <div className="product-price">
            <span className="price-symbol">$</span>
            <span className="price-value">{product.price}</span>
          </div>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard

