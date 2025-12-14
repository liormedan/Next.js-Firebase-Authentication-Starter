import Button from '../common/Button'
import Input from '../common/Input'

function LoginForm({ register, handleSubmit, errors, loading }) {
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <Input
        label="Email"
        type="email"
        {...register('email')}
        error={errors.email?.message}
        disabled={loading}
        required
      />
      <Input
        label="Password"
        type="password"
        {...register('password')}
        error={errors.password?.message}
        disabled={loading}
        required
      />
      <Button type="submit" disabled={loading} className="auth-button">
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}

export default LoginForm

