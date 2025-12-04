import './Header.css'

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-name">Iida Lapinkoski</h1>
        <p className="header-subtitle">2D Artist & Illustrator</p>
        <p className="header-description">
          Crafting visual stories through digital art
        </p>
        <div className="scroll-indicator">
          <span>Scroll to explore</span>
        </div>
      </div>
    </header>
  )
}
