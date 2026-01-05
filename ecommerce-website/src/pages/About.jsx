import { FiAward, FiUsers, FiPackage, FiHeart } from 'react-icons/fi'
import './About.css'

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <h1 className="page-title">About ShopHub</h1>
        <p className="hero-subtitle">
          Your trusted destination for premium electronics and tech innovations
        </p>
      </section>

      <section className="about-content">
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            ShopHub was founded with a simple mission: to make cutting-edge technology 
            accessible to everyone. Since our inception, we've been committed to providing 
            high-quality electronics, exceptional customer service, and competitive prices.
          </p>
          <p>
            We believe that technology should enhance your life, and we're here to help 
            you find the perfect products that match your needs and lifestyle. Our curated 
            selection of electronics represents the best in innovation, quality, and value.
          </p>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">
              <FiUsers />
            </div>
            <div className="stat-number">100K+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiPackage />
            </div>
            <div className="stat-number">50K+</div>
            <div className="stat-label">Products Sold</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiAward />
            </div>
            <div className="stat-number">4.8/5</div>
            <div className="stat-label">Average Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FiHeart />
            </div>
            <div className="stat-number">99%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
        </div>

        <div className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <h3>Quality First</h3>
              <p>
                We carefully select every product to ensure it meets our high standards 
                for quality and performance.
              </p>
            </div>
            <div className="value-card">
              <h3>Customer Focus</h3>
              <p>
                Your satisfaction is our priority. We're committed to providing 
                exceptional service and support.
              </p>
            </div>
            <div className="value-card">
              <h3>Innovation</h3>
              <p>
                We stay ahead of the curve, offering the latest technology and 
                innovative solutions.
              </p>
            </div>
            <div className="value-card">
              <h3>Transparency</h3>
              <p>
                Honest pricing, clear policies, and transparent communication 
                in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

