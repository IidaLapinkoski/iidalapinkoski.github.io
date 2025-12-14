import './Contact.css'
import itchIcon from '../assets/icons/itch-io.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'

export default function Contact() {
  return (
    <div className="contact">
      <div className="contact-content">
        <h2 className="contact-title">Get In Touch</h2>
        
        <div className="contact-info">
          <div className="contact-section">
            <p className="contact-label">Email</p>
            <a href="mailto:lapinkoski.iida@gmail.com" className="contact-link">
              lapinkoski.iida@gmail.com
            </a>
          </div>

          <div className="contact-divider"></div>

          <div className="contact-section">
            <p className="contact-label">Socials</p>
            <div className="social-links">
              <a href="https://iida-lapinkoski.itch.io/" className="social-icon-link" title="Itch.io">
                <img src={itchIcon} alt="Itch.io" className="social-icon" />
              </a>
              <a href="https://www.linkedin.com/in/iida-lapinkoski-7b62a0324/" className="social-icon-link" title="LinkedIn">
                <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <p className="contact-footer">
        © 2025 Iida Lapinkoski. All rights reserved.
      </p>
    </div>
  )
}
