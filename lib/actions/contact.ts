"use server"

import { db } from "@/lib/db"
import { contactSubmissions } from "@/lib/db/schema"
import { contactFormSchema } from "@/lib/data/schemas"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitContactForm(formData: unknown) {
  const parsed = contactFormSchema.safeParse(formData)
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors }
  }

  const { name, email, phone, projectType, message } = parsed.data

  // Insert into DB
  await db.insert(contactSubmissions).values({
    name,
    email,
    phone: phone || null,
    project_type: projectType || null,
    message,
  })

  // Send email notification
  const notifyEmail = process.env.NOTIFY_EMAIL
  if (notifyEmail && process.env.RESEND_API_KEY) {
    try {
      await resend.emails.send({
        from: "MK Interiors <onboarding@resend.dev>",
        to: notifyEmail,
        subject: `New contact: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ""}
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      })
    } catch (e) {
      console.error("Failed to send notification email:", e)
    }
  }

  return { success: true }
}
