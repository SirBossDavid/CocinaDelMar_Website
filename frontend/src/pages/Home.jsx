import '../styles/Home.css'
import ceviche from '../assets/fish_ceviche.jpeg';
import fishtaco from '../assets/fishtaco.jpg';
import locationPlaceholder from '../assets/loc.jpg';
import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, useNavigate} from 'react-router-dom';
export default function Home() {
  
  const [customs, setCustoms] = useState([])
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/api/customs`)
             .then(res => setCustoms(res.data))
  },[])
  const navigate = useNavigate();
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
             
              <button className="btn btn-primary"  onClick={() => navigate('/menu')}>VIEW MENU</button>
              <a className="btn btn-secondary" href = 'https://order.spoton.com/so-cocina-del-mar-24164/oceanside-ca/BL-6ED6-1174-4146'>Order Online</a>
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
        /*checks img array - might remove */
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

      <section className="special-section">
        <div className="about-content">
          <div className="special-text">
            <p className="special-title">~ About Us ~</p>
            <h2 >Family-Owned Mexican Seafood</h2>
            <p>
              Founded in 2023, Cocina Del Mar is a family-owned and operated restaurant dedicated to sharing our lifelong passion for vibrant, traditional Mexican cuisine. While our family’s roots trace back to the rich culinary heritage of Oaxaca, our kitchen focuses on bringing a broad, delicious variety of classic Mexican seafood and favorite dishes straight to Oceanside.
            </p>
            <p>
              Every plate is scratch-made with love, fresh ingredients, and the authentic flavors of home.
            </p>
          </div>
          <div className = "Aboutus-img">
            <img src={locationPlaceholder} alt="Cocina Del Mar location placeholder" />
          </div>
        </div>
      </section>

    <div className='review-section'>
      <h2 className="special-title">Reviews</h2>
      <script src="https://elfsightcdn.com/platform.js" async></script>
      <div className="elfsight-app-a5e8ceb4-e606-44f7-9384-251df4a8bb33" data-elfsight-app-lazy></div>
    </div> 
    
    </main>
  )
}
