import { NextResponse } from 'next/server'
import { razorpay, PLAN_PRICES } from '@/lib/razorpay'

export async function POST(req: Request) {
  try {
    const { plan } = await req.json()
    
    if (!plan || !PLAN_PRICES[plan]) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const options = {
      amount: PLAN_PRICES[plan],
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    }

    const order = await razorpay.orders.create(options)
    
    return NextResponse.json({ 
      success: true, 
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    })
  } catch (error: any) {
    console.error('Razorpay Order Error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
