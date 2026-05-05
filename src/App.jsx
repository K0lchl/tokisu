import React, { useState, Suspense, lazy } from 'react';
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

  return (
    <ErrorBoundary>
      <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-white/30">

        {/* ローディングスクリーン: ロゴを見せてからメインコンテンツへ */}
        <LoadingScreen onComplete={() => setLoadingDone(true)} />

        {/* 背景動画: 常に一番奥 */}
        <video
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${activePage === 'main' ? 'opacity-60' : 'opacity-20'
            }`}
          autoPlay loop muted playsInline
          src="/suzu_process.mp4"
        />

        {/* MainScene: 常時表示。activePage によって pointer-events を切り替える */}
        <div className={`absolute inset-0 z-10 ${activePage === 'main' ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <MainScene />
        </div>

        {/* 背景のぼかし＆暗転のトランジションオーバーレイ */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${activePage === 'main' ? 'bg-transparent backdrop-blur-[1px]' : 'bg-black/70 backdrop-blur-2xl'
            }`}
        />

        {/* ナビゲーション (MainSceneのUI) - z-indexを上げて確実にクリック可能にする */}
        <AnimatePresence>
          {activePage === 'main' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-[100] pointer-events-none" // コンテナ自体はスルー
            >
              <div className="w-full h-full pointer-events-auto"> {/* 中身だけクリック有効 */}
                <Navigation onNavigate={setActivePage} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* サブページ群（下からフワッと） */}
        <div className="absolute inset-0 z-40">
          <Suspense fallback={null}>
            <AnimatePresence mode="wait">
              {activePage === 'story' && <StoryPage key="story" onBack={() => setActivePage('main')} />}
              {activePage === 'ar' && <ARView key="ar" onBack={() => setActivePage('main')} />}
              {activePage === 'contact' && <ContactPage key="contact" onBack={() => setActivePage('main')} />}
            </AnimatePresence>
          </Suspense>
        </div>

      </div>
    </ErrorBoundary>
  );
}