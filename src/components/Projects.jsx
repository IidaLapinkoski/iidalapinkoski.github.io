import './Projects.css'

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Project One',
      description: 'A beautiful exploration of color and form',
      year: '2024',
    },
    {
      id: 2,
      title: 'Project Two',
      description: 'Digital illustration series',
      year: '2024',
    },
    {
      id: 3,
      title: 'Project Three',
      description: 'Character design study',
      year: '2023',
    },
    {
      id: 4,
      title: 'Project Four',
      description: 'Environmental concept art',
      year: '2023',
    },
  ]

  return (
    <section className="projects">
      <div className="projects-content">
        <h2 className="projects-title">Work</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-placeholder">
                <span>Image: {project.title}</span>
              </div>
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
