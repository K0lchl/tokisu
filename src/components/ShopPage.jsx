import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProductsByArtisan } from '../data/products';

export default function ShopPage({ onBack }) {
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedArtisan, setSelectedArtisan] = useState(null);
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
                                    onClick={() => setSelectedArtisan(group.artisanInfo)}
                                    className="border-l border-white/20 pl-6 py-4 cursor-pointer group"
                                >
                                    <h2 className="text-sm tracking-[0.4em] text-white/50 mb-2 uppercase group-hover:text-white transition-colors">Artisan</h2>
                                    <p className="text-xl md:text-2xl font-serif tracking-widest leading-relaxed group-hover:text-white/80 transition-colors">
                                        {group.artisanInfo.kiln}<br/>
                                        {group.artisanInfo.name}
                                    </p>
                                    <div className="mt-4 w-8 h-[1px] bg-white/20 group-hover:w-16 group-hover:bg-white transition-all duration-500"></div>
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

            {/* 陶芸家プロフィールモーダル */}
            <AnimatePresence>
                {selectedArtisan && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col pointer-events-auto overflow-y-auto"
                    >
                        <button 
                            onClick={() => setSelectedArtisan(null)}
                            className="absolute top-10 right-10 text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity z-10"
                        >
                            CLOSE
                        </button>
                        
                        <div className="flex-1 flex flex-col md:flex-row h-full max-w-6xl mx-auto py-20 px-10">
                            {/* プロフィール画像 */}
                            <div className="flex-1 p-10 flex flex-col justify-center border-r border-white/10">
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.8 }}
                                    className="aspect-[3/4] w-full max-w-sm mx-auto overflow-hidden bg-white/5 grayscale"
                                >
                                    <img 
                                        src={selectedArtisan.image || 'https://via.placeholder.com/600x800/111111/333333?text=ARTISAN'} 
                                        alt={selectedArtisan.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800/111111/333333?text=NO+IMAGE'; }}
                                    />
                                </motion.div>
                            </div>
                            
                            {/* テキスト情報 */}
                            <div className="flex-1 flex flex-col justify-center px-10 md:px-20 pt-10 md:pt-0">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    {selectedArtisan.kilnKana && (
                                        <p className="text-[9px] tracking-[0.3em] text-white/30 mb-1">{selectedArtisan.kilnKana}</p>
                                    )}
                                    <p className="text-lg font-serif tracking-widest text-white/60 mb-1">{selectedArtisan.kiln}</p>
                                    {selectedArtisan.nameKana && (
                                        <p className="text-[10px] tracking-[0.2em] text-white/40 mb-2">【{selectedArtisan.name}／{selectedArtisan.nameKana}】</p>
                                    )}
                                    <div className="w-12 h-[1px] bg-white/20 my-8"></div>
                                    
                                    {/* 経歴タイムライン */}
                                    {selectedArtisan.timeline && selectedArtisan.timeline.length > 0 && (
                                        <div className="mb-12">
                                            <ul className="text-xs text-white/70 leading-relaxed tracking-widest list-none space-y-2">
                                                {selectedArtisan.timeline.map((entry, i) => (
                                                    <li key={i} className="flex gap-4">
                                                        <span className="text-white/40 flex-shrink-0 w-16">{entry.year}</span>
                                                        <span>{entry.event}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="w-8 h-[1px] bg-white/20 my-8"></div>

                                    {selectedArtisan.comment && (
                                        <div className="mb-10">
                                            <p className="text-sm text-white/80 leading-loose tracking-widest italic font-serif">
                                                {selectedArtisan.comment}
                                            </p>
                                        </div>
                                    )}

                                    {selectedArtisan.bio && (
                                        <div className="mb-12">
                                            <p className="text-xs text-white/60 leading-loose tracking-widest">
                                                {selectedArtisan.bio}
                                            </p>
                                        </div>
                                    )}

                                    {selectedArtisan.awards && selectedArtisan.awards.length > 0 && (
                                        <div className="mb-12">
                                            <h3 className="text-[10px] tracking-[0.3em] text-white/40 mb-4 border-b border-white/10 pb-2">AWARDS</h3>
                                            <ul className="text-xs text-white/60 leading-loose tracking-widest list-none">
                                                {selectedArtisan.awards.map((award, i) => (
                                                    <li key={i}>{award}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {selectedArtisan.instagram && (
                                        <div>
                                            <a 
                                                href={`https://instagram.com/${selectedArtisan.instagram.replace('@','')}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="inline-block border border-white/30 px-8 py-3 text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-colors duration-500"
                                            >
                                                INSTAGRAM
                                            </a>
                                        </div>
                                    )}
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
