import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const profile = await prisma.freelancerProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            email: true,
            createdAt: true,
            reviewsReceived: {
              select: { rating: true, comment: true, accuracyRating: true, createdAt: true, reviewer: { select: { name: true } } },
              orderBy: { createdAt: "desc" },
              take: 10,
            },
            contributorProfile: true,
          },
        },
        skills: true,
        portfolioItems: true,
      },
    });

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
