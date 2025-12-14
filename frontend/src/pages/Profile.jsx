import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../hooks/useAuth'
import { profileSchema, updatePasswordSchema } from '../utils/validation'
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '../utils/constants'
import Button from '../components/common/Button'
import ErrorMessage from '../components/common/ErrorMessage'

function Profile() {
  const { user, updateProfile, updatePassword, deleteAccount, logout } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  const profileForm = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      displayName: user?.displayName || '',
      photoURL: user?.photoURL || ''
    }
  })

  const passwordForm = useForm({
    resolver: zodResolver(updatePasswordSchema)
  })

  const onProfileSubmit = async (data) => {
    try {
      setError('')
      setSuccess('')
      setLoading(true)
      await updateProfile(data.displayName, data.photoURL || null)
      setSuccess(SUCCESS_MESSAGES.PROFILE_UPDATED)
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const onPasswordSubmit = async (data) => {
    try {
      setError('')
      setSuccess('')
      setLoading(true)
      await updatePassword(data.newPassword)
      setSuccess(SUCCESS_MESSAGES.PASSWORD_UPDATED)
      passwordForm.reset()
    } catch (err) {
      setError(ERROR_MESSAGES[err.code] || err.message || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        setError('')
        setLoading(true)
        await deleteAccount()
        await logout()
        navigate('/login')
      } catch (err) {
        setError(ERROR_MESSAGES[err.code] || err.message || 'Failed to delete account')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <h1>Profile Settings</h1>
        <div className="profile-tabs">
          <button
            className={activeTab === 'profile' ? 'active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </button>
          <button
            className={activeTab === 'password' ? 'active' : ''}
            onClick={() => setActiveTab('password')}
          >
            Password
          </button>
        </div>

        {error && <ErrorMessage message={error} />}
        {success && <div className="success-message">{success}</div>}

        {activeTab === 'profile' && (
          <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
            <div className="form-group">
              <label>Display Name</label>
              <input
                {...profileForm.register('displayName')}
                type="text"
                disabled={loading}
              />
              {profileForm.formState.errors.displayName && (
                <span className="error">{profileForm.formState.errors.displayName.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Photo URL</label>
              <input
                {...profileForm.register('photoURL')}
                type="url"
                disabled={loading}
              />
              {profileForm.formState.errors.photoURL && (
                <span className="error">{profileForm.formState.errors.photoURL.message}</span>
              )}
            </div>
            <Button type="submit" disabled={loading}>
              Update Profile
            </Button>
          </form>
        )}

        {activeTab === 'password' && (
          <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
            <div className="form-group">
              <label>Current Password</label>
              <input
                {...passwordForm.register('currentPassword')}
                type="password"
                disabled={loading}
              />
              {passwordForm.formState.errors.currentPassword && (
                <span className="error">{passwordForm.formState.errors.currentPassword.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                {...passwordForm.register('newPassword')}
                type="password"
                disabled={loading}
              />
              {passwordForm.formState.errors.newPassword && (
                <span className="error">{passwordForm.formState.errors.newPassword.message}</span>
              )}
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                {...passwordForm.register('confirmPassword')}
                type="password"
                disabled={loading}
              />
              {passwordForm.formState.errors.confirmPassword && (
                <span className="error">{passwordForm.formState.errors.confirmPassword.message}</span>
              )}
            </div>
            <Button type="submit" disabled={loading}>
              Update Password
            </Button>
          </form>
        )}

        <div className="danger-zone">
          <h3>Danger Zone</h3>
          <Button onClick={handleDeleteAccount} variant="danger" disabled={loading}>
            Delete Account
          </Button>
        </div>

        <Button onClick={() => navigate('/dashboard')} variant="secondary">
          Back to Dashboard
        </Button>
      </div>
    </div>
  )
}

export default Profile

