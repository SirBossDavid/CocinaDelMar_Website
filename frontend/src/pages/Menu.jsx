import '../styles/Menu.css'
import { useState, useEffect, useMemo, useRef } from 'react'
import axios from 'axios'
{/*subcomponent for slideshow */}
function FeaturedSlideshow({ imageItems }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (imageItems.length <= 1) return

    timerRef.current = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % imageItems.length)
    }, 5000)

    return () => clearInterval(timerRef.current)
  }, [imageItems.length])

  const active = imageItems[activeIndex]

  return (
    <div className="menu-featured">
      <img
        className="menu-featured-img"
        src={active.imageUrl}
        alt={active.name}
        key={active._id}
      />
      <div className="menu-featured-info">
        <span className="menu-featured-name">{active.name}</span>
        {active.description && (
          <span className="menu-featured-desc">{active.description}</span>
        )}
        <span className="menu-featured-price">${active.price.toFixed(2)}</span>
      </div>

      {imageItems.length > 1 && (
        <div className="menu-featured-dots">
          {imageItems.map((_, i) => (
            <button
              key={i}
              className={`menu-featured-dot${i === activeIndex ? ' active' : ''}`}
              onClick={() => {
                setActiveIndex(i)
                clearInterval(timerRef.current)
                timerRef.current = setInterval(() => {
                  setActiveIndex(prev => (prev + 1) % imageItems.length)
                }, 5000)
              }}
              aria-label={`Show ${imageItems[i].name}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function Menu() {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    axios.get('http://192.168.68.58:5010/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(console.error)
  }, [])

  const buildSections = useMemo(() => {
    const grouped = menuItems.reduce((acc, item) => {
      const category = item.category || 'Uncategorized'
      if (!acc[category]) acc[category] = []
      acc[category].push(item)
      return acc
    }, {})

    return Object.entries(grouped).map(([category, items]) => {
      const imageItems = items.filter(i => i.imageUrl)
      const restItems = items.filter(i => !i.imageUrl)
      return {
        id: category.toLowerCase().replace(/\s+/g, '-'),
        title: category,
        imageItems,
        restItems,
        count: items.length,
      }
    })
  }, [menuItems])

  return (
    <main className="menu-page">
      <div className="menu-sidebar-wrap">
        <nav className="menu-sidebar" aria-label="Menu sections">
          <span className="menu-sidebar-label">Menu</span>
          {buildSections.map(section => (
            <a
              key={section.id}
              className="menu-sidebar-link"
              href={`#${section.id}`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="menu-content">
        {buildSections.map(section => (
          <section id={section.id} className="menu-section" key={section.id}>

            <div className="menu-section-header">
              <h2 className="menu-section-title">{section.title}</h2>
              <span className="menu-section-count">{section.count} items</span>
            </div>

            <div className={`menu-section-body${section.imageItems.length === 0 ? ' no-photo' : ''}`}>

              {section.imageItems.length > 0 && (
                <FeaturedSlideshow imageItems={section.imageItems} />
              )}

              <ul className="menu-list">
                {section.restItems.map(item => (
                  <li className="menu-list-item" key={item._id}>
                    <div className="menu-list-left">
                      <span className="menu-list-name">{item.name}</span>
                      {item.description && (
                        <span className="menu-list-desc">{item.description}</span>
                      )}
                    </div>
                    <span className="menu-list-price">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>

            </div>
          </section>
        ))}
      </div>
    </main>
  )
}