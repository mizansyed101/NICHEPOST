import { NextResponse } from 'next/server'
import { sendReminderEmail } from '@/lib/resend'

export async function POST(req: Request) {
  try {
    const { email, name, niche, time, posts, streak } = await req.json()

    if (!email || !posts) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const result = await sendReminderEmail({
      email,
      name,
      niche,
      time,
      posts,
      streak,
    })

    return NextResponse.json({ success: true, result })
  } catch (error: any) {
    console.error('API Send Reminder Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
