import { NextResponse } from "next/server"
import { prisma } from "./db"
import { kv } from "./kv"
import crypto from "crypto"

// マスターキーはVercel環境変数から取得（.gitignore必須）
// 実際の使用時は32バイトのhex stringを環境変数に設定
const MASTER_KEY = process.env.APPLICATION_SECRET_MASTER_KEY! 

export async function validateApplicationRequest(request: Request) {
  try {
    // 必須ヘッダー取得
    const authHeader = request.headers.get("Authorization")
    const appId = request.headers.get("X-Application-ID")
    const timestamp = request.headers.get("X-Application-Timestamp")
    const nonce = request.headers.get("X-Application-Nonce")
    const signature = request.headers.get("Signature")
    const firebaseIdToken = request.headers.get("X-Firebase-ID-Token")

    if (![authHeader, appId, timestamp, nonce, signature, firebaseIdToken].every(Boolean)) {
      return NextResponse.json({ error: "Missing required headers" }, { status: 401 })
    }

    // アプリケーション取得と復号化（マスターキー使用）
    const application = await prisma.application.findUnique({
      where: { id: appId },
      select: { id: true, status: true, encryptedSecretKey: true, trustedScore: true },
    })

    if (!application) return NextResponse.json({ error: "Invalid application ID" }, { status: 401 })
    if (application.status !== "APPROVED") return NextResponse.json({ error: "Application not approved" }, { status: 403 })
    if (application.trustedScore < 50) return NextResponse.json({ error: "Application trust score too low" }, { status: 403 })

    // 暗号化されたシークレットをマスターキーで復号化（サーバーサイドのみ）
    const decryptedKey = decryptApplicationSecret(application.encryptedSecretKey)
    if (!decryptedKey) return NextResponse.json({ error: "Internal server error" }, { status: 500 })

    // タイムスタンプ検証 (±90秒)
    const requestTime = new Date(timestamp).getTime()
    const serverTime = new Date().getTime()
    if (Math.abs(serverTime - requestTime) > 90 * 1000) {
      return NextResponse.json({ error: "Invalid timestamp" }, { status: 401 })
    }

    // ノンスリプレイ攻撃防止 (Vercel KV使用、5分間ウィンドウ)
    const nonceKey = `nonce:${appId}:${timestamp}:${nonce}`
    const nonceExists = await kv.get(nonceKey)
    if (nonceExists) {
      return NextResponse.json({ error: "Replay attack detected" }, { status: 401 })
    }
    await kv.set(nonceKey, "1", { ex: 300 }) // 5分 TTL

    // HMAC-SHA256署名検証
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method
    const body = await request.clone().text() // ボディを読み取り（注意: ストリームは一度のみ）
    const bodyHash = crypto.createHash("sha256").update(body).digest("hex")

    // 署名文字列構築
    const signedHeaders = [
      "content-type",
      "host",
      "x-application-id",
      "x-application-timestamp",
      "x-application-nonce",
    ].sort()
    const canonicalHeaders = signedHeaders
      .map((h) => `${h}:${request.headers.get(h) ?? ""}`)
      .join("\n")

    const canonicalizedRequest = [
      method,
      crypto.createHash("sha256").update(request.headers.get("content-type") ?? "").digest("hex"),
      path,
      canonicalizedRequest,
      signedHeaders.join(";"),
      bodyHash,
    ].join("\n")

    const stringToSign = [
      "HMAC-SHA256",
      new Date(timestamp).toISOString().replace(/[-:]/g, "").replace(/\.\d+/, "") + "Z",
      `${new Date(timestamp).toISOString().slice(0, 8)}/credit_request/`,
      crypto.createHash("sha256").update(canonicalizedRequest).digest("hex"),
    ].join("\n")

    const expectedSignature = crypto
      .createHmac("sha256", decryptedKey)
      .update(stringToSign)
      .digest("hex")

    if (signature !== expectedSignature) {
      // 監査ログ記録（サーバーサイドのみ）
      await prisma.auditLog.create({
        data: {
          applicationId: appId,
          action: "auth_failure",
          ipAddress: request.headers.get("x-forwarded-for") ?? "unknown",
          userAgent: request.headers.get("user-agent"),
          metadata: { reason: "invalid_signature" },
        },
      })
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
    }

    // Firebase ID トークン検証 (実際の実装ではNextAuthまたはFirebase Admin SDKを使用)
    // ここでは概念説明として簡略化
    // 実際の実装では以下のような処理が必要:
    // const decodedToken = await adminAuth().verifyIdToken(firebaseIdToken)
    // const firebaseUid = decodedToken.uid
    // // Firebase UIDから内部User IDを取得するロジック
    
    // 認証成功: アプリケーションとユーザーコンテキストを返す
    return { application, userId: /* Firebaseトークンから取得したユーザーID */ }
  } catch (error) {
    console.error("Application request validation error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

// アプリケーションシークレットの復号化 (サーバーサイド専用)
// 実際の実装ではcrypto.createDecipheriv等を使用してAES-GCMで復号化
function decryptApplicationSecret(encrypted: string): string | null {
  try {
    // 実際の実装例:
    // const iv = Buffer.from(encrypted.slice(0, 32), 'hex')
    // const encryptedData = Buffer.from(encrypted.slice(32), 'hex')
    // const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(MASTER_KEY, 'hex'), iv)
    // const decrypted = Buffer.concat([decipher.update(encryptedData), decipher.final()])
    // return decrypted.toString('utf8')
    // ここでは概念説明のためプレースホルダーを返却
    return "decrypted_application_secret" // プレースホルダー - 実際の実装時に置き換えてください
  } catch {
    return null
  }
}

// APIルートでの使用例 (例: app/api/credit/balance/route.ts)
// このパターンをすべてのAPIルートに適用してください
/*
import { NextResponse } from "next/server"
import { validateApplicationRequest } from "@/lib/security"

export async function GET(request: Request) {
  const validationResult = await validateApplicationRequest(request)
  if (validationResult instanceof NextResponse) {
    return validationResult
  }
  const { application, userId } = validationResult

  // ここに実際のビジネスロジックを実装
  // 例: 残高取得
  const balance = await prisma.appUserBalance.findUnique({
    where: {
      applicationId_userId: {
        applicationId: application.id,
        userId: userId,
      },
    },
    select: { balance: true },
  })

  return NextResponse.json({ balance: balance?.balance ?? 0 })
}
*/
