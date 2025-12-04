import './Contact.css'

export default function Contact() {
  return (
    <>
      <footer className="contact">
        <div className="contact-content">
          <h2 className="contact-title">Get In Touch</h2>
          
          <div className="contact-info">
            <div className="contact-section">
              <p className="contact-label">Email</p>
              <a href="mailto:your.email@example.com" className="contact-link">
                your.email@example.com
              </a>
            </div>

            <div className="contact-divider"></div>

            <div className="contact-section">
              <p className="contact-label">Social</p>
              <div className="social-links">
                <a href="#" className="contact-link">
                  Instagram
                </a>
                <a href="#" className="contact-link">
                  Portfolio
                </a>
                <a href="#" className="contact-link">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <p className="contact-footer">
        © 2025 Iida Lapinkoski. All rights reserved.
      </p>
    </>
  )
}
