import { prisma } from "@/lib/prisma";
import {
  type TenantScope,
  withBusinessAndBranchCreateData,
  withBusinessAndBranchScope,
  withBusinessScope
} from "@/lib/tenant-scope";

type ProjectCrudInput = TenantScope & {
  projectId?: string;
  templateId: string;
  name: string;
  createdBy: string;
};

export const projectCrud = {
  list: async (scope: TenantScope) => prisma.project.findMany({ where: withBusinessAndBranchScope(scope) }),
  create: async (input: ProjectCrudInput) => prisma.project.create({
    data: withBusinessAndBranchCreateData(input, {
      templateId: input.templateId,
      name: input.name,
      status: "GENERATED",
      createdBy: input.createdBy
    })
  }),
  createGeneratedSystem: async (scope: TenantScope & { projectId: string; createdBy: string }) => prisma.generatedSystem.create({
    data: withBusinessAndBranchCreateData(scope, {
      projectId: scope.projectId,
      status: "ACTIVE",
      createdBy: scope.createdBy
    })
  }),
  updateName: async (scope: TenantScope & { projectId: string; name: string }) => prisma.project.updateMany({
    where: withBusinessAndBranchScope(scope, { id: scope.projectId }),
    data: { name: scope.name }
  }),
  remove: async (scope: TenantScope & { projectId: string }) => prisma.project.deleteMany({
    where: withBusinessAndBranchScope(scope, { id: scope.projectId })
  })
};

export const reportsQueries = {
  activityByAction: async (scope: TenantScope) => prisma.activityLog.groupBy({
    by: ["action"],
    where: withBusinessAndBranchScope(scope),
    _count: { action: true }
  })
};

export const exportQueries = {
  projects: async (scope: TenantScope) => prisma.project.findMany({
    where: withBusinessAndBranchScope(scope),
    include: { template: true, generatedSystems: true }
  }),
  supportRequests: async (scope: TenantScope) => prisma.supportRequest.findMany({ where: withBusinessScope(scope) })
};

export const activityLogQueries = {
  list: async (scope: TenantScope) => prisma.activityLog.findMany({
    where: withBusinessAndBranchScope(scope),
    orderBy: { createdAt: "desc" }
  }),
  create: async (scope: TenantScope & { action: string; createdBy: string; entityType?: string; entityId?: string }) => prisma.activityLog.create({
    data: withBusinessAndBranchCreateData(scope, {
      action: scope.action,
      entityType: scope.entityType,
      entityId: scope.entityId,
      status: "ACTIVE",
      createdBy: scope.createdBy
    })
  })
};
