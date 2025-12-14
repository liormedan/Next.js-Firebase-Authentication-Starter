import express from 'express'
import { verifyToken } from '../middleware/auth.middleware.js'
import { getAuthController, createUserController, deleteUserController } from '../controllers/auth.controller.js'

const router = express.Router()

/**
 * @route   GET /api/auth/verify
 * @desc    Verify Firebase ID token
 * @access  Public (but requires valid token)
 */
router.get('/verify', verifyToken, getAuthController)

/**
 * @route   POST /api/auth/create-user
 * @desc    Create a new user (Admin only - requires server-side token)
 * @access  Private
 */
router.post('/create-user', verifyToken, createUserController)

/**
 * @route   DELETE /api/auth/delete-user/:uid
 * @desc    Delete a user account (Admin only)
 * @access  Private
 */
router.delete('/delete-user/:uid', verifyToken, deleteUserController)

export default router

