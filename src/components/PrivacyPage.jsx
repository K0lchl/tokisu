import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function PrivacyPage({ onBack }) {
    const [lang, setLang] = useState('ja');

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-50 flex flex-col bg-black/90 backdrop-blur-3xl overflow-y-auto"
        >
            <div className="max-w-2xl mx-auto px-6 py-24 text-white/80 font-serif">
                {/* タイトル */}
                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl font-light tracking-[0.2em] mb-4 text-center text-white"
                >
                    {lang === 'en' ? 'Privacy Policy' : 'プライバシーポリシー'}
                </motion.h1>

                {/* 言語切替 */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center gap-4 mb-12"
                >
                    <button
                        onClick={() => setLang('ja')}
                        className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 pb-1 ${
                            lang === 'ja'
                                ? 'text-white border-b border-white/60'
                                : 'text-white/30 hover:text-white/60'
                        }`}
                    >
                        日本語
                    </button>
                    <span className="text-white/20">|</span>
                    <button
                        onClick={() => setLang('en')}
                        className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 pb-1 ${
                            lang === 'en'
                                ? 'text-white border-b border-white/60'
                                : 'text-white/30 hover:text-white/60'
                        }`}
                    >
                        English
                    </button>
                </motion.div>

                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-10 text-sm leading-relaxed tracking-wider"
                >
                    {lang === 'ja' ? (
                        <>
                            {/* 前文 */}
                            <p className="text-white/50 text-xs leading-loose">
                                Kizumu Inc.（以下「当社」）は、当社が運営するオンラインストア「Tokisu」（以下「当サイト」）をご利用いただくお客様の個人情報を適切に保護・管理し、安心してご利用いただけるよう、以下のプライバシーポリシーを定めます。
                            </p>

                            {/* 1. 個人情報の定義 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">1. 個人情報の定義</h2>
                                <p className="text-white/60">
                                    本ポリシーにおける「個人情報」とは、氏名、住所、電話番号、メールアドレス、決済情報など、特定の個人を識別できる情報を指します。
                                </p>
                            </section>

                            {/* 2. 個人情報の収集 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">2. 個人情報の収集について</h2>
                                <p className="text-white/60">
                                    当サイトでは、以下の場面において個人情報をお預かりする場合があります。
                                </p>
                                <ul className="mt-3 space-y-1.5 text-white/60">
                                    <li>・商品のご購入時（氏名、住所、電話番号、メールアドレス）</li>
                                    <li>・お問い合わせ時（氏名、メールアドレス）</li>
                                    <li>・メールマガジン（Join the List）ご登録時（メールアドレス）</li>
                                    <li>・決済処理時（クレジットカード情報 ※ 後述の通り当社サーバーには保存されません）</li>
                                </ul>
                            </section>

                            {/* 3. 利用目的 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">3. 個人情報の利用目的</h2>
                                <p className="text-white/60">
                                    お預かりした個人情報は、以下の目的でのみ利用いたします。
                                </p>
                                <ul className="mt-3 space-y-1.5 text-white/60">
                                    <li>・商品の発送、代金決済、およびこれらに関連するご連絡</li>
                                    <li>・注文内容の確認・変更に関するご連絡</li>
                                    <li>・お問い合わせに対する回答</li>
                                    <li>・新商品やサービスに関する情報のご案内（ご希望の方のみ）</li>
                                    <li>・サイトの改善・カスタマイズのための統計データの作成</li>
                                </ul>
                            </section>

                            {/* 4. 決済情報の取り扱い */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">4. 決済情報の取り扱い</h2>
                                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                                    <p className="text-white/70 font-medium mb-3">クレジットカード決済について</p>
                                    <p className="text-white/60">
                                        当サイトの決済処理はすべて、PCI DSS（Payment Card Industry Data Security Standard）に準拠した外部決済サービス「Stripe」および「PayPal」を通じて行われます。
                                    </p>
                                    <p className="text-white/60 mt-3">
                                        お客様のクレジットカード番号、セキュリティコード（CVV）等の決済情報は、当社のサーバーを経由することなく、直接決済サービスプロバイダーの安全なサーバーに送信・処理されます。当社がカード情報を閲覧・保存することは一切ありません。
                                    </p>
                                </div>
                            </section>

                            {/* 5. 第三者提供 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">5. 個人情報の第三者への提供</h2>
                                <p className="text-white/60">
                                    以下の場合を除き、事前にお客様の同意を得ることなく第三者に個人情報を提供することはありません。
                                </p>
                                <ul className="mt-3 space-y-1.5 text-white/60">
                                    <li>・法令に基づく開示要請があった場合</li>
                                    <li>・配送業者への配送に必要な情報の提供</li>
                                    <li>・決済代行業者（Stripe, PayPal）への決済処理に必要な情報の提供</li>
                                    <li>・メール配信サービス（Resend）へのメール送信に必要な情報の提供</li>
                                </ul>
                            </section>

                            {/* 6. データベース管理 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">6. データの管理・保管</h2>
                                <p className="text-white/60">
                                    注文情報（氏名、住所、注文内容等）は、クラウドデータベースサービス「Supabase」にて暗号化された安全な環境で管理されます。適切なアクセス制御のもと、不正アクセス・漏洩・紛失の防止に努めます。
                                </p>
                            </section>

                            {/* 7. Cookie等 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">7. Cookie・アクセス解析</h2>
                                <p className="text-white/60">
                                    当サイトでは、サービスの向上を目的としてVercel Analyticsによるアクセス解析を行っています。これらのツールはCookieを使用する場合がありますが、個人を特定する情報は収集しません。
                                </p>
                            </section>

                            {/* 8. 個人情報の開示・訂正・削除 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">8. 個人情報の開示・訂正・削除</h2>
                                <p className="text-white/60">
                                    お客様ご本人からの個人情報の開示・訂正・削除のご請求については、ご本人確認のうえ速やかに対応いたします。下記の問い合わせ先までメールにてご連絡ください。
                                </p>
                            </section>

                            {/* 9. ポリシーの変更 */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">9. 本ポリシーの変更</h2>
                                <p className="text-white/60">
                                    本ポリシーの内容は、法令やサービス内容の変更に伴い、予告なく改定する場合があります。改定後のポリシーは当サイトに掲載した時点から効力を生じます。
                                </p>
                            </section>

                            {/* 10. お問い合わせ */}
                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">10. お問い合わせ窓口</h2>
                                <p className="text-white/60">
                                    本ポリシーに関するお問い合わせ、または個人情報の開示・訂正・削除のご請求については、以下までお願いいたします。
                                </p>
                                <div className="mt-3 bg-white/5 rounded-lg p-4 border border-white/10">
                                    <p className="text-white/60">
                                        Kizumu Inc.（個人情報保護担当）
                                        <br />
                                        メール:{' '}
                                        <a
                                            href="mailto:info@tokisu.jp"
                                            className="underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
                                        >
                                            info@tokisu.jp
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </>
                    ) : (
                        <>
                            {/* English version */}
                            <p className="text-white/50 text-xs leading-loose">
                                Kizumu Inc. ("we," "us," or "our") operates the online store "Tokisu" ("this site"). This Privacy Policy describes how we collect, use, and protect your personal information.
                            </p>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">1. Information We Collect</h2>
                                <p className="text-white/60">
                                    We collect personal information in the following situations:
                                </p>
                                <ul className="mt-3 space-y-1.5 text-white/60">
                                    <li>• When making a purchase (name, address, phone, email)</li>
                                    <li>• When contacting us (name, email)</li>
                                    <li>• When subscribing to our mailing list (email)</li>
                                    <li>• During payment processing (card details — see Section 4)</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">2. How We Use Your Information</h2>
                                <ul className="space-y-1.5 text-white/60">
                                    <li>• Processing and shipping your orders</li>
                                    <li>• Communicating about your order status</li>
                                    <li>• Responding to inquiries</li>
                                    <li>• Sending product updates and newsletters (opt-in only)</li>
                                    <li>• Improving our website and services</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">3. Data Sharing</h2>
                                <p className="text-white/60">
                                    We do not sell your personal information. We share data only with:
                                </p>
                                <ul className="mt-3 space-y-1.5 text-white/60">
                                    <li>• Shipping carriers (for delivery)</li>
                                    <li>• Payment processors (Stripe, PayPal)</li>
                                    <li>• Email service (Resend)</li>
                                    <li>• As required by law</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">4. Payment Security</h2>
                                <div className="bg-white/5 rounded-lg p-5 border border-white/10">
                                    <p className="text-white/60">
                                        All payment processing is handled by PCI DSS-compliant providers (Stripe and PayPal). Your credit card number and security code are transmitted directly to their secure servers and are never stored on, or even pass through, our systems.
                                    </p>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">5. Data Storage</h2>
                                <p className="text-white/60">
                                    Order data is securely stored on Supabase with encryption at rest and in transit. We implement access controls and security measures to prevent unauthorized access.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">6. Cookies & Analytics</h2>
                                <p className="text-white/60">
                                    We use Vercel Analytics to understand how visitors interact with our site. These tools may use cookies but do not collect personally identifiable information.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">7. Your Rights</h2>
                                <p className="text-white/60">
                                    You have the right to request access to, correction of, or deletion of your personal data. Please contact us at{' '}
                                    <a
                                        href="mailto:info@tokisu.jp"
                                        className="underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
                                    >
                                        info@tokisu.jp
                                    </a>{' '}
                                    to exercise these rights.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">8. Changes to This Policy</h2>
                                <p className="text-white/60">
                                    We may update this Privacy Policy from time to time. Changes take effect upon publication on this website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-white text-base tracking-widest mb-4">9. Contact Us</h2>
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <p className="text-white/60">
                                        Kizumu Inc. (Privacy Officer)
                                        <br />
                                        Email:{' '}
                                        <a
                                            href="mailto:info@tokisu.jp"
                                            className="underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
                                        >
                                            info@tokisu.jp
                                        </a>
                                    </p>
                                </div>
                            </section>
                        </>
                    )}
                </motion.div>

                {/* 最終更新日 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 text-center"
                >
                    <p className="text-[10px] tracking-[0.2em] text-white/20">
                        {lang === 'en' ? 'Last updated: May 30, 2026' : '最終更新日: 2026年5月30日'}
                    </p>
                </motion.div>

                {/* 戻るボタン */}
                <div className="mt-8 text-center pb-24">
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
