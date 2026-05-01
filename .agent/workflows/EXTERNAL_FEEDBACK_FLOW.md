---
description: ユーザーからの指摘や改善要望を「プロセスの改善機会」として捉え、再発防止と知見の蓄積を徹底するためのフローです。
---

# 外部フィードバック対応フロー (EXTERNAL_FEEDBACK_FLOW)

## 1. 概要
ユーザーからの指摘は、内部検証プロセスをすり抜けた重要なシグナルです。本フローでは、単なる修正にとどまらず、なぜ見逃したかの分析（RCA）と基準の更新を必須とします。

## 2. 実行ステップ

### Step 1: 傾聴と記録 (Listen & Log)
- ユーザーの指摘内容を正確に `ISSUE-xxx` に記録する。
- 分類を `EXTERNAL` と明記する。

### Step 2: 根本原因分析 (RCA: Root Cause Analysis)
- 修正箇所の特定。
- **重要**: 「なぜ内部検証で見逃したか？」を分析し、現在の `VERIFICATION_STANDARD.md` の不足点を特定する。

### Step 3: 知的財産への変換 (Asset Conversion)
- 修正を実施する。
- **重要**: 修正・実装にあたっては、`.agent/templates/` を検索し、チーム標準の「型」がある場合は必ずそれを継承・活用する。
- 同様の指摘を防ぐため、新たな解決策が見つかった場合は `.agent/templates/` に登録する。
- **必須**: `.agent/rules/VERIFICATION_STANDARD.md` および **関連する `.agent/skills/*/SKILL.md` を更新**し、具体的な手順レベルでチェック項目を強化する。

### Step 4: ポータルへの統合 (Portal Sync)
- **必須**: 作成した `ISSUE-xxx` のレポートへのリンクを、必ず `management/99_Portal/index.html` の「納品後改善履歴 (POST-DELIVERY UPDATES)」セクションに追加する。チーム全員が改善の経緯をポータルから閲覧できるようにするためである。

### Step 5: ユーザー検証 (User Verify)
- 修正後の状態をユーザーに提示し、期待通りであることを確認いただく。

### Step 6: 完了報告と感謝 (Report & Appreciation)
- 修正内容と、それによって強化されたチームの基準（再発防止策）を報告する。
- **必須**: 更新した `Rules` や `Skills` の**ファイルパスと、変更後の内容（diff）をユーザーに提示**し、物理的に反映されたことを証明する。
