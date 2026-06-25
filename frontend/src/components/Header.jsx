import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import '../styles/Header.css'
import logo from '../assets/logo.png';
import Footer from './Footer.jsx'
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div>
    <header className={`header ${menuOpen ? 'open' : ''}`}>

      <a className="header-logo" href="/">
        {/*LOGO */}
        <img src={logo} alt="Cocina Del Mar Logo" className="header-logo-icon"/>
        {/*LOGO TEXT*/}
        <div className="header-logo-text">
          <span className="header-logo-name">Cocina Del Mar</span>
          <span className="header-logo-sub">Fresh Mexican Seafood</span>
        </div>
      </a>

      {/*Nav GROUP */} 
      <nav>
        <ul className={`header-nav ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to ="/menu" onClick={() => setMenuOpen(false)}>Menu</Link></li>
          <li><Link to="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link></li>
          <li className="mobile-order">
            <Link to="https://order.spoton.com/so-cocina-del-mar-24164/oceanside-ca/BL-6ED6-1174-4146" onClick={() => setMenuOpen(false)}>Order Online</Link>
          </li>
        </ul>
      </nav>

      <Link to="https://order.spoton.com/so-cocina-del-mar-24164/oceanside-ca/BL-6ED6-1174-4146" className="header-order-btn desktop-only" onClick={() => setMenuOpen(false)}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 01-8 0"/>
        </svg>
        Order Online
      </Link>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
        <span className={`hamburger-line ${menuOpen ? 'open' : ''}`}></span>
      </button>
    
    </header>
    <Outlet/>
    <Footer/>
    </div>
  )
}