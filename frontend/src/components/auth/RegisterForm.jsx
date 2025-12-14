import Button from '../common/Button'
import Input from '../common/Input'

function RegisterForm({ register, handleSubmit, errors, loading }) {
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
      <Input
        label="Confirm Password"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
        disabled={loading}
        required
      />
      <Button type="submit" disabled={loading} className="auth-button">
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}

export default RegisterForm

