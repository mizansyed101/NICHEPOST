import { NextResponse } from 'next/server'
import { cashfree } from '@/lib/cashfree'

const PLAN_PRICES: Record<string, number> = {
  FREE: 0,
  PRO: 199,
  ELITE: 499,
}

const PLAN_CREDITS: Record<string, number> = {
  FREE: 5,
  PRO: 500,
  ELITE: 2000,
}

export async function POST(req: Request) {
  try {
    const { plan, userId, email } = await req.json()
    
    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    // Skip payment for Free plan
    if (plan === 'FREE') {
      return NextResponse.json({ success: true, plan: 'FREE', credits: PLAN_CREDITS.FREE })
    }

    const orderId = `order_${Date.now()}_${userId?.slice(0, 5) || 'anon'}`

    const order = await cashfree.createOrder({
      order_id: orderId,
      order_amount: PLAN_PRICES[plan],
      order_currency: 'INR',
      customer_details: {
        customer_id: userId || 'anonymous_user',
        customer_email: email || 'customer@example.com',
        customer_phone: '9999999999',
      },
      order_note: `Subscription for ${plan} plan`
    })

    return NextResponse.json({ 
      success: true,
      payment_session_id: order.payment_session_id,
      order_id: order.order_id
    })
  } catch (error: any) {
    console.error('Cashfree Order Error:', error)
    return NextResponse.json({ error: error.message || 'Failed to create payment session' }, { status: 500 })
  }
}
