export type Scope = { businessId: string; branchId?: string };
export type AppRole = "OWNER" | "ADMIN" | "MANAGER" | "STAFF";

export const can = (role: AppRole, permission: string) => {
  const matrix: Record<AppRole, string[]> = {
    OWNER: ["*"],
    ADMIN: ["project:read", "project:write", "template:read", "tenant:write", "report:read"],
    MANAGER: ["project:read", "tenant:write", "report:read"],
    STAFF: ["project:read", "tenant:read"]
  };
  return matrix[role].includes("*") || matrix[role].includes(permission);
};

export const auditEvent = (actorId: string, action: string, scope: Scope) => ({ actorId, action, ...scope, at: new Date() });
