import { z } from 'zod'
import schemaValues from '../constants/schema_values'

const UserEmailSchema = z
  .string()
  .min(1, { message: 'No ha puesto el email' })
  .email({ message: 'Email no válido' })
  .max(schemaValues.USER_EMAIL_LENGTH, { message: 'Email demasiado largo' })
const UserPasswordSchema = z
  .string()
  .min(1, { message: 'No ha puesto la contraseña' })
  .regex(/[a-zA-Z]/, { message: 'debe tener al menos una letra' })
  .regex(/[0-9]/, { message: 'debe tener al menos un número' })
  .regex(/[^a-zA-Z0-9]/, { message: 'debe tener al menos un caráter especial' })
  .min(schemaValues.USER_PASSWORD_MIN_LENGTH, {
    message: `Debe tener cómo mínimo ${schemaValues.USER_PASSWORD_MIN_LENGTH} caracteres`,
  })
  .max(schemaValues.USER_PASSWORD_MAX_LENGTH, {
    message: `No puede tener más de ${schemaValues.USER_PASSWORD_MAX_LENGTH} caracteres`,
  })

export const loginSchema = z.object({
  email: UserEmailSchema,
  password: z.string().min(1, { message: 'No ha puesto la contraseña' }),
})
export const signUpSchema = z
  .object({
    email: UserEmailSchema,
    password: UserPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'La contraseña no coincide',
    path: ['confirmPassword'],
  })

export const resetPasswordSchema = z
  .object({
    password: UserPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'La contraseña no coincide',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: UserEmailSchema,
})
