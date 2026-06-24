import '../styles/Menu.css'
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import hero from '../assets/hero.png'
export default function Menu() {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    axios.get('http://192.168.68.58:5010/api/menu')
      .then(res => setMenuItems(res.data))
      .catch(console.error)
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
    <main className="menu-page">
      <div className="menu-anchors-wrap">
        <nav className="menu-anchors" aria-label="Menu sections">
          {sections.map(section => (
            <a
              key={section.id}
              className="menu-anchor"
              href={`#${section.id}`}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      <div className="menu-sections">
        {sections.map(section => (
          <section id={section.id} className="menu-section" key={section.id}>
            <h2 className="menu-section-title">{section.title}</h2>
            <div className="menu-grid">
              {section.items.map(item => (
                <article className={`menu-card${item.imageUrl ? '' : ' menu-card--text-only'}`}
                key={item._id}>
                  {item.imageUrl && (
                    <div className="menu-card-media">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                  )}
                  <div className="menu-card-body">
                    <h3 className="menu-card-title">{item.name}</h3>
                    <p className="menu-card-desc">{item.description}</p>
                    <div className="menu-card-price">${item.price.toFixed(2)}</div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}