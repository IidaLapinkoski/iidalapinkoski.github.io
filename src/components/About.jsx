import './About.css'

export default function About() {
  return (
    <section className="about">
      <div className="about-content">
        <h2>About Me</h2>
        <div className="about-container">
          <div className="about-text">
            <p>
              I'm a passionate 2D artist with a focus on creating visually compelling and emotionally resonant work.
              With years of experience in digital illustration, animation, and concept art, I strive to bring stories
              to life through my art.
            </p>
            <p>
              My creative journey has taken me through various mediums and styles, but my love for clean, minimalist
              design and modern aesthetics continues to guide my work. I believe in the power of simplicity and the
              impact of thoughtful visual communication.
            </p>
            <p>
              When I'm not creating art, you can find me exploring new techniques, collaborating with other creatives,
              or finding inspiration in the world around me.
            </p>
          </div>
          <div className="about-image">
            <div className="image-placeholder">
              <span>Your Image Here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
