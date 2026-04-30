import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const profiles = await prisma.freelancerProfile.findMany({
      include: {
        user: { select: { name: true, image: true } },
        skills: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(profiles);
  } catch (error) {
    // Return empty array when DB is unavailable (demo mode)
    return NextResponse.json([]);
  }
}
