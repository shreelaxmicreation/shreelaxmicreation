import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const body = await req.json()
  const { name, company, location, email, whatsapp, message } = body

  if (!name || !whatsapp || !message) {
    return NextResponse.json({ error: 'Required fields are missing.' }, { status: 400 })
  }

  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.RESEND_TO_EMAIL || 'shreelaxmicreation380002@gmail.com',
      subject: `New Enquiry from ${name} — Shree Laxmi Creation`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaec; border-radius: 8px; background-color: #fafafa;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h2 style="color: #1C315E; margin: 0;">New Enquiry Received</h2>
            <p style="color: #666; font-size: 14px; margin-top: 8px;">A new contact form submission from your website.</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 6px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
            <tbody>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 16px; width: 30%; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
                <td style="padding: 16px; font-size: 15px; color: #222; font-weight: 500;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 16px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                <td style="padding: 16px; font-size: 15px; color: #222;">${company || '-'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 16px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Location</td>
                <td style="padding: 16px; font-size: 15px; color: #222;">${location || '-'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 16px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                <td style="padding: 16px; font-size: 15px; color: #222;">
                  ${email ? `<a href="mailto:${email}" style="color: #1C315E; text-decoration: none;">${email}</a>` : '-'}
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f0f0f0;">
                <td style="padding: 16px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px;">WhatsApp</td>
                <td style="padding: 16px; font-size: 15px; color: #1C315E; font-weight: 600;">
                  <a href="https://wa.me/91${whatsapp}" style="color: #1C315E; text-decoration: none;">${whatsapp}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 16px; font-size: 13px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; vertical-align: top;">Requirement</td>
                <td style="padding: 16px; font-size: 15px; color: #333; line-height: 1.6; white-space: pre-wrap;">${message}</td>
              </tr>
            </tbody>
          </table>
          
          <div style="margin-top: 32px; text-align: center; color: #aaa; font-size: 12px;">
            <p>This email was automatically generated from the Shree Laxmi Creation website contact form.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend API error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err) {
    console.error('Resend error:', err)
    return NextResponse.json({ error: 'Failed to send.' }, { status: 500 })
  }
}
