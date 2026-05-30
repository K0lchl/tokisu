import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function CartDrawer({ isOpen, onClose, onCheckout }) {
  const { items, total, removeItem, updateQuantity } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[110]"
          />

          {/* ドロワー */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4 }}
            className="fixed right-0 top-0 h-screen w-[420px] bg-black/95 backdrop-blur-xl z-[120] flex flex-col border-l border-white/10"
          >
            {/* ヘッダー */}
            <div className="border-b border-white/10 p-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg tracking-[0.3em] font-serif">CART</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity"
                >
                  CLOSE
                </button>
              </div>
            </div>

            {/* 商品リスト */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center px-8 text-center">
                  <p className="text-sm text-white/40 italic font-serif tracking-wide">
                    新しい作品との出会いを<br />お待ちしています
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {items.map((item) => (
                    <div
                      key={item.productId}
                      className="p-6 border-b border-white/10"
                    >
                      {/* 商品画像 */}
                      <div className="mb-4 h-32 overflow-hidden bg-white/5 rounded">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300/111111/333333?text=NO+IMAGE';
                          }}
                        />
                      </div>

                      {/* 商品情報 */}
                      <h3 className="text-xs font-serif tracking-widest mb-1">
                        {item.product.name}
                      </h3>
                      <p className="text-[9px] text-white/50 tracking-[0.2em] mb-3">
                        {item.product.kiln}
                      </p>

                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs text-white/70 tracking-wider">
                          ¥{item.product.price.toLocaleString()}
                        </span>
                      </div>

                      {/* 数量調整 */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center border border-white/20 rounded-full">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            className="px-3 py-1 text-xs hover:bg-white/10"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-xs text-white/70 w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, Math.min(item.quantity + 1, item.product.stock))
                            }
                            disabled={item.quantity >= item.product.stock}
                            className={`px-3 py-1 text-xs ${
                              item.quantity >= item.product.stock 
                                ? 'opacity-30 cursor-not-allowed' 
                                : 'hover:bg-white/10'
                            }`}
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.productId)}
                          className="text-[9px] tracking-[0.2em] text-white/40 hover:text-white transition-colors"
                        >
                          REMOVE
                        </button>
                      </div>

                      <div className="text-right text-xs text-white/60 tracking-wider">
                        Subtotal: ¥{(item.product.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* フッター */}
            {items.length > 0 && (
              <div className="border-t border-white/10 p-8 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] tracking-[0.2em] text-white/50">TOTAL</span>
                  <span className="text-2xl font-serif tracking-widest">
                    ¥{total.toLocaleString()}
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full bg-white text-black py-4 text-[10px] tracking-[0.3em] font-semibold hover:bg-white/90 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
