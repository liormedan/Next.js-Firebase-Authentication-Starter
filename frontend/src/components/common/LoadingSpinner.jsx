function LoadingSpinner({ size = 'medium' }) {
  return (
    <div className={`loading-spinner spinner-${size}`} aria-label="Loading">
      <div className="spinner"></div>
    </div>
  )
}

export default LoadingSpinner

