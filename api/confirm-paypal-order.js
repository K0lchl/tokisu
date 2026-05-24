import { createClient } from '@supabase/supabase-js';

// PayPal API の base URL
const PAYPAL_API_URL = process.env.PAYPAL_MODE === 'live'
  ? 'https://api.paypal.com'
  : 'https://api.sandbox.paypal.com';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getPayPalAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch(`${PAYPAL_API_URL}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error('Failed to get PayPal access token');
  }

  const data = await response.json();
  return data.access_token;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { paypalOrderId, shippingInfo } = req.body;

  if (!paypalOrderId || !shippingInfo) {
    return res.status(400).json({ error: 'PayPal order ID and shipping info are required' });
  }

  try {
    // PayPal アクセストークンを取得
    const accessToken = await getPayPalAccessToken();

    // PayPal Order を Capture
    const captureResponse = await fetch(
      `${PAYPAL_API_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!captureResponse.ok) {
      throw new Error('Failed to capture PayPal order');
    }

    const captureData = await captureResponse.json();

    if (captureData.status !== 'COMPLETED') {
      throw new Error(`PayPal order status: ${captureData.status}`);
    }

    // 注文IDを生成
    const orderId = `TOKISU-${Date.now()}`;

    // Supabase に注文データを保存
    const { data, error } = await supabase.from('orders').insert([
      {
        order_id: orderId,
        email: captureData.payer?.email_address,
        name: shippingInfo.name,
        address: shippingInfo.address,
        phone: shippingInfo.phone,
        items: {} || {},
        total_amount: captureData.purchase_units?.[0]?.amount?.value || 0,
        payment_method: 'paypal',
        payment_status: 'completed',
        shipping_status: 'pending',
      },
    ]);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }

    console.log('PayPal Order Captured:', {
      orderId,
      paypalOrderId: captureData.id,
      email: captureData.payer?.email_address,
      shippingInfo,
      timestamp: new Date().toISOString(),
    });

    // 素早くレスポンスを返す（メール送信は別でフロント側から叩く）
    return res.status(200).json({
      success: true,
      orderId,
      paypalOrderId: captureData.id,
      email: captureData.payer?.email_address,
      shippingInfo,
      message: 'PayPal order captured successfully',
    });
  } catch (error) {
    console.error('PayPal Capture Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
