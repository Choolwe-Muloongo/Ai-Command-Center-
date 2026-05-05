export type Scope = { businessId: string; branchId?: string };
export type AppRole = "owner" | "manager" | "finance" | "staff" | "viewer";

export const can = (role: AppRole, permission: string) => {
  const matrix: Record<AppRole, string[]> = {
    owner: ["*"],
    manager: ["project:read", "project:write", "template:read", "tenant:write", "report:read"],
    finance: ["project:read", "report:read", "finance:read", "finance:write"],
    staff: ["project:read", "tenant:read"],
    viewer: ["project:read", "tenant:read", "template:read", "report:read", "finance:read"]
  };
  return matrix[role].includes("*") || matrix[role].includes(permission);
};

export const auditEvent = (actorId: string, action: string, scope: Scope) => ({ actorId, action, ...scope, at: new Date() });
