import { useState } from 'react'
import { FiStar, FiTrendingUp } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import './Featured.css'

function Featured({ cart, wishlist, onAddToCart, onToggleWishlist }) {
  const [sortBy, setSortBy] = useState('rating')
  
  const featuredProducts = products
    .filter(p => p.featured || p.rating >= 4.5)
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating
      if (sortBy === 'price-low') return a.price - b.price
      if (sortBy === 'price-high') return b.price - a.price
      return 0
    })

  return (
    <div className="featured-page">
      <div className="featured-hero">
        <div className="hero-content-wrapper">
          <div className="hero-icon">
            <FiStar />
          </div>
          <h1 className="page-title">Featured Products</h1>
          <p className="page-subtitle">
            Discover our handpicked selection of premium products with exceptional quality and ratings
          </p>
        </div>
      </div>

      <div className="featured-content">
        <div className="featured-header">
          <div className="header-left">
            <FiTrendingUp className="trending-icon" />
            <div>
              <h2>Top Rated Products</h2>
              <p>{featuredProducts.length} premium items</p>
            </div>
          </div>
          <div className="sort-controls">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="rating">Highest Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onToggleWishlist={onToggleWishlist}
              inWishlist={wishlist.some(p => p.id === product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Featured

