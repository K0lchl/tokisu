import React, { useState, Suspense, lazy, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import MainScene from './components/MainScene';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import AudioToggle from './components/AudioToggle';
import { useSound } from './hooks/useSound';

const StoryPage = lazy(() => import('./components/StoryPage'));
const ARView = lazy(() => import('./components/ARView'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const ShopPage = lazy(() => import('./components/ShopPage'));

export default function App() {
  const [activePage, setActivePage] = useState('main');
  const [loadingDone, setLoadingDone] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // 環境音の定義
  const kilnSound = useSound('/kiln_ambient.mp3', { loop: true, maxVolume: 0.5 });
  // 海の音（波の音）を背景レイヤーとして定義
  const oceanSound = useSound('https://freesound.org/data/previews/400/400632_5121236-lq.mp3', { loop: true, maxVolume: 0.6 });

  const handleEnter = useCallback(() => {
    setLoadingDone(true);
    setHasInteracted(true);
    kilnSound.play();
    oceanSound.play();
  }, [kilnSound, oceanSound]);

  const toggleGlobalMute = () => {
    if (kilnSound.isPlaying) {
      kilnSound.stop();
      oceanSound.stop();
    } else {
      kilnSound.play();
      oceanSound.play();
    }
  };

  // ページに応じて音のバランスを変える (ダイナミック・ミキシング)
  useEffect(() => {
    if (!hasInteracted || !kilnSound.isPlaying) return;

    if (activePage === 'story') {
      // ストーリーページ：完全に海の音のみにする
      kilnSound.fadeTo(0.0, 2000);
      oceanSound.fadeTo(0.4, 2000); // 海の音を少し控えめに
    } else if (activePage === 'main') {
      // メインシーン：完全に窯の音のみにする（窯の音を大きく）
      kilnSound.fadeTo(1.0, 2000);
      oceanSound.fadeTo(0.0, 2000);
    } else {
      // その他のページ（Contact, Shop等）は静寂を重視
      kilnSound.fadeTo(0.0, 2000);
      oceanSound.fadeTo(0.0, 2000);
    }
  }, [activePage, hasInteracted, kilnSound.isPlaying]);

  return (
    <ErrorBoundary>
      <div className="relative w-full h-screen overflow-hidden bg-black text-white font-sans selection:bg-white/30">

        <LoadingScreen onComplete={handleEnter} />

        {/* トップ右: SHOP リンク */}
        {loadingDone && activePage === 'main' && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            onClick={() => setActivePage('shop')}
            className="absolute top-8 right-8 md:top-12 md:right-12 z-[110] group overflow-hidden pointer-events-auto"
          >
            <div className="flex flex-col items-end">
              <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 group-hover:text-white transition-colors duration-500">
                Shop
              </span>
              <motion.div 
                className="h-[1px] bg-white w-0 group-hover:w-full transition-all duration-500 mt-1"
              />
            </div>
          </motion.button>
        )}

        {/* 背景動画 */}
        <video
          key={activePage}
          className={`absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
            activePage === 'main' ? 'opacity-40' : 'opacity-10'
          }`}
          autoPlay loop muted playsInline
        >
          <source src="/suzu_process_mobile.mp4" media="(max-width: 768px)" />
          <source src="/suzu_process.mp4" />
        </video>

        {/* MainScene */}
        <div className={`absolute inset-0 z-10 ${activePage === 'main' ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          <MainScene />
        </div>

        {/* トランジションオーバーレイ */}
        <div
          className={`absolute inset-0 pointer-events-none z-20 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            activePage === 'main' ? 'bg-transparent backdrop-blur-[1px]' : 'bg-black/80 backdrop-blur-3xl'
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
              transition={{ duration: 0.8 }}
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
                {activePage === 'shop' && <ShopPage onBack={() => setActivePage('main')} />}
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>

        {/* サウンドコントロール（スマホでの被りを防ぐため左上に配置） */}
        {loadingDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute top-8 left-8 md:top-12 md:left-12 z-[110]"
          >
            <AudioToggle 
              isPlaying={kilnSound.isPlaying} 
              toggle={toggleGlobalMute} 
            />
          </motion.div>
        )}

      </div>
    </ErrorBoundary>
  );
}