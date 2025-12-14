function Input({
  label,
  error,
  id,
  className = '',
  ...props
}) {
  const inputId = id || props.name || label.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <div className="form-group">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        id={inputId}
        className={`form-input ${error ? 'error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
}

export default Input

