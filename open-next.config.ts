import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Next.js を Cloudflare Workers 上で動かすためのアダプタ設定。
// キャッシュは既定（インメモリ）のまま。ポータルは Server Actions の
// 認証だけで永続キャッシュを必要としないため、KV / R2 は繋いでいない。
export default defineCloudflareConfig();
