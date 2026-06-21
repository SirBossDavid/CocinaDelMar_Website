import '../styles/Order.css'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'

export default function Order() {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <main className="order-page">
      <div className="order-header">
        <p className="order-subtitle">Order Online</p>
        <h1 className="order-title">Order by section</h1>
        <p className="order-intro">
          Browse every dish with price and quantity details grouped by category.
        </p>
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
              {section.items.map(item => (
                <div className="order-item-row" key={item._id}>
                  <div className="order-item-name">{item.name}</div>
                  <div className="order-item-quantity">Qty: {item.quantity ?? 1}</div>
                  <div className="order-item-price">
                    ${Number(item.price ?? 0).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  )
}
