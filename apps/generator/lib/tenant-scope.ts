export type TenantScope = {
  businessId: string;
  branchId?: string | null;
};

const getRequiredBranchId = (scope: TenantScope): string => {
  if (!scope.branchId) {
    throw new Error("branchId is required for this operation.");
  }

  return scope.branchId;
};

export const withBusinessScope = <T extends Record<string, unknown>>(
  scope: TenantScope,
  where: T = {} as T
): T & { businessId: string } => ({
  ...where,
  businessId: scope.businessId
});

export const withBusinessAndBranchScope = <T extends Record<string, unknown>>(
  scope: TenantScope,
  where: T = {} as T
): T & { businessId: string; branchId: string } => ({
  ...where,
  businessId: scope.businessId,
  branchId: getRequiredBranchId(scope)
});

export const withBusinessCreateData = <T extends Record<string, unknown>>(
  scope: TenantScope,
  data: T
): T & { businessId: string } => ({
  ...data,
  businessId: scope.businessId
});

export const withBusinessAndBranchCreateData = <T extends Record<string, unknown>>(
  scope: TenantScope,
  data: T
): T & { businessId: string; branchId: string } => ({
  ...data,
  businessId: scope.businessId,
  branchId: getRequiredBranchId(scope)
});
