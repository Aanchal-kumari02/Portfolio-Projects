import { useState, useEffect } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Carousel.css'

function Carousel({ items, autoPlay = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, interval)

    return () => clearInterval(timer)
  }, [items.length, autoPlay, interval])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <div
          className="carousel-content"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="carousel-slide">
              {item}
            </div>
          ))}
        </div>
        <button className="carousel-button prev" onClick={goToPrevious}>
          <FiChevronLeft />
        </button>
        <button className="carousel-button next" onClick={goToNext}>
          <FiChevronRight />
        </button>
      </div>
      <div className="carousel-indicators">
        {items.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel

