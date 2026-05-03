export type ActionKind = "use" | "download" | "docs" | "github";

export type ToolIcon =
  | { type: "image"; src: string; alt: string }
  | { type: "lucide"; name: "KeyRound" | "Mic" | "FileAudio" };

export type Action =
  | { kind: "use"; tool: "meeting-transcriber" | "keyprobe"; label: string }
  | { kind: "download"; label: string }
  | { kind: "docs" | "github"; label: string; href: string };

export type Tool = {
  id: "meeting-transcriber" | "voicekey" | "keyprobe";
  name: string;
  tagline: string;
  description: string;
  icon: ToolIcon;
  tech: string[];
  primary: Action;
  secondary: Action;
};

export const tools: Tool[] = [
  {
    id: "meeting-transcriber",
    name: "Meeting Transcriber",
    tagline: "会議音声を文字起こし＋AI要約",
    description:
      "音声ファイルを GPT-4o / Gemini で高精度に文字起こしし、要約・アクション抽出・チャットまで一気通貫で行える Web アプリ。",
    icon: {
      type: "image",
      src: "/icons/meeting-transcriber.svg",
      alt: "Meeting Transcriber",
    },
    tech: ["React 19", "FastAPI", "Whisper / Gemini"],
    primary: {
      kind: "use",
      tool: "meeting-transcriber",
      label: "使う",
    },
    secondary: {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/Tomato-1101/meeting-transcriber",
    },
  },
  {
    id: "voicekey",
    name: "Voicekey",
    tagline: "ホットキー音声入力（Win / Mac）",
    description:
      "ホットキー1つで音声を録音 → 文字起こしし、アクティブウィンドウへ自動入力するデスクトップ常駐アプリ。Silero VAD で無音をスキップ。",
    icon: {
      type: "image",
      src: "/icons/voicekey.png",
      alt: "Voicekey",
    },
    tech: ["Python", "PySide6", "OpenAI / Groq"],
    primary: {
      kind: "download",
      label: "ダウンロード",
    },
    secondary: {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/Tomato-1101/voicekey",
    },
  },
  {
    id: "keyprobe",
    name: "keyprobe",
    tagline: "API キー検出＋残高チェック",
    description:
      "汚いテキストから AI 系 API キーを正規表現で検出し、各プロバイダの残高を並列照会して USD 換算でランキング表示する。",
    icon: { type: "lucide", name: "KeyRound" },
    tech: ["Python", "FastAPI", "httpx"],
    primary: {
      kind: "use",
      tool: "keyprobe",
      label: "使う",
    },
    secondary: {
      kind: "github",
      label: "GitHub",
      href: "https://github.com/Tomato-1101/keyprobe",
    },
  },
];
