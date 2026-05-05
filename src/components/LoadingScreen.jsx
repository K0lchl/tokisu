import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // ページの読み込み完了を検知
    const handleLoad = () => {
      // 読み込み完了後、最低1.8秒はロゴを見せる
      setTimeout(() => {
        setIsVisible(false);
      }, 1800);
    };

    if (document.readyState === 'complete') {
      // すでに読み込み済みの場合も最低時間を確保
      setTimeout(() => {
        setIsVisible(false);
      }, 1800);
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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            backgroundColor: '#c8c4bc',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* ロゴテキスト */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            {/* ブランド名 */}
            <span
              style={{
                fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '0.35em',
                color: '#1a1714',
                lineHeight: 1,
                textTransform: 'uppercase',
              }}
            >
              Tokisu
            </span>

            {/* サブタイトル / キャッチフレーズ */}
            <span
              style={{
                fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                fontSize: 'clamp(0.6rem, 2vw, 0.75rem)',
                fontWeight: 400,
                letterSpacing: '0.5em',
                color: '#4a4540',
                textTransform: 'uppercase',
              }}
            >
              Ceramic Art
            </span>
          </motion.div>

          {/* ローディングバー */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: '10%',
              width: '80px',
              height: '1px',
              backgroundColor: '#a09990',
              overflow: 'hidden',
            }}
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#1a1714',
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
