import logo from '../assets/logo.png'
import blueprint from '../assets/blueprint.png'
import '../styles/Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="Cocina Del Mar logo" className="footer-logo" />
          <div>
            <p className="footer-brand-title">Cocina Del Mar</p>
            <p className="footer-brand-copy">
              Thank you for supporting local seafood and allowing us to share our passion with you.
            </p>
          </div>
        </div>

        <div className="footer-block">
          <p className="footer-heading">Hours</p>
          <p>Monday – Thursday<br />11:00 AM – 9:00 PM</p>
          <p>Friday – Saturday<br />11:00 AM – 10:00 PM</p>
          <p>Sunday<br />11:00 AM – 8:00 PM</p>
        </div>

        <div className="footer-block">
          <p className="footer-heading">Location</p>
          <p>123 Ocean Drive<br />San Diego, CA 92101</p>
          <p className="footer-contact">(619) 555-1234</p>
        </div>
      </div>
      
    </footer>
  )
}
