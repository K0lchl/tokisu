import React from 'react';
import { motion } from 'framer-motion';

export default function Navigation({ onNavigate }) {
    return (
        <nav className="absolute bottom-10 md:bottom-16 left-0 right-0 z-30 flex flex-col items-center pointer-events-none px-6">

            {/* プロジェクトの顔としてのタイトル演出 */}
            <header className="mb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, letterSpacing: "0.1em" }}
                    animate={{ opacity: 1, letterSpacing: "0.6em" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="text-2xl font-extralight mb-2"
                >
                    Coming soon...
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-light"
                >
                    The Narrative D2C
                </motion.p>
            </header>

            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-lg mx-auto pointer-events-auto">
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('story')}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/50 backdrop-blur-md text-white text-[10px] tracking-[0.2em] transition-colors duration-500 rounded-full"
                >
                    STORY : 珠洲の記憶
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('ar')}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/50 backdrop-blur-md text-white text-[10px] tracking-[0.2em] transition-colors duration-500 rounded-full"
                >
                    AR EXPERIENCE
                </motion.button>

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigate('contact')}
                    className="relative overflow-hidden flex-1 py-4 bg-white/90 hover:bg-white text-black text-[10px] font-bold tracking-[0.2em] transition-colors duration-500 rounded-full shadow-[0_4px_30px_rgba(255,255,255,0.2)]"
                >
                    <span className="relative z-10">JOIN LIST</span>
                    <motion.div
                        initial={{ x: "-200%" }}
                        animate={{ x: "200%" }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "linear", repeatDelay: 0.5 }}
                        className="absolute inset-0 z-0 w-[150%] bg-gradient-to-r from-transparent via-white to-transparent skew-x-[-20deg] opacity-70 mix-blend-overlay"
                    />
                </motion.button>
            </div>
        </nav>
    );
}