import { z } from 'zod'

// Email validation schema
export const emailSchema = z.string().email('Invalid email address')

// Password validation schema
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required')
})

// Register form schema
export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

// Password reset schema
export const passwordResetSchema = z.object({
  email: emailSchema
})

// Update password schema
export const updatePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

// Profile update schema
export const profileSchema = z.object({
  displayName: z.string().min(1, 'Display name is required').max(50, 'Display name is too long'),
  photoURL: z.string().url('Invalid URL').optional().or(z.literal(''))
})

