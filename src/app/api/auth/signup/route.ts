import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = signupSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(validated.password, 12);

    const user = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        hashedPassword,
        role: validated.role as any,
      },
    });

    // Create freelancer profile if role is FREELANCER
    if (validated.role === "FREELANCER") {
      const isDataContributor = validated.specialization === "data_contributor";
      
      await prisma.freelancerProfile.create({
        data: {
          userId: user.id,
          isDataContributor,
        },
      });

      if (isDataContributor) {
        await prisma.contributorProfile.create({
          data: {
            userId: user.id,
          },
        });
      }
    }

    return NextResponse.json(
      { message: "Account created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
