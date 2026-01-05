import { Link } from 'react-router-dom'
import { FiArrowRight, FiTruck, FiShield, FiHeadphones, FiAward } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import Carousel from '../components/Carousel'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import './Home.css'

function Home({ cart, wishlist, onAddToCart, onToggleWishlist }) {
  const { isAuthenticated } = useAuth()
  const featuredProducts = products.filter(p => p.featured).slice(0, 4)
  const latestProducts = isAuthenticated ? products.slice(0, 8) : products.slice(0, 4)

  return (
    <div className="home-page">
      <section className="hero">
        <Carousel
          items={[
            <div className="hero-slide">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="gradient-text">Welcome to ShopHub</span>
                  <br />
                  <span className="hero-subtitle-text">Discover Amazing Products</span>
                </h1>
                <p className="hero-description">
                  Your one-stop destination for the latest electronics, gadgets, and tech innovations. 
                  Shop with confidence and enjoy fast, reliable delivery.
                </p>
                <div className="hero-buttons">
                  <Link to="/products" className="cta-button primary">
                    Shop Now <FiArrowRight />
                  </Link>
                  <Link to="/about" className="cta-button secondary">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>,
            <div className="hero-slide">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="gradient-text">Premium Quality</span>
                  <br />
                  <span className="hero-subtitle-text">Best Prices Guaranteed</span>
                </h1>
                <p className="hero-description">
                  Get the best deals on premium electronics. Quality products at unbeatable prices 
                  with free shipping on orders over $100.
                </p>
                <div className="hero-buttons">
                  <Link to="/deals" className="cta-button primary">
                    View Deals <FiArrowRight />
                  </Link>
                  <Link to="/featured" className="cta-button secondary">
                    Featured Products
                  </Link>
                </div>
              </div>
            </div>,
            <div className="hero-slide">
              <div className="hero-content">
                <h1 className="hero-title">
                  <span className="gradient-text">New Arrivals</span>
                  <br />
                  <span className="hero-subtitle-text">Latest Tech Innovations</span>
                </h1>
                <p className="hero-description">
                  Be the first to discover our newest products. Stay ahead with cutting-edge 
                  technology and innovative solutions.
                </p>
                <div className="hero-buttons">
                  <Link to="/products" className="cta-button primary">
                    Explore Now <FiArrowRight />
                  </Link>
                  <Link to="/contact" className="cta-button secondary">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          ]}
          autoPlay={true}
          interval={6000}
        />
        <div className="hero-decoration">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
          <div className="floating-circle circle-4"></div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-container">
          <div className="feature-card">
            <div className="feature-icon">
              <FiTruck />
            </div>
            <h3>Free Shipping</h3>
            <p>Free shipping on orders over $100</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiShield />
            </div>
            <h3>Secure Payment</h3>
            <p>100% secure payment processing</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiHeadphones />
            </div>
            <h3>24/7 Support</h3>
            <p>Round-the-clock customer support</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <FiAward />
            </div>
            <h3>Quality Guarantee</h3>
            <p>Premium quality products guaranteed</p>
          </div>
        </div>
      </section>

      <section className="featured-products-section">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          {isAuthenticated ? (
            <Link to="/products" className="view-all-link">
              View All <FiArrowRight />
            </Link>
          ) : (
            <Link to="/login" className="view-all-link">
              Login to View All <FiArrowRight />
            </Link>
          )}
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
        {!isAuthenticated && (
          <div className="login-prompt-section">
            <p>Sign in to see more products and unlock exclusive features!</p>
            <Link to="/login" className="cta-button primary">
              Sign In Now <FiArrowRight />
            </Link>
          </div>
        )}
      </section>

      {isAuthenticated && (
        <section className="latest-products-section">
          <div className="section-header">
            <h2 className="section-title">Latest Products</h2>
            <Link to="/products" className="view-all-link">
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="products-grid">
            {latestProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                inWishlist={wishlist.some(p => p.id === product.id)}
              />
            ))}
          </div>
        </section>
      )}

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Shopping?</h2>
          <p>Explore our wide range of products and find exactly what you need</p>
          <Link to="/products" className="cta-button primary large">
            Browse All Products <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home

