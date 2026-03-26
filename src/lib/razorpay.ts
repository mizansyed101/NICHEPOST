import Razorpay from 'razorpay'

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

export const PLAN_LIMITS = {
  FREE: 5,
  PRO: 500,
  ELITE: 2000,
}

export const PLAN_PRICES = {
  PRO: 19900, // INR 199 (in paise)
  ELITE: 49900, // INR 499 (in paise)
}
