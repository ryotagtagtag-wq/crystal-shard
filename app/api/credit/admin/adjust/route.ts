import { NextResponse } from "next/server"
import { validateApplicationRequest } from "@/lib/security"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  const validationResult = await validateApplicationRequest(request)
  if (validationResult instanceof NextResponse) {
    return validationResult
  }
  const { application } = validationResult

  // 管理者認証チェック（実際の実装ではロールベースアクセス制御を追加）
  // ここでは概念説明のため簡略化
  
  const { userId, amount, reason } = await request.json()
  
  // バリデーション
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }
  if (amount === 0) {
    return NextResponse.json({ error: "Amount must not be zero" }, { status: 400 })
  }
  if (!reason || typeof reason !== 'string') {
    return NextResponse.json({ error: "Invalid reason" }, { status: 400 })
  }
  if (Math.abs(amount) > 50000) { // 例: 管理者調整の上限
    return NextResponse.json({ error: "Adjustment amount too large" }, { status: 400 })
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 残高更新または作成
      const balance = await tx.appUserBalance.upsert({
        where: {
          applicationId_userId: {
            applicationId: application.id,
            userId: userId,
          },
        },
        update: { balance: { increment: amount } },
        create: {
          applicationId: application.id,
          userId: userId,
          balance: Math.max(0, amount), // 初期残高は0以上に制限
        },
      })

      // 取引記録
      const transaction = await tx.transaction.create({
        data: {
          applicationId: application.id,
          userId: userId,
          type: "ADMIN_ADJUST",
          amount,
          reason,
        },
      })

      return { 
        newBalance: balance.balance, 
        transactionId: transaction.id,
        adjustment: amount > 0 ? "awarded" : "deducted"
      }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Admin adjust error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
