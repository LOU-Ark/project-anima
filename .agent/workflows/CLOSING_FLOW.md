---
description: プロジェクトの最終納品（04）と完了評価（05）を厳格に執り行い、プロジェクトを公式にクローズするためのワークフローです。
---

# プロジェクト完了ワークフロー (CLOSING_FLOW)

## 1. 概要
プロジェクトの全タスク完了後、納品物一覧の確認と品質保証の最終宣言、およびチーム評価を行い、プロジェクトを完遂状態（MISSION ACCOMPLISHED）へと移行させます。

## 2. フェーズとアクション

### Phase 1: 納品準備 (Delivery Preparation)
- **アクション**: `.agent/templates/04_delivery_note.md.template` を使用し、`management/04_Delivery/04_Delivery_Note.md` を作成する。
- **内容**: 納品物一覧を列挙し、すべての実ファイルが `product/` 等の正しい場所に存在することを物理監査（Physical Audit）で再確認する。

### Phase 2: 完了報告と評価 (Final Evaluation)
- **アクション**: `.agent/templates/05_final_evaluation.md.template` を使用し、`management/05_Evaluation/05_Final_Evaluation.md` を作成する。
- **内容**: 
    - 最終的なエビデンス（全景スクリーンショット等）を掲載。
    - **スキルズチーム評価**: 規約に基づき、個人的な記録としての評価項目を記入。

### Phase 3: ポータル最終同期 (Portal Finalization)
- **アクション**: `management/99_Portal/index.html` を更新。
- **内容**: 
    - ステータスを「完了 (DONE)」に変更。
    - 納品書（04）および完了評価（05）へのリンクを追加。
    - ポータルを「静的アーカイブ可能」な状態に固定する。

### Phase 4: サーバー停止 (Shut Down)
- **アクション**: 作業に使用したすべての開発サーバー（Vite, HTTP Server 等）を停止する。

## 3. 完了の定義
- [ ] `04_Delivery_Note.md` が承認されている。
- [ ] `05_Final_Evaluation.md` にチーム評価が記載されている。
- [ ] ポータルが「完了」状態で正しくレンダリングされている。
