import './Navigation.css'

export default function Navigation({ sections, currentSection, onNavigate }) {
  return (
    <nav className="navigation">
      <ul className="nav-list">
        {sections.map((section, index) => (
          <li key={section.id} className="nav-item">
            <button
              className={`nav-link ${index === currentSection ? 'active' : ''}`}
              onClick={() => onNavigate(index)}
              aria-label={`Navigate to ${section.id}`}
            >
              <span className="nav-indicator"></span>
              <span className="nav-label">{section.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
