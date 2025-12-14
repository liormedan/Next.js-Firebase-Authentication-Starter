import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'

function Dashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1>Dashboard</h1>
        <div className="user-info">
          <h2>Welcome, {user?.displayName || user?.email}!</h2>
          <div className="user-details">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Email Verified:</strong> {user?.emailVerified ? 'Yes' : 'No'}</p>
            {user?.photoURL && (
              <img src={user.photoURL} alt="Profile" className="profile-image" />
            )}
          </div>
        </div>
        <div className="dashboard-actions">
          <Button onClick={() => navigate('/profile')}>Edit Profile</Button>
          <Button onClick={handleLogout} variant="secondary">Logout</Button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

