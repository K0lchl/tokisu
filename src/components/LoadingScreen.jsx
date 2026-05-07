import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // 読み込み完了後、漆黒の余韻を楽しむために最低2.5秒は確保
      setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    };

    if (document.readyState === 'complete') {
      setTimeout(() => {
        setIsVisible(false);
      }, 2500);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          {/* 背景の微かなテクスチャ感（ノイズ） */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />

          {/* ロゴコンテナ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              transition: { duration: 2, ease: "easeOut" }
            }}
            className="flex flex-col items-center gap-6 relative"
          >
            {/* ブランド名: 漆黒に浮かぶ光沢感 */}
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0)",
                  "0 0 30px rgba(255,255,255,0.2)",
                  "0 0 20px rgba(255,255,255,0)"
                ]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="font-serif text-[clamp(2.5rem,10vw,5rem)] font-light tracking-[0.4em] text-white uppercase leading-none"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              Tokisu
            </motion.span>

            {/* サブタイトル */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="font-serif text-[clamp(0.6rem,2vw,0.75rem)] tracking-[0.6em] text-white uppercase"
            >
              Ceramic Art
            </motion.span>

            {/* 装飾的な中央の線 */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 40, opacity: 0.2 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-[1px] bg-white mt-4"
            />
          </motion.div>

          {/* 画面下部の進捗表示（よりミニマルに） */}
          <div className="absolute bottom-[15%] flex flex-col items-center gap-4">
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/20 to-transparent" />
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[8px] tracking-[0.5em] text-white/40 uppercase"
            >
              Loading History
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
