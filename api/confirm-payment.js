import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { intentId, shippingInfo } = req.body;

  if (!intentId || !shippingInfo) {
    return res.status(400).json({ error: 'Intent ID and shipping info are required' });
  }

  try {
    // Payment Intent を確認
    const paymentIntent = await stripe.paymentIntents.retrieve(intentId);

    if (paymentIntent.status !== 'succeeded' && paymentIntent.status !== 'requires_action') {
      throw new Error('Payment Intent not in valid state');
    }

    // 注文IDを生成
    const orderId = `TOKISU-${Date.now()}`;

    // Supabase に注文データを保存
    const { data, error } = await supabase.from('orders').insert([
      {
        order_id: orderId,
        email: paymentIntent.receipt_email,
        name: shippingInfo.name,
        address: shippingInfo.address,
        phone: shippingInfo.phone,
        items: paymentIntent.metadata || {},
        total_amount: paymentIntent.amount / 100,
        payment_method: 'stripe',
        payment_status: 'completed',
        shipping_status: 'pending',
      },
    ]);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log('Order created:', {
      orderId,
      intentId,
      amount: paymentIntent.amount / 100,
      email: paymentIntent.receipt_email,
      shippingInfo,
      timestamp: new Date().toISOString(),
    });

    // 素早くレスポンスを返す（メール送信は別でフロント側から叩く）
    return res.status(200).json({
      success: true,
      orderId,
      intentId,
      email: paymentIntent.receipt_email,
      shippingInfo,
      message: 'Payment confirmed successfully',
    });
  } catch (error) {
    console.error('Payment Confirmation Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
