import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();
  const project = await prisma.project.create({
    data: {
      businessId: payload.businessId,
      branchId: payload.branchId,
      templateId: payload.templateId,
      name: payload.name,
      status: "GENERATED",
      createdBy: payload.createdBy
    }
  });
  await prisma.generatedSystem.create({ data: { businessId: payload.businessId, branchId: payload.branchId, projectId: project.id, status: "ACTIVE", createdBy: payload.createdBy } });
  return NextResponse.json({ project });
}
