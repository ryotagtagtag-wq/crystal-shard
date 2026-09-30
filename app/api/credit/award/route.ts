import { NextResponse } from "next/server"
import { validateApplicationRequest } from "@/lib/security"
import { prisma } from "@/lib/db"
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const validationResult = await validateApplicationRequest(request)
  if (validationResult instanceof NextResponse) {
    return validationResult
  }
  const { application, userId } = validationResult

  const { amount, reason } = await request.json()
  
  // バリデーション
  if (!amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
  }
  if (!reason || typeof reason !== 'string') {
    return NextResponse.json({ error: "Invalid reason" }, { status: 400 })
  }
  if (amount > 10000) { // 例: 1回あたりの上限
    return NextResponse.json({ error: "Amount too large" }, { status: 400 })
  }

  const idempotencyKey = uuidv4()

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
          balance: amount,
        },
      })

      // 取引記録
      const transaction = await tx.transaction.create({
        data: {
          applicationId: application.id,
          userId: userId,
          type: "AWARD",
          amount,
          reason,
          idempotencyKey,
        },
      })

      return { balance: balance.balance, transactionId: transaction.id }
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error("Award error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
