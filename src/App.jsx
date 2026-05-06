import React, { useState, Suspense, lazy, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainScene from './components/MainScene';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';

const StoryPage = lazy(() => import('./components/StoryPage'));
const ARView = lazy(() => import('./components/ARView'));
const ContactPage = lazy(() => import('./components/ContactPage'));

export default function App() {
  const [activePage, setActivePage] = useState('main');
  const [loadingDone, setLoadingDone] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.8; // 音量を引き上げ
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
      } else {
        audioRef.current.pause();
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <ErrorBoundary>
      <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-white/30">

        {/* ローディングスクリーン: ロゴを見せてからメインコンテンツへ */}
        <LoadingScreen onComplete={() => setLoadingDone(true)} />

        {/* 背景動画: 常に一番奥 */}
        <video
          key={activePage} /* ページ遷移時の不透明度リセットを確実にするため */
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${activePage === 'main' ? 'opacity-60' : 'opacity-20'
            }`}
          autoPlay loop muted playsInline
        >
          <source src="/suzu_process_mobile.mp4" media="(max-width: 768px)" />
          <source src="/suzu_process.mp4" />
        </video>

        {/* 環境音: 窯焚きの音 */}
        <audio ref={audioRef} src="/kiln_ambient.mp3" loop />

        {/* MainScene: 常時表示。activePage によって pointer-events を切り替える */}
        <div className={`absolute inset-0 z-10 ${activePage === 'main' ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <MainScene />
        </div>

        {/* 背景のぼかし＆暗転のトランジションオーバーレイ */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activePage === 'main' ? 'bg-transparent backdrop-blur-[1px]' : 'bg-black/70 backdrop-blur-2xl'
            }`}
        />

        {/* コンテンツレイヤー */}
        <AnimatePresence mode="wait">
          {activePage === 'main' ? (
            <motion.div
              key="main-ui"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-[100] pointer-events-none"
            >
              <div className="w-full h-full pointer-events-auto">
                <Navigation onNavigate={setActivePage} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sub-page"
              className="absolute inset-0 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center bg-black z-[100]">
                  <span className="text-[10px] tracking-[0.5em] text-white/20 animate-pulse uppercase">Loading Experience...</span>
                </div>
              }>
                {activePage === 'story' && <StoryPage onBack={() => setActivePage('main')} />}
                {activePage === 'ar' && <ARView onBack={() => setActivePage('main')} />}
                {activePage === 'contact' && <ContactPage onBack={() => setActivePage('main')} />}
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* サウンドコントロール: 右下に配置 */}
        {loadingDone && activePage === 'main' && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={toggleMute}
            className="absolute bottom-8 right-8 z-[110] flex items-center gap-3 group"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] tracking-[0.2em] uppercase opacity-40 group-hover:opacity-100 transition-opacity">
                {isMuted ? 'Sound Off' : 'Sound On'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-sm group-hover:border-white/60 transition-colors">
              {isMuted ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM23 9l-6 6M17 9l6 6" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5zM19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </div>
          </motion.button>
        )}

      </div>
    </ErrorBoundary>
  );
}