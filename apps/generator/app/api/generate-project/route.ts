import { NextResponse } from "next/server";
import { activityLogQueries, projectCrud } from "@/lib/data-access";

export async function POST(req: Request) {
  const payload = await req.json();

  const project = await projectCrud.create({
    businessId: payload.businessId,
    branchId: payload.branchId,
    templateId: payload.templateId,
    name: payload.name,
    createdBy: payload.createdBy
  });

  await projectCrud.createGeneratedSystem({
    businessId: payload.businessId,
    branchId: payload.branchId,
    projectId: project.id,
    createdBy: payload.createdBy
  });

  await activityLogQueries.create({
    businessId: payload.businessId,
    branchId: payload.branchId,
    action: "project.generated",
    entityType: "Project",
    entityId: project.id,
    createdBy: payload.createdBy
  });

  return NextResponse.json({ project });
}
