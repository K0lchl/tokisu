import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all'); // all / pending / shipped

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query = query.eq('shipping_status', filter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setOrders(data || []);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateShippingStatus = async (orderId, newStatus) => {
    try {
      const { error: updateError } = await supabase
        .from('orders')
        .update({ shipping_status: newStatus, updated_at: new Date() })
        .eq('order_id', orderId);

      if (updateError) throw updateError;

      // UI を更新
      setOrders(orders.map(order =>
        order.order_id === orderId
          ? { ...order, shipping_status: newStatus }
          : order
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-serif tracking-widest mb-2">ORDERS</h1>
          <p className="text-sm text-white/60 tracking-[0.2em]">Order Management</p>
        </motion.div>

        {/* フィルター */}
        <div className="mb-8 flex gap-4">
          {['all', 'pending', 'shipped'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2 text-sm tracking-[0.2em] transition-all ${
                filter === status
                  ? 'bg-white text-black'
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
            >
              {status.toUpperCase()}
            </button>
          ))}
        </div>

        {/* エラー表示 */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 p-4 bg-red-500/20 border border-red-500/50 rounded text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}

        {/* ローディング */}
        {loading ? (
          <div className="text-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full mx-auto"
            />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-white/40">
            <p className="text-sm tracking-[0.2em]">No orders</p>
          </div>
        ) : (
          /* テーブル */
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-4 text-xs tracking-[0.2em] text-white/60">
                    ORDER ID
                  </th>
                  <th className="text-left py-4 px-4 text-xs tracking-[0.2em] text-white/60">
                    EMAIL
                  </th>
                  <th className="text-left py-4 px-4 text-xs tracking-[0.2em] text-white/60">
                    NAME
                  </th>
                  <th className="text-left py-4 px-4 text-xs tracking-[0.2em] text-white/60">
                    AMOUNT
                  </th>
                  <th className="text-left py-4 px-4 text-xs tracking-[0.2em] text-white/60">
                    METHOD
                  </th>
                  <th className="text-left py-4 px-4 text-xs tracking-[0.2em] text-white/60">
                    STATUS
                  </th>
                  <th className="text-left py-4 px-4 text-xs tracking-[0.2em] text-white/60">
                    DATE
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-4 text-sm font-mono text-white/80">
                      {order.order_id}
                    </td>
                    <td className="py-4 px-4 text-sm text-white/70">
                      {order.email}
                    </td>
                    <td className="py-4 px-4 text-sm text-white/70">
                      {order.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-white/80 font-semibold">
                      ¥{order.total_amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <span className={`px-3 py-1 rounded text-xs tracking-wider ${
                        order.payment_method === 'stripe'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {order.payment_method.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-xs">
                      <select
                        value={order.shipping_status}
                        onChange={(e) =>
                          updateShippingStatus(order.order_id, e.target.value)
                        }
                        className={`bg-transparent border border-white/20 px-3 py-1 text-xs rounded cursor-pointer ${
                          order.shipping_status === 'pending'
                            ? 'text-orange-300'
                            : 'text-green-300'
                        }`}
                      >
                        <option value="pending">PENDING</option>
                        <option value="shipped">SHIPPED</option>
                        <option value="delivered">DELIVERED</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-sm text-white/50">
                      {new Date(order.created_at).toLocaleDateString('ja-JP')}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* 詳細情報 */}
        {orders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 p-8 bg-white/5 border border-white/10 rounded-lg"
          >
            <h2 className="text-lg tracking-[0.3em] mb-6">ORDER DETAILS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.slice(0, 1).map((order) => (
                <div key={order.id} className="space-y-4">
                  <div>
                    <p className="text-xs text-white/50 tracking-[0.2em]">SHIPPING ADDRESS</p>
                    <p className="text-sm text-white/80 mt-2">{order.address}</p>
                    <p className="text-xs text-white/60 mt-1">{order.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/50 tracking-[0.2em]">PAYMENT STATUS</p>
                    <p className="text-sm text-white/80 mt-2">
                      {order.payment_status === 'completed' ? '✓ Completed' : 'Pending'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
