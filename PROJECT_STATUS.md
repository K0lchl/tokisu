# Tokisu プロジェクト進捗レポート (2026-05-24)

## 🛠 本日完了したこと（5月24日）

### UI/UX改善
- **エントランスボタン改善**: 「ENTER EXPERIENCE」を「ENTER」に短縮、下矢印アイコン追加、パルスアニメーション実装
  - 高級感を保ちながら視認性を向上
- **テキスト削除**: 「The Narrative D2C」を削除して、シンプルで洗練された UIに変更

### 完全なカート＆決済機能の実装
- **CartContext（useReducer）**:
  - 商品の追加・削除・数量変更を一元管理
  - state 構造：items, total, itemCount
  - `useCart()` カスタムフック提供

- **CartDrawer（サイドバー ドロワー）**:
  - 右からスライドイン、オーバーレイクリックで閉じる機能
  - 商品リスト表示、数量調整、削除ボタン
  - 空のカート時にエモーショナルなメッセージ表示
  - 高級感を保つミニマルな UI

- **CheckoutModal（3ステップチェックアウト）**:
  - Step 1: 配送情報入力（name, email, address, phone）
  - Step 2: 決済方法選択（Stripe / PayPal）
  - Step 3: 決済処理＆完了表示
  - 各ステップで状態管理、エラーハンドリング実装

- **決済エンジン統合**:
  - **Stripe**: Payment Intent を使用したクレジットカード決済
  - **PayPal**: Orders API を使用したペイパル決済
  - 海外顧客向け：Stripe（メイン）+ PayPal（サブ）で信頼度向上

- **6つの Vercel Functions**:
  - `/api/create-payment-intent` - Stripe Payment Intent 作成
  - `/api/paypal-create-order` - PayPal Order 作成
  - `/api/confirm-payment` - Stripe 決済確定
  - `/api/confirm-paypal-order` - PayPal order キャプチャ
  - `/api/send-order-confirmation` - メール送信（Resend）
  - 🔒 **セキュリティ対策**: フロント→items のみ送信、サーバー側で金額再計算
  - ⚡ **Vercel タイムアウト対策**: 決済確定→即返す、メール送信は別で叩く

### Supabase による注文管理システム
- **Orders テーブル作成**:
  - order_id, email, name, address, phone, items, total_amount
  - payment_method, payment_status, shipping_status
  - created_at, updated_at タイムスタンプ管理
  - インデックス設定（email, created_at）で検索最適化

- **注文データの自動保存**:
  - Stripe/PayPal 決済後、注文データを Supabase に自動保存
  - Service Role Key を使用した安全なデータ書き込み

- **AdminOrdersPage（管理ダッシュボード）**:
  - 注文一覧表示（テーブル形式）
  - フィルター機能：all / pending / shipped
  - 発送状況の更新（ドロップダウン）
  - 注文詳細表示：shipping address, payment status
  - リアルタイム更新対応

---

## 📅 前回完了分（5月21日）
- SHOPページの実装（横スクロールカルーセル、陶芸家プロフィール）
- 商品データの構造化

## 📅 前々回完了分（5月9日）
- 音響演出の全面刷新（useSound/useSFXフック、環境音レイヤリング、動的ミキシング）
- 没入型エントランスの構築（Enter Experience）

## 📅 次のタスク候補（優先度順）

1. **🧪 決済テスト環境の完全設定**
   - Stripe テストモード：キー設定、テストカード（4242...）での決済確認
   - PayPal Sandbox モード：キー設定、テスト決済確認
   - Resend メール送信テスト：注文確認メール の実際の受信確認

2. **🔐 セキュリティ強化**
   - Supabase RLS（Row Level Security）ルール設定
   - 管理画面への認証（admin 用 password or JWT）
   - API エンドポイントの入力値検証＆サニタイズ

3. **📦 注文・配送フロー の完成度向上**
   - 在庫管理機能の追加（stock チェック）
   - 複数商品の場合の在庫引き当てロジック
   - 配送情報の詳細化（配送方法、予定日等）

4. **🎨 3Dモデル更新（準備中）**
   - 珠洲焼の正規 GLB データの統合
   - キャロラインさんとの 3D 撮影実施予定（春 2027）

5. **📱 モバイル対応＆AR体験強化**
   - CartDrawer / CheckoutModal のスマホ最適化
   - AR 配置精度の向上

6. **💳 決済後フロー の追加**
   - 注文履歴ページ（ユーザー側で自分の注文を確認）
   - 配送状況 の自動通知（メール / SMS）
   - キャンセル・返金フロー の実装

## 📌 メモ

### 現在の状態
- ✅ カート・決済フロー完成
- ✅ 注文データベース（Supabase）構築完成
- ✅ 管理画面（Orders Dashboard）構築完成
- ⏳ テスト環境設定（Stripe/PayPal キー）未設定
- ⏳ セキュリティ強化（RLS, 認証）未設定

### 環境変数（.env.local に記録）
```
NEXT_PUBLIC_SUPABASE_URL=https://frypwcrixvyiunrzouzf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
```

### 今後の協業
- **陶芸家との契約形態**: 現時点では個別契約。売上は Hidden Link Inc. / 圓堂光一が一時受け取り
- **キャロラインさん＆中山さん**: 3D 撮影プロジェクト予定（来春）
- **珠洲焼データの統合**: GLB モデルの差し替え予定

---