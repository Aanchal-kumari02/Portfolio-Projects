import { Link } from 'react-router-dom'
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi'
import './Cart.css'

function Cart({ cart, setCart }) {
  const updateQuantity = (productId, change) => {
    setCart(prevCart => {
      const productIndex = prevCart.findIndex(p => p.id === productId)
      if (productIndex === -1) return prevCart

      const newCart = [...prevCart]
      const currentQuantity = newCart.filter(p => p.id === productId).length

      if (change > 0) {
        // Add one more
        newCart.push(newCart[productIndex])
      } else {
        // Remove one
        const indexToRemove = newCart.findIndex(p => p.id === productId)
        if (indexToRemove !== -1) {
          newCart.splice(indexToRemove, 1)
        }
      }

      return newCart
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(p => p.id !== productId))
  }

  const getCartItems = () => {
    const itemsMap = new Map()
    cart.forEach(product => {
      if (itemsMap.has(product.id)) {
        itemsMap.get(product.id).quantity++
      } else {
        itemsMap.set(product.id, { ...product, quantity: 1 })
      }
    })
    return Array.from(itemsMap.values())
  }

  const cartItems = getCartItems()
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <FiShoppingBag className="empty-cart-icon" />
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="shop-button">
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <div className="cart-item-emoji">{item.image}</div>
              </div>
              
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-category">{item.category}</p>
                <div className="cart-item-price">${item.price}</div>
              </div>

              <div className="cart-item-quantity">
                <button 
                  onClick={() => updateQuantity(item.id, -1)}
                  className="quantity-btn"
                >
                  <FiMinus />
                </button>
                <span className="quantity-value">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, 1)}
                  className="quantity-btn"
                >
                  <FiPlus />
                </button>
              </div>

              <div className="cart-item-total">
                <div className="item-total-price">${(item.price * item.quantity).toFixed(2)}</div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="remove-btn"
                aria-label="Remove item"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          
          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
          </div>
          
          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          
          <div className="summary-divider"></div>
          
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {subtotal < 100 && (
            <div className="free-shipping-notice">
              Add ${(100 - subtotal).toFixed(2)} more for free shipping!
            </div>
          )}

          <Link to="/checkout" className="checkout-button">
            Proceed to Checkout
          </Link>

          <Link to="/products" className="continue-shopping">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Cart

