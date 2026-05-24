import React from 'react';
import { motion } from 'framer-motion';

export default function LegalPage({ onBack }) {
    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-3xl overflow-y-auto"
        >
            <div className="max-w-2xl mx-auto px-6 py-24 text-white/80 font-serif">
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-light tracking-[0.2em] mb-12 text-center text-white"
                >
                    特定商取引法に基づく表記
                </motion.h1>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-8 text-sm leading-relaxed tracking-wider"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">販売事業者名</div>
                        <div className="md:col-span-2">Kizumu Inc.</div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">運営責任者名</div>
                        <div className="md:col-span-2">圓堂 光一</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">所在地</div>
                        <div className="md:col-span-2">〒000-0000<br/>〇〇県〇〇市〇〇町1-2-3</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">お問い合わせ先</div>
                        <div className="md:col-span-2">
                            電話番号: 000-000-0000<br/>
                            メールアドレス: info@example.com
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">販売価格</div>
                        <div className="md:col-span-2">各商品詳細ページに税込価格で表示</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">商品代金以外の必要料金</div>
                        <div className="md:col-span-2">配送料（全国一律〇〇円）<br/>銀行振込手数料（お客様負担）</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">お支払い方法</div>
                        <div className="md:col-span-2">クレジットカード決済（Visa, MasterCard, JCB, AMEX）<br/>銀行振込</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-b border-white/10 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">商品の引き渡し時期</div>
                        <div className="md:col-span-2">ご注文（またはご入金）確認後、〇営業日以内に発送いたします。</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-4">
                        <div className="text-white/50 text-xs tracking-widest uppercase">返品・キャンセル</div>
                        <div className="md:col-span-2">
                            お客様都合による返品・交換はお受けできません。<br/>
                            万が一、商品に不良や破損があった場合は、商品到着後7日以内にご連絡ください。送料弊社負担にて代替品との交換、または返金対応をさせていただきます。
                        </div>
                    </div>
                </motion.div>

                <div className="mt-16 text-center pb-24">
                    <button 
                        onClick={onBack} 
                        className="text-[10px] tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity text-white"
                    >
                        ← BACK TO HOME
                    </button>
                </div>
            </div>
        </motion.section>
    );
}
