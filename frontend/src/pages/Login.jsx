import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { loginSchema } from '../utils/validation'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants'
import LoginForm from '../components/auth/LoginForm'
import SocialAuth from '../components/auth/SocialAuth'
import ErrorMessage from '../components/common/ErrorMessage'

function Login() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn, signInWithGoogle, signInWithGitHub } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data) => {
    try {
      setError('')
      setLoading(true)
      await signIn(data.email, data.password)
      navigate('/dashboard')
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message || 'Failed to sign in')
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
    <div className="login-page">
      <div className="auth-container">
        <h1>Sign In</h1>
        {error && <ErrorMessage message={error} />}
        <LoginForm
          register={register}
          handleSubmit={handleSubmit(onSubmit)}
          errors={errors}
          loading={loading}
        />
        <SocialAuth onSocialAuth={handleSocialAuth} loading={loading} />
        <div className="auth-links">
          <Link to="/password-reset">Forgot password?</Link>
          <p>
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

