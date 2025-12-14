function Button({
  children,
  onClick,
  type = 'button',
  disabled = false,
  variant = 'primary',
  className = '',
  ...props
}) {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const classes = `${baseClass} ${variantClass} ${className}`.trim()

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

