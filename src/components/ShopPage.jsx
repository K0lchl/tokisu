import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductsByArtisan } from '../data/products';

export default function ShopPage({ onBack }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const artisanGroups = getProductsByArtisan();
    const scrollRef = useRef(null);

    // 商品フォーマット (円)
    const formatPrice = (price) => {
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(price);
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col bg-[#0a0a0a] text-white overflow-hidden"
        >
            {/* ヘッダー */}
            <header className="absolute top-0 left-0 right-0 p-6 md:p-10 flex justify-between items-center z-20 pointer-events-auto">
                <div className="flex flex-col">
                    <span className="text-[10px] tracking-[0.4em] text-white/50 uppercase">Collection</span>
                    <h1 className="text-sm tracking-[0.3em] font-serif mt-1">STORE</h1>
                </div>
                
                <div className="flex items-center gap-8">
                    <button className="text-[10px] tracking-[0.2em] text-white/70 hover:text-white transition-colors">
                        CART (0)
                    </button>
                    <button 
                        onClick={onBack}
                        className="text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity border border-white/20 rounded-full px-6 py-2"
                    >
                        CLOSE
                    </button>
                </div>
            </header>

            {/* メインコンテンツ (横スクロール) */}
            <div className="flex-1 w-full h-full pt-32 pb-20 overflow-x-auto overflow-y-hidden snap-x snap-mandatory hide-scrollbar" ref={scrollRef}>
                <div className="flex h-full min-w-max px-10 md:px-32 gap-32 pointer-events-auto">
                    
                    {artisanGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="flex gap-16 h-full items-center">
                            {/* 作家タイトル */}
                            <div className="w-64 flex-shrink-0 snap-center">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="border-l border-white/20 pl-6 py-4"
                                >
                                    <h2 className="text-sm tracking-[0.4em] text-white/50 mb-2 uppercase">Artisan</h2>
                                    <p className="text-xl md:text-2xl font-serif tracking-widest leading-relaxed">
                                        {group.artisanName.split('|')[0].trim()}<br/>
                                        {group.artisanName.split('|')[1].trim()}
                                    </p>
                                </motion.div>
                            </div>

                            {/* 作品リスト */}
                            {group.items.map((product, idx) => (
                                <motion.div 
                                    key={product.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8, delay: 0.6 + (idx * 0.1) }}
                                    onClick={() => setSelectedProduct(product)}
                                    className="h-[60vh] aspect-[3/4] relative group cursor-pointer snap-center"
                                >
                                    <div className="absolute inset-0 overflow-hidden bg-white/5">
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800/111111/333333?text=NO+IMAGE'; }}
                                        />
                                    </div>
                                    <div className="absolute -bottom-16 left-0 right-0 flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <h3 className="text-sm font-serif tracking-widest">{product.name}</h3>
                                        </div>
                                        <span className="text-xs tracking-wider text-white/70">{formatPrice(product.price)}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                    
                    {/* スクロール余白 */}
                    <div className="w-32 flex-shrink-0"></div>
                </div>
            </div>

            {/* 商品詳細モーダル */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col pointer-events-auto"
                    >
                        <button 
                            onClick={() => setSelectedProduct(null)}
                            className="absolute top-10 right-10 text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity z-10"
                        >
                            CLOSE
                        </button>
                        
                        <div className="flex-1 flex flex-col md:flex-row h-full">
                            <div className="flex-1 h-1/2 md:h-full p-10 flex items-center justify-center">
                                <motion.img 
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 0.8 }}
                                    src={selectedProduct.image} 
                                    alt={selectedProduct.name}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/800x800/111111/333333?text=NO+IMAGE'; }}
                                />
                            </div>
                            <div className="flex-1 h-1/2 md:h-full flex flex-col justify-center px-10 md:px-20">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <p className="text-[10px] tracking-[0.4em] text-white/50 mb-4">{selectedProduct.kiln} | {selectedProduct.artisan}</p>
                                    <h2 className="text-3xl md:text-5xl font-serif tracking-widest mb-8">{selectedProduct.name}</h2>
                                    <p className="text-lg tracking-widest mb-12">{formatPrice(selectedProduct.price)}</p>
                                    <p className="text-sm text-white/70 leading-loose tracking-widest mb-12 max-w-md">
                                        {selectedProduct.description}
                                    </p>
                                    
                                    <button className="w-full max-w-sm border border-white/30 py-4 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-colors duration-500">
                                        ADD TO CART
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </motion.div>
    );
}
