'use server'

import EmailTemplate from '@/emails/email-template'
import { ContactFormSchema } from '@/lib/schemas'
import React from 'react'
import { Resend } from 'resend'
import { z } from 'zod'

if (!process.env.RESEND_API_KEY) {
  throw new Error('Missing RESEND_API_KEY environment variable')
}

if (!process.env.CONTACT_FORM_TO_EMAIL) {
  throw new Error('Missing CONTACT_FORM_TO_EMAIL environment variable')
}

type ContactFormInputs = z.infer<typeof ContactFormSchema>
const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Server action to send an email using the Resend API.
 * Validates the input data against `ContactFormSchema` and sends an email using `EmailTemplate`.
 * @param data - The contact form input data (name, email, message).
 * @returns An object indicating success or containing an error message.
 */
export async function sendEmail(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data)

  if (result.error) {
    return { error: result.error.format() }
  }

  try {
    const { name, email, message } = result.data
    const { data: emailData, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.CONTACT_FORM_TO_EMAIL!],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      react: React.createElement(EmailTemplate, { name, email, message })
    })

    if (!emailData || error) {
      throw new Error(error?.message || 'Failed to send email')
    }

    return { success: true }
  } catch (error) {
    return { error }
  }
}
