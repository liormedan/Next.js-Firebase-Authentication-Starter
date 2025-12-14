import admin from '../config/firebaseAdmin.js'

/**
 * @desc    Verify and get authenticated user info
 * @route   GET /api/auth/verify
 * @access  Private
 */
export const getAuthController = async (req, res) => {
  try {
    const userRecord = await admin.auth().getUser(req.user.uid)
    
    res.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL,
        disabled: userRecord.disabled,
        metadata: {
          creationTime: userRecord.metadata.creationTime,
          lastSignInTime: userRecord.metadata.lastSignInTime
        }
      }
    })
  } catch (error) {
    console.error('Get auth error:', error)
    res.status(500).json({ error: 'Failed to get user information' })
  }
}

/**
 * @desc    Create a new user (Admin function)
 * @route   POST /api/auth/create-user
 * @access  Private
 */
export const createUserController = async (req, res) => {
  try {
    const { email, password, displayName, photoURL } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
      photoURL,
      emailVerified: false
    })

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName
      }
    })
  } catch (error) {
    console.error('Create user error:', error)
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already exists' })
    }
    
    res.status(500).json({ error: 'Failed to create user' })
  }
}

/**
 * @desc    Delete a user account
 * @route   DELETE /api/auth/delete-user/:uid
 * @access  Private
 */
export const deleteUserController = async (req, res) => {
  try {
    const { uid } = req.params

    // Only allow users to delete their own account or require admin role
    if (req.user.uid !== uid) {
      return res.status(403).json({ error: 'Unauthorized to delete this account' })
    }

    await admin.auth().deleteUser(uid)

    res.json({
      success: true,
      message: 'User deleted successfully'
    })
  } catch (error) {
    console.error('Delete user error:', error)
    
    if (error.code === 'auth/user-not-found') {
      return res.status(404).json({ error: 'User not found' })
    }
    
    res.status(500).json({ error: 'Failed to delete user' })
  }
}

