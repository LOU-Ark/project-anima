---
description: 02_Planning.mdに定義されたタスクを一つずつ着実に遂行し、実装・検証・報告・計画更新をワンサイクルで行うフローです。
---

# フェーズ実行ワークフロー (PHASE_EXECUTION_FLOW)

## 1. 概要
`02_Planning.md` に定義されたタスクを一つずつ着実に遂行し、実装・検証・報告・計画更新をワンサイクルで行うフローです。

## 2. フェーズとアクション

### Phase 1: シンクロ (Synchronize)
- **アクション**: `02_Planning.md` を読み取り、現在 `active` なタスクの内容と目的を再確認する。

### Phase 2: 実装 (Execute)
- **アクション**: タスク内容に基づき、コードの実装や設定を行う。
- **報告準備**: `REPORT_GENERATOR` を起動し、`.agent/templates/03_progress_report.md.template` を使用して `management/03_Implementation/` に新規報告書を作成する。

### Phase 3: 検証 (Check)
- **アクション**: `VERIFICATION_STANDARD.md` に基づき、以下の三種テストを実施する。
  1. **静的テスト**: 構文、命名規則、文字コードの確認。
  2. **動的テスト**: コード実行、リクエスト応答の確認（結合レベル）。
  3. **E2Eテスト**: ブラウザ等を用いたユーザー操作・表示の確認。
- **証跡**: テスト結果の詳細とエビデンスを収集する。

### Phase 4: 進捗更新と詳細報告 (Progress & Report)
- **報告書の作成**: `management/03_Implementation/` に詳細報告書を作成する。
- **セルフチェック**: `VERIFICATION_STANDARD.md` の「提出前チェックリスト」をすべて完了させ、表示不備がないことを確認する。
- **ポータル同期**: `management/99_Portal/index.html` を更新し、最新の報告書へのリンクと進捗率を反映する。
- **計画更新**: `PHASE_MANAGER` スキルを使用し、`02_Planning/02_Planning.md` のステータスを更新する。
- **完了**: ユーザーに「検証結果の詳細」を提示し、次のタスクへの移行を提案する。

## 3. 例外処理・不具合発生時 (Incident Handling)
- 実装・検証中に「不具合」「期待値との乖離」「表示の洗練不足」を検知した場合、即座にタスクを中断し、**`ISSUE_MANAGER` スキルを起動**してください。
- 解決策が汎用的な場合は、`templates/` に登録し、チームの「知的財産」として再利用可能にしてください。