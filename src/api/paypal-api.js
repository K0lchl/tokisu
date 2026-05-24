export const createPayPalOrder = async (items, email) => {
  const response = await fetch('/api/paypal-create-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      email,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create PayPal order');
  }

  return response.json();
};

export const confirmPayPalOrder = async (paypalOrderId, shippingInfo) => {
  const response = await fetch('/api/confirm-paypal-order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      paypalOrderId,
      shippingInfo,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to confirm PayPal order');
  }

  return response.json();
};
