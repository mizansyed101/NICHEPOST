import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendReminderParams {
  email: string
  name?: string
  niche: string
  time: string
  posts: Record<string, string>
  streak: number
}

export const sendReminderEmail = async ({
  email,
  name = 'there',
  niche,
  time,
  posts,
  streak,
}: SendReminderParams) => {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0a0a0f; color: #ffffff;">
      <h2 style="color: #8b5cf6;">⏰ Time to post! Your ${niche} content is ready</h2>
      <p>Hey ${name},</p>
      <p>It's time for your ${time} post! Here's your AI-generated content:</p>
      
      ${Object.entries(posts).map(([platform, content]) => `
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 8px;">
          <h3 style="text-transform: uppercase; font-size: 14px; margin-top: 0; color: #53ddfc;">${platform}</h3>
          <p style="white-space: pre-wrap;">${content}</p>
        </div>
      `).join('')}

      <div style="text-align: center; margin-top: 30px;">
        <a href="${dashboardUrl}" style="background: linear-gradient(135deg, #8b5cf6, #53ddfc); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
          OPEN DASHBOARD & POST TO ALL
        </a>
      </div>

      <p style="text-align: center; margin-top: 20px; color: #acaab1;">
        You're on a ${streak}-day streak! Keep it up 🔥
      </p>
    </div>
  `

  return resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
    to: email,
    subject: `⏰ Time to post! Your ${niche} content is ready`,
    html: html,
  })
}
