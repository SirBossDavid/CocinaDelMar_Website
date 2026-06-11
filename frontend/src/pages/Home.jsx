import hero from '../assets/hero.png'
import '../styles/Home.css'

export default function Home() {
  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-subtitle">~ Fresh. Flavorful. Authentic. ~</p>
            <h1 className="hero-title">MEXICAN<span className="hero-title-accent">Seafood</span></h1>
            <p className="hero-description">
              Experience the bold flavors of Mexico with our fresh seafood dishes made with love and tradition.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary"  href="/menu">VIEW MENU</button>
              <button className="btn btn-secondary">RESERVE A TABLE</button>
            </div>
          </div>
          <div className="hero-image">
            <img src={hero} alt="Mexican Seafood Dish" />
          </div>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,64L100,58.7C200,53,400,42,600,48C800,53,1000,75,1100,80L1200,85L1200,0L1100,0C1000,0,800,0,600,0C400,0,200,0,100,0L0,0Z" fill="currentColor"></path>
        </svg>
      </div>

      {/* Tuesday Special Section */}
      <section className="special-section">
        <div className="special-content">
          <div className="special-image">
            <img src={hero} alt="Tuesday Specials" />
          </div>
          <div className="special-text">
            <p className="special-subtitle">~ Our Special ~</p>
            <h2 className="special-title">TUESDAY TACOS & CEVICHE</h2>
            <p className="special-description">
              Join us every Tuesday for our exclusive special featuring authentic tacos and fresh ceviche at unbeatable prices. Enjoy 25% off on selected items and experience the authentic flavors of coastal Mexico.
            </p>
            <div className="special-highlight">
              <p><strong>Every Tuesday</strong></p>
              <p>25% Discount on Tacos & Ceviche</p>
            </div>
            <button className="btn btn-primary">LEARN MORE</button>
          </div>
        </div>
      </section>
    </main>
  )
}
