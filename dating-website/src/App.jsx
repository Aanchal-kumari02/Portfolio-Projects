import { useState } from 'react'
import { FiHeart, FiX, FiMessageCircle, FiStar, FiMapPin, FiCalendar } from 'react-icons/fi'
import './App.css'

const profiles = [
  {
    id: 1,
    name: 'Sarah',
    age: 28,
    location: 'New York',
    image: '👩',
    bio: 'Love traveling, photography, and coffee. Looking for someone adventurous!',
    interests: ['Travel', 'Photography', 'Coffee', 'Yoga'],
    distance: '2 miles away',
    match: 95
  },
  {
    id: 2,
    name: 'Emily',
    age: 26,
    location: 'Los Angeles',
    image: '👩‍🦰',
    bio: 'Bookworm and movie enthusiast. Let\'s share our favorite stories!',
    interests: ['Reading', 'Movies', 'Art', 'Cooking'],
    distance: '5 miles away',
    match: 88
  },
  {
    id: 3,
    name: 'Jessica',
    age: 30,
    location: 'Chicago',
    image: '👩‍🦳',
    bio: 'Fitness enthusiast and foodie. Always up for trying new restaurants!',
    interests: ['Fitness', 'Food', 'Music', 'Dancing'],
    distance: '8 miles away',
    match: 92
  },
  {
    id: 4,
    name: 'Olivia',
    age: 27,
    location: 'Miami',
    image: '👱‍♀️',
    bio: 'Beach lover and sunset chaser. Life\'s too short not to enjoy it!',
    interests: ['Beach', 'Surfing', 'Music', 'Travel'],
    distance: '12 miles away',
    match: 85
  },
  {
    id: 5,
    name: 'Sophia',
    age: 29,
    location: 'San Francisco',
    image: '👩‍💼',
    bio: 'Tech professional by day, explorer by night. Let\'s discover together!',
    interests: ['Technology', 'Hiking', 'Photography', 'Wine'],
    distance: '15 miles away',
    match: 90
  },
]

function App() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [matches, setMatches] = useState([])
  const [swipeDirection, setSwipeDirection] = useState(null)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleSwipe = (direction) => {
    if (isAnimating || currentIndex >= profiles.length) return
    
    setIsAnimating(true)
    setSwipeDirection(direction)
    
    if (direction === 'right') {
      setMatches([...matches, profiles[currentIndex]])
    }
    
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1)
      setSwipeDirection(null)
      setIsAnimating(false)
    }, 400)
  }

  const currentProfile = profiles[currentIndex]

  if (currentIndex >= profiles.length) {
    return (
      <div className="app">
        <div className="end-screen">
          <div className="end-content">
            <div className="heart-icon-large">💕</div>
            <h1>You're All Caught Up!</h1>
            <p>You've reviewed all profiles</p>
            {matches.length > 0 && (
              <div className="matches-summary">
                <h2>Your Matches ({matches.length})</h2>
                <div className="matches-grid">
                  {matches.map((match) => (
                    <div key={match.id} className="match-card-small">
                      <div className="match-image-small">{match.image}</div>
                      <h3>{match.name}</h3>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <button 
              className="cta-button"
              onClick={() => {
                setCurrentIndex(0)
                setMatches([])
              }}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">💕 LoveConnect</div>
          <div className="nav-stats">
            <span className="stat-item">
              <FiHeart className="stat-icon" />
              {matches.length} Matches
            </span>
          </div>
        </div>
      </nav>

      <main className="main-content">
        <div className="swipe-container">
          <div className={`profile-card ${swipeDirection === 'left' ? 'swipe-left' : ''} ${swipeDirection === 'right' ? 'swipe-right' : ''}`}>
            <div className="profile-header">
              <div className="profile-image">
                <div className="image-emoji">{currentProfile.image}</div>
                <div className="match-badge">
                  <FiStar />
                  {currentProfile.match}% Match
                </div>
              </div>
              <div className="profile-info">
                <h1 className="profile-name">
                  {currentProfile.name}, {currentProfile.age}
                </h1>
                <div className="profile-location">
                  <FiMapPin />
                  {currentProfile.location} • {currentProfile.distance}
                </div>
              </div>
            </div>

            <div className="profile-details">
              <div className="bio-section">
                <h3>About</h3>
                <p>{currentProfile.bio}</p>
              </div>

              <div className="interests-section">
                <h3>Interests</h3>
                <div className="interests-grid">
                  {currentProfile.interests.map((interest, idx) => (
                    <span key={idx} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button 
              className="action-btn reject-btn"
              onClick={() => handleSwipe('left')}
              disabled={isAnimating}
            >
              <FiX />
            </button>
            <button 
              className="action-btn super-like-btn"
              onClick={() => handleSwipe('super')}
              disabled={isAnimating}
            >
              <FiStar />
            </button>
            <button 
              className="action-btn like-btn"
              onClick={() => handleSwipe('right')}
              disabled={isAnimating}
            >
              <FiHeart />
            </button>
            <button 
              className="action-btn message-btn"
              onClick={() => handleSwipe('message')}
              disabled={isAnimating}
            >
              <FiMessageCircle />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

