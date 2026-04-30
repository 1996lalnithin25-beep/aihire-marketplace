import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      where: { status: "OPEN" },
      include: {
        client: { select: { name: true, image: true } },
        skills: true,
        campaign: true,
        _count: { select: { proposals: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, type, budgetMin, budgetMax, budgetType, duration, clientId, skillIds, campaign } = body;

    const job = await prisma.job.create({
      data: {
        title,
        description,
        type,
        budgetMin,
        budgetMax,
        budgetType,
        duration,
        clientId,
        skills: skillIds ? { connect: skillIds.map((id: string) => ({ id })) } : undefined,
      },
    });

    if (type === "DATA_COLLECTION" && campaign) {
      await prisma.dataCollectionCampaign.create({
        data: {
          jobId: job.id,
          clientId,
          ...campaign,
        },
      });
    }

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
