import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import Header from './components/Header'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import ProjectDetail from './components/ProjectDetail'
import Navigation from './components/Navigation'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const [theme, setTheme] = useState('dark')
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollDirection, setScrollDirection] = useState(null)
  const [selectedProjectId, setSelectedProjectId] = useState(null)
  const scrollTimeoutRef = useRef(null)
  const touchStartRef = useRef(null)
  const touchEndRef = useRef(null)
  const prevSectionRef = useRef(0)

  const sections = [
    { id: 'header', label: 'Home', component: Header },
    { id: 'projects', label: 'Work', component: Projects },
    { id: 'about', label: 'About', component: About },
    { id: 'contact', label: 'Contact', component: Contact },
  ]

  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
  }, [theme])

  // Track previous section for outgoing animations and scroll to top
  useEffect(() => {
    const activeSection = document.querySelector('.section.active')
    if (activeSection) {
      activeSection.scrollTop = 0
    }
    prevSectionRef.current = currentSection
  }, [currentSection])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleNavigate = (index) => {
    if (isTransitioning || index === currentSection) return
    
    setIsTransitioning(true)
    
    // Update prevSectionRef to the target section so Work doesn't animate out
    prevSectionRef.current = index
    
    // Scroll to top immediately before transition
    const targetSection = document.querySelectorAll('.section')[index]
    if (targetSection) {
      targetSection.scrollTop = 0
    }
    
    // Determine direction for animation
    const direction = index > currentSection ? 'down' : 'up'
    setScrollDirection(direction)
    
    // Set the new section BEFORE clearing the project so the correct section renders
    setCurrentSection(index)
    // Clear project detail page
    setSelectedProjectId(null)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      setScrollDirection(null)
    }, 1000)
  }

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId)
  }

  const handleBackFromProject = () => {
    setSelectedProjectId(null)
  }

  const handleScroll = useCallback((e) => {
    // Don't change sections when viewing a project detail page
    if (selectedProjectId !== null) return
    
    if (isTransitioning) return

    const direction = e.deltaY > 0 ? 'down' : 'up'
    const activeSection = document.querySelector('.section.active')
    
    if (activeSection) {
      const scrollHeight = activeSection.scrollHeight
      const clientHeight = activeSection.clientHeight
      const scrollTop = activeSection.scrollTop
      
      // Check if section has scrollable content (more content than viewport)
      if (scrollHeight > clientHeight) {
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
        const isAtTop = scrollTop <= 5
        
        // When scrolling down and not at bottom, don't switch sections
        if (direction === 'down' && !isAtBottom) {
          return
        }
        
        // When scrolling up and not at top, don't switch sections
        if (direction === 'up' && !isAtTop) {
          return
        }
      }
    }

    setScrollDirection(direction)
    setIsTransitioning(true)
    setCurrentSection(prev => (prev + (direction === 'down' ? 1 : -1) + sections.length) % sections.length)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      setScrollDirection(null)
    }, 1000)
  }, [isTransitioning, selectedProjectId, sections])

  const handleTouchStart = useCallback((e) => {
    touchStartRef.current = e.targetTouches[0].clientY
  }, [])

  const handleTouchEnd = useCallback((e) => {
    if (!touchStartRef.current) return

    // Don't change sections when viewing a project detail page
    if (selectedProjectId !== null) return

    touchEndRef.current = e.changedTouches[0].clientY
    const distance = touchStartRef.current - touchEndRef.current
    const isSwipeDown = distance < -50 // Swiped down
    const isSwipeUp = distance > 50 // Swiped up

    if (!isSwipeDown && !isSwipeUp) return

    if (isTransitioning) return

    const activeSection = document.querySelector('.section.active')
    let shouldChangeSection = true
    
    if (activeSection) {
      const scrollHeight = activeSection.scrollHeight
      const clientHeight = activeSection.clientHeight
      const scrollTop = activeSection.scrollTop
      
      // Check if section has scrollable content
      if (scrollHeight > clientHeight) {
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5
        const isAtTop = scrollTop <= 5
        
        // When swiping up (moving to next) and not at bottom, don't switch sections
        if (isSwipeUp && !isAtBottom) {
          shouldChangeSection = false
        }
        
        // When swiping down (moving to previous) and not at top, don't switch sections
        if (isSwipeDown && !isAtTop) {
          shouldChangeSection = false
        }
      }
    }

    if (!shouldChangeSection) return

    const direction = isSwipeUp ? 'down' : 'up'
    setScrollDirection(direction)
    
    setIsTransitioning(true)
    setCurrentSection(prev => (prev + (direction === 'down' ? 1 : -1) + sections.length) % sections.length)

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }
    
    scrollTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false)
      setScrollDirection(null)
    }, 1000)
  }, [isTransitioning, selectedProjectId, sections])

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true })
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleScroll, handleTouchStart, handleTouchEnd])

  const getPositionClass = (index) => {
    if (index === currentSection) {
      return 'active'
    }
    
    // The outgoing section is always the previous one (before transition)
    if (index === prevSectionRef.current) {
      return scrollDirection === 'down' ? 'outgoing' : 'outgoing-up'
    }
    
    return 'below'
  }

  return (
    <div className="app">
      <Navigation sections={sections} currentSection={currentSection} onNavigate={handleNavigate} onSelectProject={handleSelectProject} theme={theme} onToggleTheme={toggleTheme} />
      <div className="sections-container">
        {selectedProjectId !== null ? (
          <div className="section active">
            <ProjectDetail projectId={selectedProjectId} onBack={handleBackFromProject} />
          </div>
        ) : (
          sections.map((section, index) => {
            const positionClass = getPositionClass(index)
            
            return (
              <div
                key={section.id}
                className={`section ${positionClass}`}
                data-position={positionClass !== 'active' ? positionClass : undefined}
              >
                {section.component === Header && <Header />}
                {section.component === Projects && <Projects onSelectProject={setSelectedProjectId} />}
                {section.component === About && <About />}
                {section.component === Contact && <Contact />}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default App
