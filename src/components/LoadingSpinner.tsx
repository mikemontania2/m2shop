import type React from "react"
import "../styles/loading.css"

interface LoadingSpinnerProps {
  message?: string
  size?: "small" | "medium" | "large"
  fullPage?: boolean
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Cargando...",
  size = "medium",
  fullPage = false,
}) => {
  const sizeClass = `spinner-${size}`

  if (fullPage) {
    return (
      <div className="loading-fullpage">
        <div className="loading-content">
          <div className={`spinner ${sizeClass}`} />
          <p className="loading-message">{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="loading-inline">
      <div className={`spinner ${sizeClass}`} />
      {message && <p className="loading-message">{message}</p>}
    </div>
  )
}

export default LoadingSpinner
