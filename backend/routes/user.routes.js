import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import {
  getUserProfileController,
  updateUserProfileController,
  getUserListController
} from '../controllers/user.controller.js'

const router = express.Router()

// All routes require authentication
router.use(verifyToken)

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private
 */
router.get('/profile', getUserProfileController)

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user's profile
 * @access  Private
 */
router.put('/profile', updateUserProfileController)

/**
 * @route   GET /api/users
 * @desc    Get list of users (Admin only)
 * @access  Private
 */
router.get('/', getUserListController)

export default router

