import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await req.json()
  const { name, whatsapp, message } = body

  if (!name || !whatsapp || !message) {
    return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: process.env.RESEND_TO_EMAIL!,
      subject: 'New Enquiry — Shree Laxmi Creation',
      html: `
        <table style="font-family:sans-serif;font-size:14px;color:#0D0C0A;">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>WhatsApp</strong></td><td>${whatsapp}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message}</td></tr>
        </table>
      `,
    })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
