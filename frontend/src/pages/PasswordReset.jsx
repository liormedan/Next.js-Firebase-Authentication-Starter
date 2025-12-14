import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { passwordResetSchema } from '../utils/validation'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants'
import Button from '../components/common/Button'
import ErrorMessage from '../components/common/ErrorMessage'

function PasswordReset() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { resetPassword } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(passwordResetSchema)
  })

  const onSubmit = async (data) => {
    try {
      setError('')
      setSuccess('')
      setLoading(true)
      await resetPassword(data.email)
      setSuccess(SUCCESS_MESSAGES.PASSWORD_RESET_SENT)
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message || 'Failed to send password reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="password-reset-page">
      <div className="auth-container">
        <h1>Reset Password</h1>
        <p>Enter your email address and we'll send you a link to reset your password.</p>
        {error && <ErrorMessage message={error} />}
        {success && <div className="success-message">{success}</div>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              {...register('email')}
              type="email"
              id="email"
              disabled={loading}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
        <div className="auth-links">
          <Link to="/login">Back to Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default PasswordReset

