import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ensurePermission, getCurrentUserRole } from "@/lib/authorization";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const role = await getCurrentUserRole(session.user.id);
  try {
    ensurePermission(role, "project:write");
  } catch {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const payload = await req.json();
  const project = await prisma.project.create({
    data: {
      businessId: payload.businessId,
      branchId: payload.branchId,
      templateId: payload.templateId,
      name: payload.name,
      status: "GENERATED",
      createdBy: session.user.id
    }
  });

  await prisma.generatedSystem.create({
    data: {
      businessId: payload.businessId,
      branchId: payload.branchId,
      projectId: project.id,
      status: "ACTIVE",
      createdBy: session.user.id
    }
  });

  return NextResponse.json({ project });
}
