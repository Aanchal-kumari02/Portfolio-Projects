import './LoadingSpinner.css'

function LoadingSpinner({ size = 'medium', fullScreen = false }) {
  const sizeClass = `spinner-${size}`
  
  if (fullScreen) {
    return (
      <div className="loading-overlay">
        <div className={`spinner ${sizeClass}`}></div>
        <p className="loading-text">Loading...</p>
      </div>
    )
  }

  return <div className={`spinner ${sizeClass}`}></div>
}

export default LoadingSpinner

