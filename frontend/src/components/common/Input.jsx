import { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  id,
  className = '',
  ...props
}, ref) => {
  const inputId = id || props.name || label?.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <div className="form-group">
      {label && <label htmlFor={inputId}>{label}</label>}
      <input
        ref={ref}
        id={inputId}
        className={`form-input ${error ? 'error' : ''} ${className}`.trim()}
        {...props}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  )
})

Input.displayName = 'Input'

export default Input

