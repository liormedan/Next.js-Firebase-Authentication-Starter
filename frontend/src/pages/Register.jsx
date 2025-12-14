import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { registerSchema } from '../utils/validation'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants'
import RegisterForm from '../components/auth/RegisterForm'
import SocialAuth from '../components/auth/SocialAuth'
import ErrorMessage from '../components/common/ErrorMessage'

function Register() {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { signUp, signInWithGoogle, signInWithGitHub } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data) => {
    try {
      setError('')
      setSuccess('')
      setLoading(true)
      await signUp(data.email, data.password)
      setSuccess(SUCCESS_MESSAGES.REGISTER_SUCCESS)
      setTimeout(() => {
        navigate('/dashboard')
      }, 2000)
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialAuth = async (provider) => {
    try {
      setError('')
      setLoading(true)
      const authMethod = provider === 'google' ? signInWithGoogle : signInWithGitHub
      await authMethod()
      navigate('/dashboard')
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message || `Failed to sign in with ${provider}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="auth-container">
        <h1>Create Account</h1>
        {error && <ErrorMessage message={error} />}
        {success && <div className="success-message">{success}</div>}
        <RegisterForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          loading={loading}
        />
        <SocialAuth onSocialAuth={handleSocialAuth} loading={loading} />
        <div className="auth-links">
          <p>
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register

