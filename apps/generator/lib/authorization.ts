import { requirePermission } from "@packages/core-auth";
import { prisma } from "./prisma";

export const ensurePermission = (role: string | null | undefined, permission: string) => {
  requirePermission(role, permission);
};

export const getCurrentUserRole = async (userId: string) => {
  const assignment = await prisma.userRole.findFirst({
    where: { userId, status: "ACTIVE" },
    include: { role: true },
    orderBy: { createdAt: "asc" }
  });

  return assignment?.role.name ?? null;
};
