# myprojects-portal

tomato が個人で作ったツールを 1 か所にまとめたポータルサイト。

**🌐 公開 URL: https://myprojects-portal.vercel.app**

## 載せているツール

| ツール | 種類 | リンク |
|---|---|---|
| **Meeting Transcriber** | Web (React + FastAPI) | https://github.com/Tomato-1101/meeting-transcriber |
| **WhisperWin** | デスクトップ (Python + PySide6) | https://github.com/Tomato-1101/WhisperWin |
| **keyprobe** | ローカル専用 Web (FastAPI) | https://github.com/Tomato-1101/keyprobe |

## 技術スタック

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 + shadcn/ui
- ダーク基調 + Violet アクセント
- Vercel デプロイ

## 開発

```bash
npm install
npm run dev   # http://localhost:3000
```

## デプロイ

```bash
git push origin main          # GitHub に push
npx vercel --prod --yes       # Vercel に本番デプロイ
```

ツールを追加するときは `lib/tools.ts` に項目を足し、必要ならアイコンを `public/icons/` に置く。
