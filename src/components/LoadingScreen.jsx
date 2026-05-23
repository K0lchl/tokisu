import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const handleLoad = () => setIsLoaded(true);

    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  const handleStart = () => {
    setIsEntering(true);
    // 漆黒の余韻
    setTimeout(() => {
      setIsVisible(false);
    }, 1200);
  };

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 2, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')]" />

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ 
              opacity: isEntering ? 0 : 1, 
              scale: isEntering ? 1.05 : 1,
              transition: { duration: 1, ease: "easeInOut" }
            }}
            className="flex flex-col items-center gap-6 relative"
          >
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

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="font-serif text-[clamp(0.6rem,2vw,0.75rem)] tracking-[0.6em] text-white uppercase"
            >
              Ceramic Art
            </motion.span>

            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 40, opacity: 0.2 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="h-[1px] bg-white mt-4"
            />
          </motion.div>

          {/* 読み込み完了後のアクションボタン */}
          <div className="absolute bottom-[20%] h-20 flex items-center justify-center">
            <AnimatePresence>
              {isLoaded && !isEntering && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={handleStart}
                  className="group flex flex-col items-center gap-3 focus:outline-none"
                >
                  <motion.span
                    className="text-[11px] tracking-[0.3em] text-white/70 group-hover:text-white transition-colors uppercase font-light"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    Enter
                  </motion.span>
                  <motion.div
                    className="flex flex-col items-center gap-1"
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <div className="w-[1px] h-6 bg-white/40 group-hover:bg-white transition-all duration-700" />
                    <svg
                      className="w-3 h-3 text-white/40 group-hover:text-white transition-colors duration-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {!isLoaded && (
            <div className="absolute bottom-[15%] flex flex-col items-center gap-4">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-[8px] tracking-[0.5em] text-white/40 uppercase"
              >
                Loading History
              </motion.span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

