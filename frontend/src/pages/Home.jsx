import '../styles/Home.css'
import ceviche from '../assets/fish_ceviche.jpeg';
import fishtaco from '../assets/fishtaco.jpg';
import axios from 'axios'
import { useState, useEffect } from 'react';
export default function Home() {
  
  const [customs, setCustoms] = useState([])
  useEffect(()=>{
    axios.get("http://192.168.68.57:5010/api/customs")
             .then(res => setCustoms(res.data))
  },[])
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

      {/* Announcements Section */}
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '2.5rem', color: '#0b3b4a', marginBottom: '10px' }}>Announcements</h2>
      </div>

      {customs.length === 0 && (
        <section className="promo-card">
          <div className="promo-inner">
            <div className="promo-content">
              <div className="promo-subtitle">~ No Announcements ~</div>
              <h2 className="promo-title">No announcements right now</h2>
              <p className="promo-description">There are no active announcements. Check back later for specials and promotions.</p>
            </div>
          </div>
        </section>
      )}

      {customs.map((custom, idx) => {
        const isEven = idx % 2 === 1;
        const imgSrc = (custom.images && custom.images.length) ? custom.images[0] : custom.img_url || null;

        return (
          <section
            key={custom._id}
            className={`promo-card ${isEven ? 'promo-alt' : 'promo-default'}`}
          >
            <div className="promo-inner">
              <div className="promo-content">
                <div className="promo-subtitle">{custom.subtitle || '~ Our Special ~'}</div>
                <h2 className="promo-title">{custom.title}</h2>
                <p className="promo-description">{custom.description}</p>

                <div className="promo-meta-cta">
                  <div className="highlight-card">
                    <div className="highlight-title">{(custom.highlight && custom.highlight.title) || 'Details'}</div>
                    
                    <div className="highlight-body">{(custom.highlight && custom.highlight.body) || custom.meta || ''}</div>
                  </div>

                  <a
                    className="promo-cta"
                    href={custom.cta_link || '#'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {custom.cta_text || 'LEARN MORE'}
                  </a>
                </div>
              </div>

              <div className="promo-images">
                {imgSrc && (
                  <div className="img-wrap single-image">
                    <img src={imgSrc} alt={custom.title} />
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

    <div className='review-section'>
      <h2 className="special-title">Reviews</h2>
      <script src="https://elfsightcdn.com/platform.js" async></script>
      <div className="elfsight-app-a5e8ceb4-e606-44f7-9384-251df4a8bb33" data-elfsight-app-lazy></div>
    </div> 
    
    </main>
  )
}
