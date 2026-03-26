import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(req: Request) {
  // Check for Cron Secret header to protect the route (Vercel Cron)
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const now = new Date()
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000)

    // Find posts scheduled for the current hour
    const { data: users, error: userError } = await supabaseAdmin
      .from('user_settings')
      .select('*, user_id')
      .eq('reminders_enabled', true)

    if (userError) throw userError

    const results = []

    for (const user of users) {
      // Logic to check if user has a post due in this hour based on their time_slots and timezone
      // This is a simplified check. In production, you'd use a more robust scheduling logic.
      
      const currentHour = now.getUTCHours() // Or adjust based on user timezone
      if (user.time_slots.includes(currentHour.toString())) {
        // Trigger generation and reminder
        // Note: For a real cron job, you might want to enqueue these tasks to avoid timeouts
        
        // This is where you'd call /api/generate and then /api/send-reminder
        results.push({ userId: user.user_id, status: 'triggered' })
      }
    }

    return NextResponse.json({ success: true, processed: results.length, results })
  } catch (error: any) {
    console.error('Cron Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
