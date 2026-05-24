import { useState } from 'react';

export function useCheckout() {
  const [status, setStatus] = useState('idle'); // idle/loading/success/error
  const [error, setError] = useState('');
  const [orderId, setOrderId] = useState(null);

  const confirmStripePayment = async (intentId, shippingInfo) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intentId,
          shippingInfo,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Payment confirmation failed');
      }

      setOrderId(data.orderId);
      setStatus('success');

      // フロント側からメール送信APIを明示的に叩く（Vercel強制終了対策）
      fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: data.orderId,
          email: data.email,
          shippingInfo: data.shippingInfo,
        }),
      }).catch((err) => console.warn('Email送信失敗:', err));

      return data;
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Payment failed');
      throw err;
    }
  };

  const confirmPayPalPayment = async (paypalOrderId, shippingInfo) => {
    setStatus('loading');
    try {
      const response = await fetch('/api/confirm-paypal-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paypalOrderId,
          shippingInfo,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Payment confirmation failed');
      }

      setOrderId(data.orderId);
      setStatus('success');

      // フロント側からメール送信APIを明示的に叩く（Vercel強制終了対策）
      fetch('/api/send-order-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: data.orderId,
          email: data.email,
          shippingInfo: data.shippingInfo,
        }),
      }).catch((err) => console.warn('Email送信失敗:', err));

      return data;
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Payment failed');
      throw err;
    }
  };

  const reset = () => {
    setStatus('idle');
    setError('');
    setOrderId(null);
  };

  return {
    status,
    error,
    orderId,
    confirmStripePayment,
    confirmPayPalPayment,
    reset,
  };
}
