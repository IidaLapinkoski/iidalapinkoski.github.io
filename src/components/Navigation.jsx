import { useState } from 'react'
import './Navigation.css'
import sunIcon from '../assets/icons/sun.svg'
import moonIcon from '../assets/icons/moon.svg'

export default function Navigation({ sections, currentSection, onNavigate, onSelectProject, theme, onToggleTheme }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const projects = [
    { id: 1, title: 'LabRATory' },
    { id: 2, title: 'Expensive Collage' },
    { id: 3, title: 'Way back home' },
    { id: 4, title: 'Bubbling Thoughts' },
  ]

  const handleProjectClick = (projectId) => {
    // Find the index of the projects section
    const projectsIndex = sections.findIndex(s => s.id === 'projects')
    onNavigate(projectsIndex)
    onSelectProject(projectId)
    setDropdownOpen(false)
  }

  return (
    <nav className="navigation">
      <div className="nav-container">
        <ul className="nav-list">
          {sections.map((section, index) => {
            if (section.id === 'projects') {
              return (
                <li 
                  key={section.id} 
                  className="nav-item dropdown-container"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`nav-link ${index === currentSection ? 'active' : ''}`}
                    onClick={() => {
                      onNavigate(index)
                      setDropdownOpen(false)
                    }}
                  >
                    {section.label}
                  </button>
                  {dropdownOpen && (
                    <div className="dropdown-menu">
                      {projects.map(project => (
                        <button
                          key={project.id}
                          className="dropdown-item"
                          onClick={() => handleProjectClick(project.id)}
                        >
                          {project.title}
                        </button>
                      ))}
                    </div>
                  )}
                </li>
              )
            }

            return (
              <li key={section.id} className="nav-item">
                <button
                  className={`nav-link ${index === currentSection ? 'active' : ''}`}
                  onClick={() => onNavigate(index)}
                >
                  {section.label}
                </button>
              </li>
            )
          })}
        </ul>
        <button 
          className="theme-toggle-nav"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          <img 
            src={theme === 'dark' ? sunIcon : moonIcon} 
            alt="Theme toggle"
            className="theme-icon"
          />
        </button>
      </div>
    </nav>
  )
}
