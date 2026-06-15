import '../styles/Home.css'
import ceviche from '../assets/ceviche.jpg';
import fishtaco from '../assets/fishtaco.jpg';
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
        </div>
      </section>

      

      {/* Tuesday Special Section */}
      <section className="special-section">
        <div className="special-content">
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
          <div className="special-image">
            <img src={ceviche} alt="Tuesday Specials" />
            <img src={fishtaco} alt="Tuesday Specials" />
          </div>
        </div>
      </section>
    </main>
  )
}
