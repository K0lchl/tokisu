import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { orderId, email, shippingInfo } = req.body;

  if (!orderId || !email) {
    return res.status(400).json({ error: 'Order ID and email are required' });
  }

  try {
    // 購入確認メールを送信
    const { data, error } = await resend.emails.send({
      from: 'Tokisu <noreply@tokisu.jp>',
      to: email,
      subject: 'Your Tokisu Order Confirmation',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: serif; background-color: #0a0a0a; color: white; }
              .container { max-width: 600px; margin: 40px auto; padding: 20px; }
              .header { text-align: center; margin-bottom: 30px; }
              .header h1 { font-size: 2em; letter-spacing: 0.3em; margin: 0; }
              .content { border: 1px solid rgba(255,255,255,0.1); padding: 30px; margin: 20px 0; }
              .order-info { background-color: rgba(255,255,255,0.05); padding: 20px; border-radius: 4px; }
              .info-row { display: flex; justify-content: space-between; margin: 10px 0; font-size: 0.9em; }
              .footer { text-align: center; margin-top: 30px; font-size: 0.8em; color: rgba(255,255,255,0.6); }
              a { color: white; text-decoration: none; border-bottom: 1px solid white; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>TOKISU</h1>
                <p style="font-size: 0.8em; letter-spacing: 0.4em; color: rgba(255,255,255,0.6);">CERAMIC ART</p>
              </div>

              <div class="content">
                <h2 style="font-size: 1.2em; margin-top: 0;">Order Confirmation</h2>
                <p>Thank you for your purchase. We are delighted to have you join our community of ceramic art enthusiasts.</p>

                <div class="order-info">
                  <div class="info-row">
                    <span>Order ID:</span>
                    <strong>${orderId}</strong>
                  </div>
                  <div class="info-row">
                    <span>Order Date:</span>
                    <strong>${new Date().toLocaleDateString('en-US')}</strong>
                  </div>
                  ${shippingInfo?.name ? `<div class="info-row">
                    <span>Recipient:</span>
                    <strong>${shippingInfo.name}</strong>
                  </div>` : ''}
                  ${shippingInfo?.address ? `<div class="info-row">
                    <span>Shipping Address:</span>
                    <strong>${shippingInfo.address}</strong>
                  </div>` : ''}
                </div>

                <p style="margin-top: 20px; line-height: 1.8;">
                  Your order will be carefully prepared and shipped to you shortly.
                  We take pride in ensuring each piece arrives in perfect condition.
                </p>

                <p style="margin-top: 20px;">
                  If you have any questions about your order, please don't hesitate to contact us.
                </p>
              </div>

              <div class="footer">
                <p>© 2026 Tokisu Ceramic Art. All rights reserved.</p>
                <p><a href="https://tokisu.jp">Visit our website</a></p>
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend Error:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('Order confirmation email sent:', {
      orderId,
      email,
      emailId: data?.id,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'Order confirmation email sent',
      emailId: data?.id,
    });
  } catch (error) {
    console.error('Send Email Error:', error);
    // メール送信失敗はサイレント処理（ユーザーに見せない）
    return res.status(200).json({
      success: true,
      message: 'Order processed (email delivery attempted)',
    });
  }
}
