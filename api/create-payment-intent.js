import Stripe from 'stripe';
import { getProductsByArtisan } from '../src/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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
    items.forEach((item) => {
      const product = productMap[item.productId];
      if (!product) {
        throw new Error(`Product ${item.productId} not found`);
      }
      totalAmount += product.price * item.quantity;
    });

    // Stripe Payment Intent を作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // 金額（セント単位）
      currency: 'jpy',
      receipt_email: email,
      metadata: {
        orderId: `tokisu-${Date.now()}`,
        itemCount: items.length,
      },
    });

    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      intentId: paymentIntent.id,
      amount: totalAmount,
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
}
