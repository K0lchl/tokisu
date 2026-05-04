import React from 'react';
import { motion } from 'framer-motion';

export default function ARView({ onBack }) {
    return (
        <motion.section
            // 下からふわっと浮き上がるアニメーション
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0a0a0a]" // 没入感を高めるための背景色
        >
            {/* CLOSEボタン（右上） */}
            <button
                onClick={onBack}
                className="absolute top-6 right-6 z-50 text-[10px] tracking-[0.3em] text-white opacity-80 hover:opacity-100 transition-opacity border border-white/20 hover:bg-white/10 rounded-full px-6 py-3"
            >
                BACK TO MAINN
            </button>

            {/* Model Viewer */}
            <div className="flex-1 relative w-full h-full overflow-hidden">
                <model-viewer
                    id="ar-model-viewer"
                    src="/model.glb" // ローカルのモデルファイルを使用
                    ios-src="/model.usdz" // iPhoneで配置するために必要（ファイルがあれば）
                    alt="Tokisu 3D Model"
                    camera-controls
                    auto-rotate
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    ar-scale="fixed" // 1:1の実寸大表示
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
                    <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] text-white/20 text-xs tracking-[0.5em] animate-pulse">
                        CALIBRATING 3D SPACE...
                    </div>

                    <button
                        slot="ar-button"
                        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[9999] bg-white text-black px-12 py-5 rounded-full font-bold tracking-[0.3em] shadow-[0_0_50px_rgba(255,255,255,0.2)] text-[11px] whitespace-nowrap active:scale-95 transition-all hover:bg-opacity-90"
                    >
                        空間に実寸大で配置する
                    </button>
                </model-viewer>

                {/* 操作ガイド */}
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full px-6 text-center pointer-events-none">
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

                {/* 注意書き（提案コードの機能） */}
                <div className="absolute bottom-6 w-full text-center pointer-events-none">
                    <p className="text-[10px] text-white/40 leading-relaxed tracking-widest">
                        ※Android/iPhoneの最新ブラウザで動作します
                    </p>
                </div>
            </div>
        </motion.section>
    );
}
