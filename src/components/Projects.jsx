import './Projects.css'

export default function Projects({ onSelectProject }) {
  const projects = [
    {
      id: 1,
      title: 'LabRATory',
      description: 'Co-op puzzle platformer game about two scientists-turned-rats trying to escape testing environemts and find their way back to human form',
      year: '2025 - Present',
      hasMedia: false,
    },
    {
      id: 2,
      title: 'Expensive Collage',
      description: 'Game Jam game about a thief trying to create the most expensive collage',
      year: '2025',
      hasMedia: true,
      gifs: [
        '/videos/gifs/ExpensiveCollage/ExpensiveCollage1.gif',
        '/videos/gifs/ExpensiveCollage/ExpensiveCollage2.gif',
        '/videos/gifs/ExpensiveCollage/ExpensiveCollage3.gif',
      ],
    },
    {
      id: 3,
      title: 'Way back home',
      description: 'A childs adventure to find their way back home',
      year: '2025',
      hasMedia: false,
    },
    {
      id: 4,
      title: 'Bubbling Thoughts',
      description: 'Game Jam game about managing thoughts and emotions',
      year: '2023',
      hasMedia: true,
      gifs: [
        '/videos/gifs/BubblingThoughts/BubblingThoughts1.gif',
        '/videos/gifs/BubblingThoughts/BubblingThoughts2.gif',
        '/videos/gifs/BubblingThoughts/BubblingThoughts3.gif',
      ],
    },
  ]

  return (
    <section className="projects">
      <div className="projects-content">
        <h2 className="projects-title">Work</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div 
              key={project.id} 
              className="project-card"
              onClick={() => onSelectProject(project.id)}
              role="button"
              tabIndex={0}
            >
              {project.hasMedia ? (
                <div className="project-media">
                  <img src={project.gifs[0]} alt={project.title} className="project-gif" />
                </div>
              ) : (
                <div className="project-placeholder">
                  <span>Image: {project.title}</span>
                </div>
              )}
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-year">{project.year}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
