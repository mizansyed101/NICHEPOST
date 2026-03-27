import axios from 'axios';

const CASHFREE_APP_ID = process.env.CASHFREE_APP_ID;
const CASHFREE_SECRET_KEY = process.env.CASHFREE_SECRET_KEY;
const CASHFREE_ENV = process.env.CASHFREE_ENV || 'TEST'; // TEST or PRODUCTION

const BASE_URL = CASHFREE_ENV === 'PRODUCTION' 
  ? 'https://api.cashfree.com/pg' 
  : 'https://sandbox.cashfree.com/pg';

export const cashfree = {
  createOrder: async (data: {
    order_id: string;
    order_amount: number;
    order_currency: string;
    customer_details: {
      customer_id: string;
      customer_email: string;
      customer_phone: string;
    };
    order_note?: string;
  }) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders`, {
        order_id: data.order_id,
        order_amount: data.order_amount,
        order_currency: data.order_currency,
        customer_details: data.customer_details,
        order_note: data.order_note,
        order_meta: {
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/callback?order_id={order_id}`
        }
      }, {
        headers: {
          'x-client-id': CASHFREE_APP_ID,
          'x-client-secret': CASHFREE_SECRET_KEY,
          'x-api-version': '2023-08-01',
          'Content-Type': 'application/json'
        }
      });

      return response.data;
    } catch (error: any) {
      console.error('Cashfree Order Creation Error:', error.response?.data || error.message);
      throw error;
    }
  }
};
