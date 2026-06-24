import { useCart } from '../context/CartContext'
import '../styles/Cart.css'

export default function Cart({ onClose }) {
  const { cart, dispatch } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function remove(id) {
    dispatch({ type: 'REMOVE_ITEM', id })
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-modal" onClick={e => e.stopPropagation()}>

        <div className="cart-header">
          <h2 className="cart-title">Your Cart</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {cart.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map(item => (
                <li className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-qty">x{item.quantity}</span>
                  </div>
                  <div className="cart-item-right">
                    <span className="cart-item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      className="cart-remove"
                      onClick={() => remove(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="cart-checkout">
                Go to Payment
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  )
}