import { NextResponse } from "next/server"
import { validateApplicationRequest } from "@/lib/security"
import { prisma } from "@/lib/db"

export async function GET(request: Request) {
  const validationResult = await validateApplicationRequest(request)
  if (validationResult instanceof NextResponse) {
    return validationResult
  }
  const { application, userId } = validationResult

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
