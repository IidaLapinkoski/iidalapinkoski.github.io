import './ThemeToggle.css'

export default function ThemeToggle({ theme, onToggle }) {
  return (
    <button className="theme-toggle" onClick={onToggle} aria-label="Toggle theme">
      <div className="theme-toggle-icon">
        {theme === 'dark' ? '☀️' : '🌙'}
      </div>
    </button>
  )
}
