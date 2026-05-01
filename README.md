# 🛰️ Team Aurora (Skills Team) Governance Kit

## 1. チーム概要

Team Aurora（スキルズチーム）は、**「ガバナンス・ファースト（仕組みによる解決）」**を根本原則とするエージェント指向のエンジニアリングチームです。単なるコード生成にとどまらず、プロジェクト管理、品質保証、証跡管理のすべてを「仕組み」として提供します。

## 2. 統合ビジネスフロー (01-05 Milestone)

当チームは、ビジネス上のマイルストーンとシステム実行を同期させた以下の 5段階フローを採用しています。

1.  **01_Requirements**: 8項目網羅型の要件定義と成功の定義。
2.  **02_Planning**: 3階層WBSとAI加速ガントチャート。
3.  **03_Implementation**: 三種テスト（静的・動的・E2E）と動画証跡。
4.  **04_Delivery**: 物理監査済みの納品物一覧。
5.  **05_Evaluation**: プロジェクト総括とスキルズチームの定性評価。

## 3. アセット構造 (.agent)

本リポジトリの頭脳である `.agent` ディレクトリには、チームの「知能」が以下の形でモジュール化されています。

### 📜 ルール群 (Rules)

エージェントの行動規範や検証基準を定めます。

- `CORE_RULES.md`: チームの根本原則（構造的整合性、Full Fidelity）。
- `VERIFICATION_STANDARD.md`: 静的・動的・E2E・視覚層（テーマ準拠・状態同期を含む）にわたる厳格な品質検証基準。
- `ANTI_PATTERNS.md`: チームが避けるべきアンチパターン。
- `VIS-001.md`, `ENG-002.md`: UI/UXの視覚標準やエンジニアリングに関する詳細規約。

### 🔄 ワークフロー (Workflows)

特定の業務を完遂するための手順化されたプロンプト/ステップです。

- `KICKOFF_FLOW.md`: プロジェクトの立ち上げと基盤構築。
- `PHASE_EXECUTION_FLOW.md`: 実装・検証・報告のサイクルを回す主要フロー。
- `CLOSING_FLOW.md`: プロジェクトの最終納品と完了評価。
- `EXTERNAL_FEEDBACK_FLOW.md`: ユーザー指摘をRCA（根本原因分析）し、基準更新とポータル同期を行うフィードバックフロー。
- `INTERNAL_INCIDENT_FLOW.md`: 内部で発見した不備を解決・記録するフロー。
- `DEVELOPMENT_FLOW.md`, `TEAM_BUILDING_FLOW.md`: チーム開発・構築用のフロー。

### 📦 テンプレート・スキル (Templates / Skills)

- `templates/`: 01〜05の管理ドキュメント等のひな形。
- `skills/`: 特定の技術課題を解決するためのベストプラクティス。

## 4. プロジェクト管理構造 (management/)

すべてのプロジェクトにおいて共通となる、不変の管理プロセス（01-05 マイルストーン）です。

- `01_Investigation/`, `01_Requirements/`: 要件調査・要件定義（成功の定義、技術スタック等）。
- `02_Planning/`: WBS、ガントチャート、リスク管理。
- `03_Implementation/`: 実装証跡、単体・結合テスト記録。
- `04_Delivery/`: 納品物一覧、物理監査、ユーザー受入証跡。
- `05_Evaluation/`: プロジェクト総括、チームの定性評価（KPT）。
- `09_Incidents/`: `ISSUE-xxx` 形式による不備・改善の全履歴（RCA/再発防止策）。
- `99_Portal/`: プロジェクトの進捗・履歴をリアルタイムに可視化する統合ダッシュボード。

## 5. プロダクト層 (product/)

各プロジェクト固有の成果物を格納するレイヤーです。

- **Source Code**: アプリケーション本体。
- **.env**: 秘密鍵、APIキー等の環境設定ファイル（Git管理外）。
- **tests/**: チーム標準の検証基準（`VERIFICATION_STANDARD.md`）を満たすための自動テスト資産。

## 6. 標準ディレクトリ構造 (The Team Standard)

```
[ProjectRoot]/
├── .agent/                  # チームの知能（ルール・ワークフロー・テンプレート）
│   ├── rules/               # 行動規範・検証基準
│   ├── workflows/           # 業務フロー（Kickoff〜Closing）
│   ├── templates/           # 各種ドキュメントテンプレート
│   └── skills/              # 技術的知見・ベストプラクティス
├── management/              # 不変の管理ドキュメント（01-05 ナンバリング）
│   ├── 01〜05_.../          # 各マイルストーン資産
│   ├── 09_Incidents/        # インシデント記録 (RCA)
│   └── 99_Portal/           # 統合ダッシュボード (HTML)
├── product/                 # プロジェクト固有の成果物
│   ├── [Apps]/              # ソースコード群
│   └── tests/               # Playwright等の検証資産
├── README.md                # チーム・ガバナンス定義書
└── .gitignore               # 追跡除外設定
```

## 7. 導入方法

新しいプロジェクトにおいて当チームの知能を有効化するには、本リポジトリの `.agent` フォルダをルートディレクトリに配置し、コマンド `/KICKOFF_FLOW` を起動してください。

---

**Philosophy**: Governance First, Systematic Solution, Full Fidelity.
