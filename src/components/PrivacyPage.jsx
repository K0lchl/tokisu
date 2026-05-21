import React from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPage({ onBack }) {
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
                    プライバシーポリシー
                </motion.h1>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-10 text-sm leading-relaxed tracking-wider"
                >
                    <section>
                        <h2 className="text-white text-base tracking-widest mb-4">1. 個人情報の収集について</h2>
                        <p className="text-white/60">
                            当サイトでは、ご購入、お問い合わせ、メールマガジン登録などの際に、氏名、住所、電話番号、メールアドレスなどの個人情報をお預かりする場合があります。
                        </p>
                    </section>
                    
                    <section>
                        <h2 className="text-white text-base tracking-widest mb-4">2. 個人情報の利用目的</h2>
                        <p className="text-white/60">
                            お預かりした個人情報は、以下の目的で利用いたします。<br/>
                            ・商品の発送、代金決済、およびこれらに関連するご連絡<br/>
                            ・お問い合わせに対する回答<br/>
                            ・新商品やサービスに関する情報のご案内（ご希望の方のみ）
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-base tracking-widest mb-4">3. 個人情報の第三者への提供</h2>
                        <p className="text-white/60">
                            法令に基づく場合や、配送業者や決済代行業者など業務遂行上必要な場合を除き、事前にお客様の同意を得ることなく、第三者に個人情報を提供することはありません。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-base tracking-widest mb-4">4. 個人情報の管理</h2>
                        <p className="text-white/60">
                            お客様の個人情報は、漏洩、紛失、改ざんを防止するため、適切なセキュリティ対策を講じ、厳重に管理いたします。
                        </p>
                    </section>

                    <section>
                        <h2 className="text-white text-base tracking-widest mb-4">5. お問い合わせ窓口</h2>
                        <p className="text-white/60">
                            本ポリシーに関するお問い合わせ、または個人情報の開示・訂正・削除のご請求については、「特定商取引法に基づく表記」に記載の連絡先までお願いいたします。
                        </p>
                    </section>
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
