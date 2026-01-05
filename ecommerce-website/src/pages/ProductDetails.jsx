import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FiHeart, FiStar, FiShoppingCart, FiArrowLeft, FiCheck } from 'react-icons/fi'
import { products } from '../data/products'
import './ProductDetails.css'

function ProductDetails({ cart, wishlist, onAddToCart, onToggleWishlist }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === parseInt(id))
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <Link to="/products" className="back-link">Back to Products</Link>
      </div>
    )
  }

  const inWishlist = wishlist.some(p => p.id === product.id)
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product)
    }
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="product-details-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <div className="product-details-container">
        <div className="product-image-section">
          <div className="main-product-image">
            <div className="product-emoji-large">{product.image}</div>
            {product.featured && <span className="featured-badge">Featured</span>}
            {discount > 0 && <span className="discount-badge">-{discount}%</span>}
          </div>
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-rating-section">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <FiStar 
                  key={i} 
                  className={i < Math.floor(product.rating) ? 'filled' : ''}
                />
              ))}
            </div>
            <span className="rating-value">{product.rating}</span>
            <span className="reviews-count">({product.reviews} reviews)</span>
          </div>

          <div className="product-price-section">
            <div className="current-price">
              <span className="price-symbol">$</span>
              <span className="price-value">{product.price}</span>
            </div>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>

          <p className="product-description">{product.description}</p>

          <div className="product-details-list">
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{product.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Availability:</span>
              <span className={`detail-value ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Rating:</span>
              <span className="detail-value">{product.rating} / 5.0</span>
            </div>
          </div>

          <div className="quantity-section">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                className="quantity-input"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className={`add-to-cart-btn ${addedToCart ? 'added' : ''}`}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              {addedToCart ? (
                <>
                  <FiCheck /> Added to Cart!
                </>
              ) : (
                <>
                  <FiShoppingCart /> Add to Cart
                </>
              )}
            </button>
            <button 
              className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
              onClick={() => onToggleWishlist(product)}
            >
              <FiHeart />
              {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="related-products">
          <h2 className="section-title">Related Products</h2>
          <div className="related-products-grid">
            {relatedProducts.map((relatedProduct) => (
              <Link 
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
                className="related-product-card"
              >
                <div className="related-product-image">
                  <div className="related-product-emoji">{relatedProduct.image}</div>
                </div>
                <div className="related-product-info">
                  <h3>{relatedProduct.name}</h3>
                  <div className="related-product-price">${relatedProduct.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ProductDetails

