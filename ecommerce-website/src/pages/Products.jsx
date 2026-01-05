import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiX, FiDollarSign, FiStar } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import './Products.css'

function Products({ cart, wishlist, onAddToCart, onToggleWishlist }) {
  const { isAuthenticated } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [showFilters, setShowFilters] = useState(false)
  
  // Advanced filters (only for authenticated users)
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(2000)
  const [minRating, setMinRating] = useState(0)
  const [inStockOnly, setInStockOnly] = useState(false)
  const [featuredOnly, setFeaturedOnly] = useState(false)
  
  const searchTerm = searchParams.get('search') || ''

  useEffect(() => {
    if (searchTerm) {
      setSelectedCategory('All')
    }
  }, [searchTerm])

  let filteredProducts = products

  // Filter by search term
  if (searchTerm) {
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Filter by category
  if (selectedCategory !== 'All') {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory)
  }

  // Advanced filters (only for authenticated users)
  if (isAuthenticated) {
    // Price range filter
    filteredProducts = filteredProducts.filter(p => 
      p.price >= minPrice && p.price <= maxPrice
    )

    // Rating filter
    if (minRating > 0) {
      filteredProducts = filteredProducts.filter(p => p.rating >= minRating)
    }

    // Stock filter
    if (inStockOnly) {
      filteredProducts = filteredProducts.filter(p => p.inStock)
    }

    // Featured filter
    if (featuredOnly) {
      filteredProducts = filteredProducts.filter(p => p.featured)
    }
  }

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price)
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price)
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'name') {
    filteredProducts = [...filteredProducts].sort((a, b) => a.name.localeCompare(b.name))
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1 className="page-title">Our Products</h1>
        <p className="page-subtitle">Discover our wide range of premium products</p>
      </div>

      <div className="products-container">
        <aside className={`filters-sidebar ${showFilters ? 'active' : ''}`}>
          <div className="filters-header">
            <h2>Filters</h2>
            <button className="close-filters" onClick={() => setShowFilters(false)}>
              <FiX />
            </button>
          </div>

          <div className="filter-section">
            <h3>Category</h3>
            <div className="category-filters">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h3>Sort By</h3>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {isAuthenticated && (
            <>
              <div className="filter-divider"></div>
              <div className="advanced-filters-header">
                <h3>Advanced Filters</h3>
                <span className="premium-badge">Premium</span>
              </div>

              <div className="filter-section">
                <h3>
                  <FiDollarSign /> Price Range
                </h3>
                <div className="price-range">
                  <div className="price-inputs">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(Number(e.target.value))}
                      min="0"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      max="2000"
                    />
                  </div>
                  <div className="price-display">
                    ${minPrice} - ${maxPrice}
                  </div>
                </div>
              </div>

              <div className="filter-section">
                <h3>
                  <FiStar /> Minimum Rating
                </h3>
                <div className="rating-filter">
                  {[4, 3, 2, 1, 0].map(rating => (
                    <button
                      key={rating}
                      className={`rating-btn ${minRating === rating ? 'active' : ''}`}
                      onClick={() => setMinRating(rating)}
                    >
                      {rating > 0 ? `${rating}+ Stars` : 'All Ratings'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="filter-section">
                <h3>Additional Filters</h3>
                <label className="checkbox-filter">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                  />
                  <span>In Stock Only</span>
                </label>
                <label className="checkbox-filter">
                  <input
                    type="checkbox"
                    checked={featuredOnly}
                    onChange={(e) => setFeaturedOnly(e.target.checked)}
                  />
                  <span>Featured Products</span>
                </label>
              </div>
            </>
          )}

          {!isAuthenticated && (
            <div className="login-prompt">
              <p>🔒 Sign in to unlock advanced filters</p>
              <a href="/login" className="login-link">Login Now</a>
            </div>
          )}
        </aside>

        <main className="products-main">
          <div className="products-toolbar">
            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <FiFilter /> Filters
            </button>
            <div className="results-count">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onToggleWishlist={onToggleWishlist}
                  inWishlist={wishlist.some(p => p.id === product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found. Try adjusting your filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Products

