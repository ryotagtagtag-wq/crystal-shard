import { NextResponse } from "next/server"
import { validateApplicationRequest } from "@/lib/security"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  const validationResult = await validateApplicationRequest(request)
  if (validationResult instanceof NextResponse) {
    return validationResult
  }
  const { application } = validationResult

  // 管理者認証チェック（実際の実装ではロールベースアクセス制御を追加）
  // ここでは概念説明のため簡略化
  
  const [totalUsers, totalPointsInCirculation, todayActiveUsers] = await Promise.all([
    // 総ユーザー数
    prisma.appUserBalance.count({
      where: { applicationId: application.id },
      distinct: ['userId'],
    }),
    // 流通中のポイント総量
    prisma.appUserBalance.aggregate({
      where: { applicationId: application.id },
      _sum: { balance: true },
    }),
    // 本日アクティブユーザー数（過去24時間以内に取引があるユーザー）
    prisma.user.count({
      where: {
        transactions: {
          some: {
            applicationId: application.id,
            createdAt: {
              gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
            },
          },
        },
      },
    }),
  ])

  return NextResponse.json({
    totalUsers,
    totalPointsInCirculation: totalPointsInCirculation._sum.balance || 0,
    todayActiveUsers,
  })
}
