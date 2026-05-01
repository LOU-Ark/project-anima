# ISSUE-022: PAUSEボタンの初期状態とUIの不一致 (EXTERNAL)

## 1. 事象
- **報告日時**: 2026-04-26
- **指摘内容**: 「ゴーストをpauseで起動するのも違和感です」
- **発生状況**: ユーザーがシミュレーター（ゴースト画面やメモ帳画面）を開いた際、前回のセッションで既に「一時停止状態（paused = true）」になっていたとしても、画面上のボタンテキストが初期値としてハードコーディングされた「PAUSE」のまま表示されており、停止状態を解除するために「PAUSE」ボタンを押さなければならないというUXの矛盾が発生していた。

## 2. 根本原因分析 (RCA)
1. **初期状態の同期漏れ**: `localStorage.getItem('aurora_sim_paused')` の値を変数 `globalPaused` には読み込んでいたが、それを画面初期化時（Initフェーズ）にUI（`innerText`）へ反映する処理が抜け落ちていた。
2. **メモ帳アプリ側での未実装**: メモ帳（Aurora Notes）側にもPAUSEボタンのHTMLが存在したが、JS側でイベントリスナーや状態監視機能が一切実装されておらず、押しても機能していなかった。

## 3. 知的財産への変換 (Asset Conversion)
- **修正の実施**:
    - `product/ghost/engine.js`: 初期化時に `globalPaused` が `true` の場合、ボタンのテキストを「START」に変更し、CSSの `paused` クラスを適用する処理を追加した。
    - `product/web-app/index.js`: メモ帳側のPAUSEボタン（`global-pause-btn`）にも同様のロジックを追加し、さらに `window.addEventListener('storage')` を使って、ゴースト画面側でPAUSE/STARTが切り替わった際にリアルタイムでメモ帳側のボタンも同期する連動処理を実装した。

## 4. 再発防止策
- `VERIFICATION_STANDARD.md` の「視覚層」に、「永続化された状態（localStorage等）が、画面の初期ロード時にUIコンポーネント（ボタン表記やトグル状態）に正しく復元されることを確認する」という項目を追加する。
