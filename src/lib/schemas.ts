import { z } from 'zod'

/**
 * Zod schema for validating contact form submissions.
 * Ensures name, email, and message fields meet specified criteria.
 */
export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .min(2, { message: 'Must be at least 2 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('Invalid email.'),
  message: z.string().min(1, { message: 'Message is required.' })
})
