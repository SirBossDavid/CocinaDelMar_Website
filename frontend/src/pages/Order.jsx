import '../styles/Order.css'
import { useState, useEffect, useMemo } from 'react'
import { useCart } from '../context/CartContext'
import Cart from '../components/Cart'
import axios from 'axios'

export default function Order() {
  const { cart, dispatch } = useCart()
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    axios.get('http://192.168.68.58:5010/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(() => setError('Unable to load menu items.'))
      .finally(() => setLoading(false))
  }, [])

  const sections = useMemo(() => {
    const grouped = menuItems.reduce((acc, item) => {
      const category = item.category || 'Uncategorized'
      if (!acc[category]) acc[category] = []
      acc[category].push(item)
      return acc
    }, {})

    return Object.entries(grouped).map(([category, items]) => ({
      id: category.toLowerCase().replace(/\s+/g, '-'),
      title: category,
      items,
    }))
  }, [menuItems])

  function getQty(id) {
    return cart.find(item => item.id === id)?.quantity ?? 0
  }

  function increase(item) {
    dispatch({ type: 'ADD_ITEM', item: { id: item._id, name: item.name, price: item.price } })
  }

  function decrease(item) {
    const qty = getQty(item._id)
    if (qty <= 1) {
      dispatch({ type: 'REMOVE_ITEM', id: item._id })
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', id: item._id, quantity: qty - 1 })
    }
  }

  // total number of items in cart for the button badge
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="order-page">
      <div className="order-header">
        <p className="order-subtitle">Order Online</p>
        <h1 className="order-title">Order by section</h1>
        <p className="order-intro">
          Browse every dish with price and quantity details grouped by category.
        </p>
        {totalItems > 0 && (
          <button className="go-to-cart-btn" onClick={() => setCartOpen(true)}>
            View Cart · {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </button>
        )}
      </div>

      {loading ? (
        <div className="order-empty">Loading menu items...</div>
      ) : error ? (
        <div className="order-empty">{error}</div>
      ) : menuItems.length === 0 ? (
        <div className="order-empty">No menu items found.</div>
      ) : (
        sections.map(section => (
          <section className="order-section" key={section.id} id={section.id}>
            <h2 className="order-section-title">{section.title}</h2>
            <div className="order-grid">
              {section.items.map(item => {
                const qty = getQty(item._id)
                return (
                  <div className="order-item-row" key={item._id}>
                    <div className="order-item-name">{item.name}</div>
                    <div className="order-item-meta">
                      <div className="order-group-quantity">
                        <button
                          type="button"
                          className="order-button"
                          onClick={() => decrease(item)}
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
                          −
                        </button>
                        <div className="order-item-quantity">{qty}</div>
                        <button
                          type="button"
                          className="order-button"
                          onClick={() => increase(item)}
                          aria-label={`Increase quantity for ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <div className="order-item-price">
                        ${Number(item.price ?? 0).toFixed(2)}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        ))
      )}

      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
    </main>
  )
}