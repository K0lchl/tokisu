import React from 'react';
import { motion } from 'framer-motion';

export default function ContactPage({ onBack }) {
    return (
        <motion.section 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
        >
            <div className="text-center max-w-md w-full px-6">
                <h2 className="text-2xl font-extralight tracking-[0.4em] mb-8">JOIN THE LIST</h2>
                <form className="flex flex-col gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-white/10 border border-white/20 rounded-full px-6 py-3 text-sm text-center focus:outline-none focus:border-white/50 transition-colors placeholder:text-white/40 text-white" 
                    />
                    <button 
                        type="submit" 
                        className="bg-white text-black font-bold tracking-[0.2em] rounded-full px-6 py-3 text-[10px] hover:scale-105 transition-transform"
                    >
                        SUBSCRIBE
                    </button>
                    <button 
                        type="button" 
                        onClick={onBack} 
                        className="mt-6 text-[10px] tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity"
                    >
                        ← GO BACK
                    </button>
                </form>
            </div>
        </motion.section>
    );
}
