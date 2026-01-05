import { useState } from 'react'
import { FiTag, FiClock } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import './Deals.css'

function Deals({ cart, wishlist, onAddToCart, onToggleWishlist }) {
  const deals = products.filter(p => p.originalPrice && p.price < p.originalPrice)
    .sort((a, b) => {
      const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100
      const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100
      return discountB - discountA
    })


  return (
    <div className="deals-page">
      <div className="deals-hero">
        <div className="hero-content-wrapper">
          <div className="hero-icon">
            <FiTag />
          </div>
          <h1 className="page-title">Special Deals</h1>
          <p className="page-subtitle">
            Don't miss out on these amazing discounts! Limited time offers on premium products.
          </p>
          <div className="countdown-banner">
            <FiClock />
            <span>Limited Time Offers - Shop Now!</span>
          </div>
        </div>
      </div>

      <div className="deals-content">
        <div className="deals-header">
          <h2>Best Deals</h2>
          <p>{deals.length} products on sale</p>
        </div>

        <div className="products-grid">
          {deals.map((product) => (
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

export default Deals

