import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactPage({ onBack }) {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setStatus('success');
                setEmail('');
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        }
    };

    return (
        <motion.section 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xl"
        >
            <div className="text-center max-w-md w-full px-6">
                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="py-12"
                        >
                            <h2 className="text-2xl font-extralight tracking-[0.4em] mb-4 text-white">THANK YOU</h2>
                            <p className="text-[10px] text-white/40 tracking-[0.2em] uppercase">You are now on the list.</p>
                            <button 
                                onClick={onBack} 
                                className="mt-12 text-[10px] tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity text-white border border-white/20 rounded-full px-8 py-3"
                            >
                                CLOSE
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div key="form">
                            <h2 className="text-2xl font-extralight tracking-[0.4em] mb-12 text-white">JOIN THE LIST</h2>
                            <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
                                <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email" 
                                    required
                                    className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-center focus:outline-none focus:border-white/30 transition-all placeholder:text-white/20 text-white" 
                                />
                                <button 
                                    type="submit" 
                                    disabled={status === 'loading'}
                                    className="bg-white text-black font-bold tracking-[0.2em] rounded-full px-6 py-4 text-[10px] hover:bg-opacity-90 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    {status === 'loading' ? 'PROCESSING...' : 'SUBSCRIBE'}
                                </button>
                                
                                {status === 'error' && (
                                    <p className="text-[9px] text-red-400/80 tracking-widest mt-2 uppercase">Something went wrong. Try again.</p>
                                )}

                                <button 
                                    type="button" 
                                    onClick={onBack} 
                                    className="mt-8 text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity text-white"
                                >
                                    ← BACK TO STORY
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.section>
    );
}

