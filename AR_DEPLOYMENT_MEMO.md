# ARコンテンツの更新・差し替え手順メモ

今後、宇宙飛行士のモデルを「珠洲焼」などの本物の製品に差し替える際の手順です。

## 1. 3Dモデルデータの準備
*   **Android/PC用**: `.glb` 形式のファイルを用意します。
*   **iPhone用**: `.usdz` 形式のファイルを用意します。
    *   変換サイト例: [Aspose GLB to USDZ](https://products.aspose.app/3d/conversion/glb-to-usdz)
*   **重要**: 実寸大で表示させるため、3D制作ソフト側でメートル単位のスケール（例：高さ20cmなら0.2m）で書き出してください。

## 2. ファイルの配置
プロジェクトの `public` フォルダ内にある既存のファイルを上書きします。
1.  新しいGLBファイルを **`public/model.glb`** として保存。
2.  新しいUSDZファイルを **`public/model.usdz`** として保存。

## 3. 本番環境への反映（デプロイ）
ターミナルで以下のコマンドを実行して、Vercelに反映させます。
```bash
git add .
git commit -m "Update 3D model to Suzu-yaki"
git push
```

## 4. 動作確認のポイント
*   **Android/iPhone**: サイトを開き、ARボタンを押してカメラを起動。
*   **床の認識**: スマホをゆっくり左右に振り、床が認識されるまで待つ。
*   **サイズ感**: 配置されたモデルが本物と同じ大きさか確認する。

---
※ `src/components/ARView.jsx` のプログラム自体は、ファイル名が変わらない限り修正不要です。
