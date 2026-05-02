import React from 'react';
import { motion } from 'framer-motion';

export default function StoryPage({ onBack }) {
    return (
        <motion.article
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 overflow-y-auto"
        >
            <div className="max-w-2xl mx-auto py-20 px-10">
                <nav>
                    <button onClick={onBack} className="mb-20 text-[10px] tracking-[0.3em] opacity-50 hover:opacity-100 transition-opacity focus:outline-none focus:ring-1 focus:ring-white/50 rounded px-2 py-1 -ml-2">
                        ← BACK TO MAIN
                    </button>
                </nav>
                <header>
                    <h2 className="text-4xl font-extralight tracking-[0.5em] mb-12">STORY</h2>
                </header>
                <section className="space-y-8 text-sm leading-relaxed text-white/70 font-light tracking-wide">
                    <p>石川県珠洲市。そこで数百年続く伝統工芸「珠洲焼」。</p>
                    <p>震災を乗り越え、いま再び立ち上がる職人の技術と情熱を、もっと世界に。</p>
                    {/* ここにさらにテキストや画像を配置 */}
                </section>
            </div>
        </motion.article>
    );
}