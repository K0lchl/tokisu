import React from 'react';
import { motion } from 'framer-motion';

export default function ShopPage({ onBack }) {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-black/40 backdrop-blur-3xl overflow-hidden p-6 text-white">
            
            {/* 装飾的な背景要素 */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute inset-0 pointer-events-none"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px]" />
            </motion.div>

            {/* メインコンテンツ */}
            <div className="relative z-10 flex flex-col items-center max-w-2xl text-center">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                >
                    <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-8 block">Online Store</span>
                    <h2 className="text-4xl md:text-6xl font-light tracking-[0.2em] mb-12">
                        COMING <br /> SOON
                    </h2>
                    
                    <p className="text-[12px] md:text-[14px] leading-relaxed text-white/60 tracking-[0.1em] mb-12 max-w-md mx-auto">
                        珠洲焼の新たな表現、Tokisuのプロダクトライン。
                        現在、窯元とともに一品一品を丁寧に準備しております。
                        公開まで今しばらくお待ちください。
                    </p>
                </motion.div>

                {/* 戻るボタン */}
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={onBack}
                    className="group flex flex-col items-center gap-4 cursor-pointer"
                >
                    <div className="w-[1px] h-20 bg-gradient-to-b from-white/40 to-transparent group-hover:h-24 transition-all duration-700" />
                    <span className="text-[10px] tracking-[0.4em] uppercase text-white/60 group-hover:text-white transition-colors">
                        Close
                    </span>
                </motion.button>
            </div>

            {/* コーナースタンプ的な装飾 */}
            <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-20">
                <div className="w-10 h-[1px] bg-white" />
                <span className="text-[8px] tracking-widest uppercase">Limited Edition</span>
            </div>
        </div>
    );
}
