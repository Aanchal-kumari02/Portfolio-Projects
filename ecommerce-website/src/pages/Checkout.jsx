import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiCreditCard, FiLock } from 'react-icons/fi'
import './Checkout.css'

function Checkout({ cart, setCart }) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

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

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order placement
    setOrderPlaced(true)
    setTimeout(() => {
      setCart([])
      navigate('/')
    }, 3000)
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="empty-cart-message">
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checkout.</p>
          <button onClick={() => navigate('/products')} className="shop-button">
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <FiCheckCircle className="success-icon" />
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for your purchase. You will receive a confirmation email shortly.</p>
          <p className="redirect-message">Redirecting to home page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-form-section">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <h2 className="form-section-title">
                <FiLock /> Shipping Information
              </h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Zip Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="form-section-title">
                <FiCreditCard /> Payment Information
              </h2>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <div className="order-item-emoji">{item.image}</div>
                <div className="order-item-info">
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-details">
                    Qty: {item.quantity} × ${item.price}
                  </div>
                </div>
                <div className="order-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="total-divider"></div>
            <div className="total-row final">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout

