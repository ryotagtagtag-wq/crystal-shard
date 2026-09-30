// Vercel KV 使用のためのラッパー
// 実際の実装では @vercel/kv を使用しますが、ここでは概念を示します
// 本番環境では以下のようにインストールして使用:
// npm i @vercel/kv

// import { kv } from '@vercel/kv'
// export { kv }

// 開発・テスト用モック実装（実際のVercelデプロイ時は上記を有効にしてください）
let store = new Map()

export const kv = {
  async get(key: string) {
    return store.get(key) || null
  },
  async set(key: string, value: any, options?: { ex?: number }) {
    store.set(key, value)
    if (options?.ex) {
      setTimeout(() => store.delete(key), options.ex * 1000)
    }
    return true
  },
  async delete(key: string) {
    return store.delete(key)
  }
}
