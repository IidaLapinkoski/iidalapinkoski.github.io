import './ProjectDetail.css'

export default function ProjectDetail({ projectId, onBack }) {
  const projects = [
    {
      id: 1,
      title: 'LabRATory',
      description: 'Co-op puzzle platformer game about two scientists-turned-rats trying to escape testing environemts and find their way back to human form',
      year: '2025 - Present',
      hasMedia: false,
      details: 'Add more details about LabRATory here...',
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
      details: 'Expensive Collage is a fun and creative game where you play as a cunning thief trying to build the most expensive collage possible. The challenge is to strategically steal valuable items while avoiding detection and building the most impressive collection.',
    },
    {
      id: 3,
      title: 'Way back home',
      description: 'A childs adventure to find their way back home',
      year: '2025',
      hasMedia: false,
      details: 'Add more details about Way back home here...',
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
      details: 'Bubbling Thoughts is an interactive experience about understanding and managing your inner emotional world. Navigate through visual metaphors representing different thoughts and emotions as they bubble up and interact with each other.',
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
        <p className="project-detail-year">{project.year}</p>
        
        {project.hasMedia && (
          <div className="project-detail-media">
            <img src={project.gifs[0]} alt={project.title} className="detail-gif" />
          </div>
        )}
        
        <div className="project-detail-text">
          <p>{project.description}</p>
          <div className="project-detail-description">
            {project.details}
          </div>
        </div>
      </div>
    </div>
  )
}
