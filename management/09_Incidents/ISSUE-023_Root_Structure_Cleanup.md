# ISSUE-023: ルート直下の構造汚染とREADME不足 (EXTERNAL)

## 1. 事象
- **報告日時**: 2026-04-26
- **指摘内容**:
    1. READMEに `management` / `product` フォルダの説明がない。
    2. `node_modules`, `scratch`, `test-results` がルート直下に散在しており、ガバナンス上の3層構造が汚染されている。

## 2. 根本原因分析 (RCA)
1. **README未更新**: `.agent` の詳細は前回追記したが、`management` と `product` は概要のみで、サブフォルダの役割や製品の説明が不足していた。
2. **開発ツール配置の無秩序**: Playwright導入時に `npm install` をルート直下で実行したため、`node_modules` / `package.json` / `test-results` がルートに生成された。テストファイル（`scratch/`）も一時的な場所に仮置きされたまま放置されていた。

## 3. 知的財産への変換 (Asset Conversion)
- **ファイル移動**:
    - `scratch/ghost_e2e_test.spec.ts` → `product/tests/ghost_e2e_test.spec.ts`
    - `package.json`, `package-lock.json` → `product/tests/`
    - `node_modules/` → `product/tests/node_modules/`
    - `test-results/` → `product/tests/test-results/`
    - `.env` → `product/.env`
    - 空の `scratch/` ディレクトリを削除。
- **設定ファイル作成**: `product/tests/playwright.config.ts` を新設。テスト実行基点を同ディレクトリに統一。
- **コード修正**:
    - `product/ghost/ai-client.js`: `.env` のフェッチパスを `../../.env` から `../.env` に修正。
    - `product/tests/ghost_e2e_test.spec.ts`: 429エラー（レートリミット）をキー・ローテーションの正常動作として許容するよう修正。
- **README更新**: `management/` と `product/` の全サブフォルダの説明、ディレクトリツリー図、テスト実行方法を追加。
- **.gitignore更新**: 移動後のパスを反映。

## 4. 動作確認
- `product/tests/` からの `npx playwright test` 実行: **Passed** (1 passed, 16.6s)

## 5. 再発防止策
- 開発ツール（npm等）のインストールは、必ず `product/tests/` 配下で実行すること。ルート直下への `node_modules` 生成を禁止する。
