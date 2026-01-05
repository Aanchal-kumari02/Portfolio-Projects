import { useEffect } from 'react'
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertCircle } from 'react-icons/fi'
import './Toast.css'

function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose()
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const icons = {
    success: <FiCheckCircle />,
    error: <FiXCircle />,
    info: <FiInfo />,
    warning: <FiAlertCircle />
  }

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">{icons[type]}</div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose}>
        <FiXCircle />
      </button>
    </div>
  )
}

export default Toast

