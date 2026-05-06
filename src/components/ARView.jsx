import React from 'react';
import { motion } from 'framer-motion';

export default function ARView({ onBack }) {
    return (
        <motion.section
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col"
        >
            {/* CLOSEボタン（右上） */}
            <button
                onClick={onBack}
                className="absolute top-6 right-6 z-[60] text-[10px] tracking-[0.3em] text-white opacity-80 hover:opacity-100 transition-opacity border border-white/20 hover:bg-white/10 rounded-full px-6 py-3"
            >
                BACK TO MAIN
            </button>

            {/* Model Viewer Container */}
            <div className="relative w-full h-full">
                <model-viewer
                    id="ar-model-viewer"
                    src="/model.glb"
                    ios-src="/model.usdz"
                    alt="Tokisu 3D Model"
                    camera-controls
                    auto-rotate
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    ar-scale="fixed"
                    ar-placement="floor"
                    environment-image="neutral"
                    exposure="1.2"
                    shadow-intensity="1.5"
                    shadow-softness="0.4"
                    reveal="auto"
                    touch-action="pan-y"
                    style={{ width: '100%', height: '100%', outline: 'none', backgroundColor: 'transparent' }}
                >
                    {/* 読み込み中の表示 */}
                    <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] text-white/20 text-[10px] tracking-[0.5em] animate-pulse uppercase">
                        CALIBRATING 3D SPACE...
                    </div>

                    <button
                        slot="ar-button"
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[55] bg-white text-black px-12 py-5 rounded-full font-bold tracking-[0.3em] shadow-[0_0_50px_rgba(255,255,255,0.2)] text-[11px] whitespace-nowrap active:scale-95 transition-all hover:bg-opacity-90"
                    >
                        空間に実寸大で配置する
                    </button>
                </model-viewer>

                {/* 操作ガイド */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full px-6 text-center pointer-events-none z-[55]">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[10px] text-white/60 tracking-[0.2em] uppercase">
                            Realistic 1:1 Scale Mode
                        </span>
                    </motion.div>
                </div>

                {/* 注意書き */}
                <div className="absolute bottom-6 w-full text-center pointer-events-none z-[55]">
                    <p className="text-[10px] text-white/40 leading-relaxed tracking-widest">
                        ※Android/iPhoneの最新ブラウザで動作します
                    </p>
                </div>
            </div>
        </motion.section>
    );
}
