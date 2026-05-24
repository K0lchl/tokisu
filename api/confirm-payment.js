import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

    // ここで注文データをDBに保存するか、ログに記録することができます
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
