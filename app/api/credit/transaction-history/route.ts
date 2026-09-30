import { NextResponse } from "next/server"
import { validateApplicationRequest } from "@/lib/security"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  const validationResult = await validateApplicationRequest(request)
  if (validationResult instanceof NextResponse) {
    return validationResult
  }
  const { application, userId } = validationResult

  const { page = 1, limit = 20 } = Object.fromEntries(new URL(request.url).searchParams)

  const transactions = await prisma.transaction.findMany({
    where: {
      applicationId: application.id,
      userId: userId,
    },
    orderBy: { createdAt: 'desc' },
    skip: (parseInt(page) - 1) * parseInt(limit),
    take: parseInt(limit),
    select: {
      id: true,
      type: true,
      amount: true,
      reason: true,
      createdAt: true,
    },
  })

  const total = await prisma.transaction.count({
    where: {
      applicationId: application.id,
      userId: userId,
    },
  })

  return NextResponse.json({
    transactions,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
    },
  })
}
