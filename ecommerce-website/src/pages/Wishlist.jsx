import { Link } from 'react-router-dom'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import ProductCard from '../components/ProductCard'
import './Wishlist.css'

function Wishlist({ wishlist, cart, onAddToCart, onToggleWishlist }) {
  if (wishlist.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="empty-wishlist">
          <FiHeart className="empty-wishlist-icon" />
          <h2>Your wishlist is empty</h2>
          <p>Start adding products you love to your wishlist!</p>
          <Link to="/products" className="shop-button">
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1 className="page-title">
          <FiHeart className="title-icon" />
          My Wishlist
        </h1>
        <p className="page-subtitle">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            inWishlist={true}
          />
        ))}
      </div>
    </div>
  )
}

export default Wishlist

