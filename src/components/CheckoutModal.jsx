import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CheckoutModal({ isOpen, onClose, onSuccess }) {
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1=配送情報, 2=決済方法, 3=処理中
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });
  const [status, setStatus] = useState('idle'); // idle/loading/success/error
  const [error, setError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null); // 'stripe' or 'paypal'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    return (
      shippingInfo.name &&
      shippingInfo.email &&
      shippingInfo.address &&
      shippingInfo.phone
    );
  };

  const handleStripePayment = async () => {
    setStatus('loading');
    try {
      // フロントから items のみ送信（セキュリティ対策）
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          email: shippingInfo.email,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Payment failed');
      }

      // TODO: Stripe Elements を使用して、ここで実際の決済処理を実行
      // このステップではモック処理を行います
      console.log('Stripe Payment Intent Created:', data);

      // 決済成功時
      setStatus('success');
      setTimeout(() => {
        clearCart();
        onSuccess?.({
          orderId: data.clientSecret,
          email: shippingInfo.email,
          shippingInfo,
        });
        onClose();
      }, 1500);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Payment failed');
    }
  };

  const handlePayPalPayment = async () => {
    setStatus('loading');
    try {
      // フロントから items のみ送信（セキュリティ対策）
      const response = await fetch('/api/paypal-create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
          email: shippingInfo.email,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Payment failed');
      }

      // TODO: PayPal SDK を使用して、ここで実際の決済処理を実行
      console.log('PayPal Order Created:', data);

      // 決済成功時
      setStatus('success');
      setTimeout(() => {
        clearCart();
        onSuccess?.({
          orderId: data.orderId,
          email: shippingInfo.email,
          shippingInfo,
        });
        onClose();
      }, 1500);
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Payment failed');
    }
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod === 'stripe') {
      handleStripePayment();
    } else if (paymentMethod === 'paypal') {
      handlePayPalPayment();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={() => status === 'idle' && onClose()}
            className="fixed inset-0 bg-black z-[130]"
          />

          {/* チェックアウトモーダル */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[140] flex items-center justify-center p-6"
          >
            <div className="w-full max-w-2xl max-h-[90vh] bg-black/95 backdrop-blur-xl border border-white/10 rounded-lg overflow-y-auto">
              {/* ヘッダー */}
              <div className="sticky top-0 border-b border-white/10 p-8 bg-black/95 flex justify-between items-center">
                <h2 className="text-lg tracking-[0.3em] font-serif">CHECKOUT</h2>
                {status === 'idle' && (
                  <button
                    onClick={onClose}
                    className="text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100"
                  >
                    CLOSE
                  </button>
                )}
              </div>

              {/* コンテンツ */}
              <div className="p-8">
                {/* Step 1: 配送情報 */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-sm tracking-[0.2em] mb-6 text-white/70">SHIPPING INFORMATION</h3>
                    <div className="space-y-4 mb-8">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={shippingInfo.name}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={shippingInfo.email}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={shippingInfo.address}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        value={shippingInfo.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                      />
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      disabled={!isFormValid()}
                      className="w-full bg-white text-black py-3 text-[10px] tracking-[0.2em] font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-white/90"
                    >
                      CONTINUE TO PAYMENT
                    </button>
                  </motion.div>
                )}

                {/* Step 2: 決済方法選択 */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <h3 className="text-sm tracking-[0.2em] mb-6 text-white/70">SELECT PAYMENT METHOD</h3>

                    <div className="space-y-4 mb-8">
                      <button
                        onClick={() => setPaymentMethod('stripe')}
                        className={`w-full p-6 border-2 rounded transition-all ${
                          paymentMethod === 'stripe'
                            ? 'border-white bg-white/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                              paymentMethod === 'stripe'
                                ? 'border-white'
                                : 'border-white/40'
                            }`}
                          >
                            {paymentMethod === 'stripe' && (
                              <div className="w-3 h-3 bg-white rounded-full" />
                            )}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold">Stripe</p>
                            <p className="text-xs text-white/60">Credit Card</p>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('paypal')}
                        className={`w-full p-6 border-2 rounded transition-all ${
                          paymentMethod === 'paypal'
                            ? 'border-white bg-white/10'
                            : 'border-white/20 hover:border-white/40'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
                              paymentMethod === 'paypal'
                                ? 'border-white'
                                : 'border-white/40'
                            }`}
                          >
                            {paymentMethod === 'paypal' && (
                              <div className="w-3 h-3 bg-white rounded-full" />
                            )}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-semibold">PayPal</p>
                            <p className="text-xs text-white/60">Secure Payment</p>
                          </div>
                        </div>
                      </button>
                    </div>

                    {/* 注文確認 */}
                    <div className="mb-8 p-6 bg-white/5 rounded">
                      <div className="flex justify-between mb-4">
                        <span className="text-xs tracking-[0.2em] text-white/70">TOTAL</span>
                        <span className="text-lg font-serif tracking-widest">¥{total.toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 border border-white/20 py-3 text-[10px] tracking-[0.2em] hover:border-white/50"
                      >
                        BACK
                      </button>
                      <button
                        onClick={handlePaymentSubmit}
                        disabled={!paymentMethod}
                        className="flex-1 bg-white text-black py-3 text-[10px] tracking-[0.2em] font-semibold disabled:opacity-50"
                      >
                        CONFIRM PAYMENT
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: 処理中 / 完了 / エラー */}
                {(status === 'loading' || status === 'success' || status === 'error') && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    {status === 'loading' && (
                      <div className="space-y-4">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-12 h-12 border-2 border-white/30 border-t-white rounded-full mx-auto"
                        />
                        <p className="text-sm tracking-[0.2em] text-white/60">Processing Payment...</p>
                      </div>
                    )}

                    {status === 'success' && (
                      <div className="space-y-4">
                        <div className="text-4xl">✓</div>
                        <h3 className="text-lg tracking-[0.2em]">Payment Successful</h3>
                        <p className="text-xs tracking-[0.2em] text-white/60">
                          Order confirmation has been sent to your email
                        </p>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="space-y-4">
                        <p className="text-sm text-red-400/80">{error}</p>
                        <button
                          onClick={() => {
                            setStatus('idle');
                            setStep(2);
                          }}
                          className="px-6 py-2 border border-white/30 text-xs tracking-[0.2em] hover:border-white/50"
                        >
                          TRY AGAIN
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
