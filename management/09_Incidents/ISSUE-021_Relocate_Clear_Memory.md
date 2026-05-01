# ISSUE-021: CLEAR MEMORY機能のUI移設 (EXTERNAL)

## 1. 事象
- **報告日時**: 2026-04-26
- **指摘内容**: 「clear memoryはゴーストというよりメモ帳側に欲しいです。」
- **発生状況**: ISSUE-020にて追加した全データ消去機能が、バックエンド側（ゴースト画面）に配置されており、実際にデータを閲覧・管理するフロントエンド側（メモ帳アプリ）のUXと乖離していた。

## 2. 根本原因分析 (RCA)
1. **関心の分離（SOC）とUXの不一致**: メモデータ（`aurora_notes`）の生成元はゴースト画面であるが、その管理や閲覧の主体は「Aurora Notes（Web App）」側にある。機能の実装しやすさを優先し、ゴースト側に削除ボタンを置いたことは、ユーザーインターフェース設計の原則（データとアクションの近接）に反していた。

## 3. 知的財産への変換 (Asset Conversion)
- **修正の実施**:
    - `product/ghost/index.html` および `engine.js` から、CLEAR MEMORYボタンと関連ロジックを削除。
    - `product/web-app/index.html` のヘッダー部（PAUSEボタンの隣）に新たに `CLEAR MEMORY` ボタンを配置。
    - `product/web-app/index.js` にて、クリック時に確認ダイアログ（`confirm`）を出し、`localStorage` のクリアと画面の再描画（`this.notes = []; this.render();`）を行うイベントリスナーを追加。

## 4. 再発防止策
- `VERIFICATION_STANDARD.md` に「機能の配置はデータの生成元ではなく、エンドユーザーがデータを消費・管理する画面側に置くこと（UX駆動設計）」を追記し、次回のデザインレビュー基準とする。
