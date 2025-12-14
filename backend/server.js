import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { initializeFirebaseAdmin } from './config/firebaseAdmin.js'
import authRoutes from './routes/auth.routes.js'
import userRoutes from './routes/user.routes.js'

// Load environment variables
dotenv.config()

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Initialize Firebase Admin (optional in development)
try {
  initializeFirebaseAdmin()
} catch (error) {
  console.warn('Backend running without Firebase Admin SDK. Some endpoints may not work.')
}

// Middleware
app.use(helmet()) // Security headers
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
app.use(morgan('dev')) // Logging
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app

