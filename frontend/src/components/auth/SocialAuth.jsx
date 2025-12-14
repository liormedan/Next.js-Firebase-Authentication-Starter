import Button from '../common/Button'

function SocialAuth({ onSocialAuth, loading }) {
  return (
    <div className="social-auth">
      <div className="divider">
        <span>OR</span>
      </div>
      <Button
        onClick={() => onSocialAuth('google')}
        disabled={loading}
        variant="outline"
        className="social-button google"
      >
        Continue with Google
      </Button>
      <Button
        onClick={() => onSocialAuth('github')}
        disabled={loading}
        variant="outline"
        className="social-button github"
      >
        Continue with GitHub
      </Button>
    </div>
  )
}

export default SocialAuth

