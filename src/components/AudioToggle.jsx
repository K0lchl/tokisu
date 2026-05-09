import React from 'react';
import { motion } from 'framer-motion';

export default function AudioToggle({ isPlaying, toggle, color = "white" }) {
    return (
        <button
            onClick={toggle}
            className="flex items-center gap-4 group pointer-events-auto"
            aria-label={isPlaying ? "Mute Sound" : "Unmute Sound"}
        >
            <div className="flex flex-col items-end">
                <span 
                    className="text-[9px] tracking-[0.3em] uppercase transition-opacity duration-700"
                    style={{ color, opacity: isPlaying ? 0.6 : 0.3 }}
                >
                    {isPlaying ? "Ambient On" : "Ambient Off"}
                </span>
            </div>

            <div className="relative w-10 h-10 flex items-center justify-center">
                {/* 背景の円線 */}
                <div 
                    className="absolute inset-0 rounded-full border transition-colors duration-700"
                    style={{ borderColor: isPlaying ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.1)' }}
                />
                
                {/* 波形アニメーション */}
                <div className="flex items-end gap-[3px] h-3">
                    {[1, 2, 3, 4].map((i) => (
                        <motion.div
                            key={i}
                            animate={isPlaying ? {
                                height: [4, 12, 6, 10, 4],
                            } : {
                                height: 2,
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1 + i * 0.2,
                                ease: "easeInOut",
                            }}
                            className="w-[1.5px] rounded-full"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>

                {/* ミュート時のスラッシュ（isPlaying=falseの時だけ微かに表示） */}
                {!isPlaying && (
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute w-6 h-[1px] bg-white/40 rotate-45"
                    />
                )}
            </div>
        </button>
    );
}
