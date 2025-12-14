import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-name">Iida Lapinkoski</h1>
        <p className="header-subtitle">2D Artist & Animator</p>
        <p className="header-description">
          Asprining 2D artist and animator, passionate about brining stories to life through engaging visuals and dynamic motion.
        </p>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
        </div>
      </div>
    </header>
  )
}
