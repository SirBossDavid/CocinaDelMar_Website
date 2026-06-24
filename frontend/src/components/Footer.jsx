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
          <p>Sunday – Thursday<br />10:00 AM – 9:00 PM</p>
          <p>Friday – Saturday<br />10:00 AM – 10:00 PM</p>
          
        </div>

        <div className="footer-block">
          <p className="footer-heading">Location</p>
          <p>650 Douglas Dr unit 122<br />Oceanside, CA 92058</p>
          <p className="footer-contact">(760) 925-3060</p>
        </div>
        
        <section className="map-section">
        <h2>Find Us</h2>
        <iframe
          title="Restaurant location"
          src="https://maps.google.com/maps?width=600&height=400&hl=en&q=Cocina%20del%20mar%2C%20650%20douglas%20dr&t=&z=17&ie=UTF8&iwloc=B&output=embed"
          
         
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
      </div>
      
    </footer>
  )
}
