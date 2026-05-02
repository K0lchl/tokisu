import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    // 顧客リストに追加（Audience IDはResendの管理画面で作成したものを使います）
    // 今回はテストとして直接メールを飛ばすか、Audienceに追加する設定にします
    const { data, error } = await resend.contacts.create({
      email: email,
      firstName: '',
      lastName: '',
      unsubscribed: false,
      audienceId: process.env.RESEND_AUDIENCE_ID, // 後で設定
    });

    if (error) {
      return res.status(400).json({ error });
    }

    return res.status(200).json({ message: 'Success', data });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
