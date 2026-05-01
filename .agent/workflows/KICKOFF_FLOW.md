---
description: ユーザーからの「開始」指示を受け、プロジェクトの土台（要件・計画・可視化）を最短で構築するためのワークフローです。
---

# プロジェクト・キックオフ・ワークフロー (KICKOFF_FLOW)

## 1. 概要
ユーザーからの「開始」指示を受け、プロジェクトの土台（要件・計画・可視化）を最短で構築するためのワークフローです。

## 2. フェーズとアクション

### Phase 1: ヒアリング (Hearing)
- **アクション**: ユーザーの抽象的な要望を具体化するための「4大質問」を提示する。
  1. **背景・目的**: なぜこれを作るのか？
  2. **コア機能**: 絶対に必要な機能は何か？
  3. **ターゲット**: 誰が使うのか？
  4. **世界観**: デザインのトーン（例：サイバーパンク、ミニマル、高級感）
- **ゴール**: ユーザーからこれらの回答を得る。

### Phase 2: 要件定義 (Requirements)
- **アクション**: `.agent/templates/01_requirements.md.template` を使用し、`management/01_Requirements/01_Requirements.md` を作成・更新する。
- **記載内容**: 概要、ターゲット、機能/非機能、制約、技術スペック、成功の定義を網羅。

### Phase 3: 作業計画 (Planning)
- **アクション**: `.agent/templates/02_planning.md.template` を使用し、`management/02_Planning/02_Planning.md` を作成・更新する。
- **記載内容**: 3階層（Phase > Task > Step）のWBSを Mermaid.js の Hyper-Gantt 形式で構造化。

### Phase 4: ポータル生成 (Portal)
- **アクション**: `management/99_Portal/index.html` を生成し、ドキュメントへのリンクと進捗グラフを表示する。
- **デザイン**: Aurora Framework 基準のプレミアムデザイン（グラデーション、アニメーション）を適用。

### Phase 5: 検証と報告 (Verify)
- **アクション**: `REPORT_GENERATOR` スキルを起動し、全工程の証跡を残す。
- **完了条件**: `VERIFICATION_STANDARD.md` をクリアする。
