import './ProjectDetail.css'

export default function ProjectDetail({ projectId, onBack }) {
  const projects = [
    {
      id: 1,
      title: 'LabRATory',
      description: 'Co-op puzzle platformer game about two scientists-turned-rats trying to escape testing environemts and find their way back to human form',
      year: '2025 - Present',
    },
    {
      id: 2,
      title: 'Expensive Collage',
      description: 'Game Jam game about a thief trying to create the most expensive collage',
      year: '2025',
    },
    {
      id: 3,
      title: 'Way back home',
      description: 'A childs adventure to find their way back home',
      year: '2025',
    },
    {
      id: 4,
      title: 'Bubbling Thoughts',
      description: 'Game Jam game about managing thoughts and emotions',
      year: '2023',
    },
  ]

  const project = projects.find(p => p.id === projectId)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <div className="project-detail">
      <button className="back-button" onClick={onBack}>← Back</button>
      <div className="project-detail-content">
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-message">This is a work in progress</p>
      </div>
    </div>
  )
}
