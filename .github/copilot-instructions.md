## 要約
- 本リポジトリは MovieMinifier（frontend/backend）と InstantFileStorager（IFS）、共有コード `shared` で構成されています。

## 技術スタック（要点）
- Backend: Hono (TypeScript)
- Frontend: Nuxt.js (TypeScript)
- Runtime/Test/Package manager: Bun
- Infra: AWS（S3 を使用）

## 主なディレクトリ
- `dockerfile/` — Dockerfile 関連
- `packages/backend` — MovieMinifier バックエンド
- `packages/frontend` — MovieMinifier フロントエンド
- `packages/ifs` — InstantFileStorager (S3署名付きURL)
- `packages/shared` — 共通ユーティリティ / 型

## 開発チェックリスト（必須）
- `todo` ツールでタスクを登録・更新すること（必須）。
- 変更は小さく、可逆的に行う。差分は `apply_patch` で提出する。
- 変更に対するテストを用意し、ローカルで `bun test` を実行して結果を添える。
- セキュリティや権限に関わる操作はユーザー承認を必須とする。

## エージェント向け出力フォーマット（推奨）
- `changes`: 変更ファイル一覧（ファイルパスと要約）
- `patch` / `diff`: 主要なコード差分
- `tests`: 実行したテストとログ抜粋
- `run_instructions`: 確認用コマンド
- `notes`: 実装上の短い説明・トレードオフ

## 編集とレビュールール
- 1 つのプルリクまたはパッチは一つの目的に集中させる。
- ドキュメントや実行手順が必要な変更には短い README を添付する。
- 重大な設計変更は `j-planner` と合意を取ってから進める。
