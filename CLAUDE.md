# CLAUDE.md — Claude Code の作業指針

## 目的

tomato が個人で作ったツール（voicekey / Meeting Transcriber / keyprobe 等）を 1 か所に集めた
ポータルサイト。「ブラウザでそのまま使う / OS 別バイナリをダウンロードする」ための入口を提供する。
公開 URL: https://myprojects-portal.vercel.app（Vercel ホスト）。

## スタック

- Next.js 16（App Router、`app/` 構成）+ React 19 + TypeScript。
- Tailwind CSS v4 + shadcn/ui（`components/ui`）+ radix-ui + lucide-react。
- 主要ファイル: `app/page.tsx`（トップ）、`app/use/[tool]/`（ツール利用・パスワードゲート）、
  `lib/tools.ts`（ツール定義）、`lib/auth.ts`（認証）。

## dev / build コマンド

```
npm run dev     # 開発サーバ（next dev）
npm run build   # 本番ビルド（next build）
npm run start   # ビルド済みを起動 / npm run lint（eslint）
```

## 注意点

- **フォルダ名 `Myprojects` は歴史的経緯で、実体は `myprojects-portal` という単一 Next.js アプリ**
  （`package.json` の name・git remote・公開 URL すべて `myprojects-portal`）。
- Next.js 16 は破壊的変更が多い。実装前に `AGENTS.md`（＝Next.js の警告）と
  `node_modules/next/dist/docs/` の該当ガイドを読むこと。訓練データの旧 API を前提にしない。
- コメント・ドキュメントは日本語。最小差分で直す（Simplicity First）。
