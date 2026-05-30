import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================
// 🔧 設定エリア: 実際の情報が決まったらここを書き換えるだけでOK
// ============================================================
const BUSINESS_INFO = {
  companyName: 'Kizumu Inc.',
  representative: '圓堂 光一',
  // TODO: バーチャルオフィスまたは実オフィスの住所が決まったら差し替え
  postalCode: '〒000-0000',
  address: '（住所確定後に記載いたします）',
  addressEn: '(To be updated upon office confirmation)',
  phone: '（確定後に記載いたします）',
  email: 'info@tokisu.jp',
  siteUrl: 'https://tokisu.jp',
};

const InfoRow = ({ label, labelEn, children, lang, noBorder }) => (
  <div className={`grid grid-cols-1 md:grid-cols-3 gap-2 ${noBorder ? 'pb-4' : 'border-b border-white/10 pb-5'}`}>
    <div className="text-white/40 text-[10px] tracking-[0.15em] uppercase leading-relaxed">
      {lang === 'en' ? labelEn : label}
    </div>
    <div className="md:col-span-2 text-white/75 leading-relaxed">
      {children}
    </div>
  </div>
);

export default function LegalPage({ onBack }) {
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
          {lang === 'en'
            ? 'Specified Commercial Transactions Act'
            : '特定商取引法に基づく表記'}
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
          className="space-y-5 text-sm leading-relaxed tracking-wider"
        >
          {/* 販売事業者名 */}
          <InfoRow label="販売事業者名" labelEn="Seller" lang={lang}>
            {BUSINESS_INFO.companyName}
          </InfoRow>

          {/* 運営責任者 */}
          <InfoRow label="運営統括責任者" labelEn="Chief Operating Officer" lang={lang}>
            {BUSINESS_INFO.representative}
          </InfoRow>

          {/* 所在地 */}
          <InfoRow label="所在地" labelEn="Address" lang={lang}>
            {lang === 'en' ? (
              <>{BUSINESS_INFO.addressEn}</>
            ) : (
              <>
                {BUSINESS_INFO.postalCode}
                <br />
                {BUSINESS_INFO.address}
              </>
            )}
          </InfoRow>

          {/* 連絡先 */}
          <InfoRow label="お問い合わせ先" labelEn="Contact" lang={lang}>
            {lang === 'en' ? (
              <>
                Phone: {BUSINESS_INFO.phone}
                <br />
                Email:{' '}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </>
            ) : (
              <>
                電話番号: {BUSINESS_INFO.phone}
                <br />
                メールアドレス:{' '}
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
                <br />
                <span className="text-white/40 text-xs">
                  ※ お問い合わせはメールにて承っております
                </span>
              </>
            )}
          </InfoRow>

          {/* 販売URL */}
          <InfoRow label="販売URL" labelEn="Website" lang={lang}>
            <a
              href={BUSINESS_INFO.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 decoration-white/20 hover:decoration-white/60 transition-colors"
            >
              {BUSINESS_INFO.siteUrl}
            </a>
          </InfoRow>

          {/* 販売価格 */}
          <InfoRow label="販売価格" labelEn="Pricing" lang={lang}>
            {lang === 'en'
              ? 'All prices are displayed on each product page in Japanese Yen (JPY), inclusive of tax.'
              : '各商品の販売ページに税込価格で表示しております。'}
          </InfoRow>

          {/* 商品代金以外の必要料金 */}
          <InfoRow
            label="商品代金以外の必要料金"
            labelEn="Additional Costs"
            lang={lang}
          >
            {lang === 'en' ? (
              <>
                <span className="text-white/90 font-medium">Shipping fees:</span>
                <br />
                • Domestic (Japan): ¥1,500 per order
                <br />
                • International: Calculated based on destination and weight
                <br />
                <br />
                <span className="text-white/90 font-medium">Payment processing:</span>
                <br />
                • Credit Card (Stripe): No additional fees
                <br />
                • PayPal: No additional fees
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  * Import duties, customs fees, and local taxes for international
                  orders are the responsibility of the buyer.
                </span>
              </>
            ) : (
              <>
                <span className="text-white/90 font-medium">送料:</span>
                <br />
                ・国内配送: 全国一律 ¥1,500（税込）
                <br />
                ・海外配送: 配送先・重量に応じて別途計算
                <br />
                <br />
                <span className="text-white/90 font-medium">決済手数料:</span>
                <br />
                ・クレジットカード決済（Stripe）: お客様負担なし
                <br />
                ・PayPal決済: お客様負担なし
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  ※ 海外配送の場合、関税・輸入税はお客様のご負担となります。
                </span>
              </>
            )}
          </InfoRow>

          {/* お支払い方法 */}
          <InfoRow label="お支払い方法" labelEn="Payment Methods" lang={lang}>
            {lang === 'en' ? (
              <>
                • Credit / Debit Card (Visa, Mastercard, JCB, American Express)
                <br />
                &nbsp;&nbsp;— Powered by Stripe (PCI DSS compliant)
                <br />
                • PayPal
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  * All transactions are processed through secure, encrypted
                  connections. We never store your card information.
                </span>
              </>
            ) : (
              <>
                ・クレジットカード / デビットカード
                <br />
                &nbsp;&nbsp;（Visa, Mastercard, JCB, American Express）
                <br />
                &nbsp;&nbsp;— Stripe による安全な決済処理（PCI DSS準拠）
                <br />
                ・PayPal
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  ※ すべての決済は暗号化された安全な接続で処理されます。
                  <br />
                  ※ クレジットカード情報は当社のサーバーには保存されません。
                </span>
              </>
            )}
          </InfoRow>

          {/* お支払い時期 */}
          <InfoRow label="お支払い時期" labelEn="Payment Timing" lang={lang}>
            {lang === 'en'
              ? 'Payment is charged at the time of order placement.'
              : 'ご注文時に即時決済が行われます。'}
          </InfoRow>

          {/* 商品の引渡し時期 */}
          <InfoRow
            label="商品の引渡し時期"
            labelEn="Delivery Timeline"
            lang={lang}
          >
            {lang === 'en' ? (
              <>
                <span className="text-white/90 font-medium">Domestic (Japan):</span>
                <br />
                Within 7–14 business days after payment confirmation.
                <br />
                <br />
                <span className="text-white/90 font-medium">International:</span>
                <br />
                Within 14–30 business days, depending on destination.
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  * Each piece is a handcrafted original. Please allow additional
                  time for careful packaging to ensure safe delivery.
                </span>
              </>
            ) : (
              <>
                <span className="text-white/90 font-medium">国内配送:</span>
                <br />
                ご入金確認後、7〜14営業日以内に発送いたします。
                <br />
                <br />
                <span className="text-white/90 font-medium">海外配送:</span>
                <br />
                ご入金確認後、14〜30営業日以内の到着を目安としております。
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  ※ 一点ものの陶芸作品のため、破損防止の厳重な梱包にお時間をいただく場合がございます。
                </span>
              </>
            )}
          </InfoRow>

          {/* 返品・キャンセルについて */}
          <InfoRow
            label="返品・交換・キャンセルについて"
            labelEn="Returns, Exchanges & Cancellations"
            lang={lang}
          >
            {lang === 'en' ? (
              <>
                <span className="text-white/90 font-medium">Returns due to product defects:</span>
                <br />
                If you receive a damaged or defective item, please contact us
                within 7 days of delivery. We will arrange a replacement or full
                refund at our expense.
                <br />
                <br />
                <span className="text-white/90 font-medium">Returns for customer convenience:</span>
                <br />
                Due to the handmade, one-of-a-kind nature of our products,
                returns or exchanges for personal reasons (change of mind, etc.)
                are not accepted. Please review all product details and images
                carefully before ordering.
                <br />
                <br />
                <span className="text-white/90 font-medium">Order cancellations:</span>
                <br />
                Once an order has been placed and payment processed, cancellations
                are not accepted. Please confirm your order details before
                completing payment.
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  * As our products are custom artisan pieces, they are exempt
                  from the cooling-off period under Japan's Consumer Contract Act.
                </span>
              </>
            ) : (
              <>
                <span className="text-white/90 font-medium">商品の不良・破損による返品:</span>
                <br />
                万が一、商品に不良や配送中の破損があった場合は、商品到着後7日以内にご連絡ください。
                送料弊社負担にて代替品との交換、または返金対応をさせていただきます。
                <br />
                <br />
                <span className="text-white/90 font-medium">お客様都合による返品:</span>
                <br />
                一点ものの手作り陶芸作品という商品の性質上、お客様のご都合（イメージ違い等）による返品・交換はお受けできません。
                ご注文前に商品の詳細・画像をよくご確認ください。
                <br />
                <br />
                <span className="text-white/90 font-medium">注文のキャンセル:</span>
                <br />
                ご注文確定後（決済処理完了後）のキャンセルはお受けできません。
                お支払い前に注文内容を十分ご確認ください。
                <br />
                <br />
                <span className="text-white/40 text-xs">
                  ※ 本商品はオーダーメイド品・特注品に該当するため、特定商取引法に基づくクーリングオフの対象外となります。
                </span>
              </>
            )}
          </InfoRow>

          {/* 動作環境 */}
          <InfoRow
            label="動作環境"
            labelEn="System Requirements"
            lang={lang}
            noBorder
          >
            {lang === 'en' ? (
              <>
                This website requires a modern web browser (Chrome, Safari,
                Firefox, Edge) with JavaScript enabled. Some features, including
                3D and AR experiences, require WebGL and WebXR support.
              </>
            ) : (
              <>
                本サイトのご利用には、JavaScript対応のモダンブラウザ（Chrome, Safari, Firefox,
                Edge）が必要です。3D表示・AR体験にはWebGL・WebXR対応が必要です。
              </>
            )}
          </InfoRow>
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
