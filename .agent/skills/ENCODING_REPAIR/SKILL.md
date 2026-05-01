# 文字コード自動修正スキル (ENCODING_REPAIR)

## 1. 目的
プロジェクト内のファイルのエンコードを UTF-8 に統一し、ポータルでの文字化けを解消する。

## 2. 実行手順 (AIエージェント用)
1. **スキャン**: `grep` や `run_command` を使用し、非UTF-8のファイルがないかチェックする。
2. **変換**: 文字コードが疑わしいファイルに対し、UTF-8への再保存を行う。
3. **検証**: 修正後、ポータル（port 8000）にアクセスし、日本語が正しく表示されるか視覚的に確認する。
4. **ログ更新**: 解決した場合は `management/05_Issue_Log` のステータスを `Resolved` に更新する。

## 3. 推奨ツール
- `PowerShell` (New-Object System.Text.UTF8Encoding($false))
- `TextDecoder('utf-8')` (ブラウザ側での強制デコード)
