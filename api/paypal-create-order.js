import { getProductsByArtisan } from '../src/data/products';

// PayPal API の base URL
const PAYPAL_API_URL = process.env.PAYPAL_MODE === 'live'
  ? 'https://api.paypal.com'
  : 'https://api.sandbox.paypal.com';

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

  const { items, email } = req.body;

  if (!items || !email) {
    return res.status(400).json({ error: 'Items and email are required' });
  }

  try {
    // サーバー側で商品情報を取得して、金額を再計算
    const allProducts = getProductsByArtisan();
    const productMap = {};

    allProducts.forEach((group) => {
      group.items.forEach((product) => {
        productMap[product.id] = product;
      });
    });

    // 合計金額を計算
    let totalAmount = 0;
    const itemLines = items.map((item) => {
      const product = productMap[item.productId];
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      const itemAmount = product.price * item.quantity;
      totalAmount += itemAmount;

      return {
        name: product.name,
        unit_amount: {
          currency_code: 'JPY',
          value: product.price.toString(),
        },
        quantity: item.quantity.toString(),
      };
    });

    // PayPal アクセストークンを取得
    const accessToken = await getPayPalAccessToken();

    // PayPal Order を作成
    const orderResponse = await fetch(`${PAYPAL_API_URL}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'JPY',
              value: totalAmount.toString(),
              breakdown: {
                item_total: {
                  currency_code: 'JPY',
                  value: totalAmount.toString(),
                },
              },
            },
            items: itemLines,
            shipping: {
              address: {
                country_code: 'JP',
              },
            },
          },
        ],
        payer: {
          email_address: email,
        },
        return_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/shop`,
        cancel_url: `${process.env.VERCEL_URL || 'http://localhost:3000'}/shop`,
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Failed to create PayPal order');
    }

    const orderData = await orderResponse.json();

    return res.status(200).json({
      success: true,
      orderId: orderData.id,
      status: orderData.status,
      amount: totalAmount,
    });
  } catch (error) {
    console.error('PayPal Order Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
