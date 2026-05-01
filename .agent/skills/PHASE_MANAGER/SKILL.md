# フェーズ管理スキル (PHASE_MANAGER)

## 1. 目的
`management/02_Planning/02_Planning.md` 内の Hyper-Gantt (JSON) を読み取り、タスクの進捗状況（todo -> active -> done）を自動的に更新する。

## 2. 実行手順
1. **ステータス確認**: `02_Planning.md` を読み込み、現在の `active` なタスク ID を特定する。
2. **完了処理**: 指定された ID のステータスを `done` に変更する。
3. **次フェーズ起動**: 次の ID のステータスを `active` に変更する。
4. **同期**: 更新した JSON を `02_Planning.md` に書き戻す。

## 3. 使用タイミング
- ワークフローの `Phase 4: 完了 (Act)` ステップで呼び出し、計画と実態を同期させる。
