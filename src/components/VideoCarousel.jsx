import { useState, useRef, useEffect } from 'react'
import './VideoCarousel.css'

export default function VideoCarousel({ videos, title }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleEnded = () => {
      setCurrentIndex((prev) => (prev + 1) % videos.length)
    }

    video.addEventListener('ended', handleEnded)
    return () => video.removeEventListener('ended', handleEnded)
  }, [videos.length])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.src = videos[currentIndex]
    video.load()
    
    const playVideo = () => {
      video.play().catch(err => console.log('Autoplay prevented:', err))
    }

    // Try to play once metadata is loaded
    video.addEventListener('canplay', playVideo, { once: true })
    
    return () => video.removeEventListener('canplay', playVideo)
  }, [currentIndex, videos])

  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length)
  }

  return (
    <div className="video-carousel">
      <video 
        ref={videoRef}
        src={videos[0]}
        muted
        className="carousel-video"
      />
    </div>
  )
}
