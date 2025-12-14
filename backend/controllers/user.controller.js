import admin from '../config/firebaseAdmin.js'

/**
 * @desc    Get current user's profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfileController = async (req, res) => {
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
        },
        customClaims: userRecord.customClaims
      }
    })
  } catch (error) {
    console.error('Get user profile error:', error)
    res.status(500).json({ error: 'Failed to get user profile' })
  }
}

/**
 * @desc    Update current user's profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfileController = async (req, res) => {
  try {
    const { displayName, photoURL, email } = req.body
    const updateData = {}

    if (displayName !== undefined) updateData.displayName = displayName
    if (photoURL !== undefined) updateData.photoURL = photoURL
    if (email !== undefined) updateData.email = email

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    const userRecord = await admin.auth().updateUser(req.user.uid, updateData)

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName,
        photoURL: userRecord.photoURL
      }
    })
  } catch (error) {
    console.error('Update user profile error:', error)
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({ error: 'Email already exists' })
    }
    
    res.status(500).json({ error: 'Failed to update profile' })
  }
}

/**
 * @desc    Get list of users (Admin only - paginated)
 * @route   GET /api/users
 * @access  Private
 */
export const getUserListController = async (req, res) => {
  try {
    const { pageToken, maxResults = 1000 } = req.query

    const listUsersResult = await admin.auth().listUsers(
      parseInt(maxResults),
      pageToken
    )

    const users = listUsersResult.users.map(user => ({
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
      disabled: user.disabled,
      metadata: {
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime
      }
    }))

    res.json({
      success: true,
      users,
      pageToken: listUsersResult.pageToken,
      totalUsers: users.length
    })
  } catch (error) {
    console.error('Get user list error:', error)
    res.status(500).json({ error: 'Failed to get user list' })
  }
}

