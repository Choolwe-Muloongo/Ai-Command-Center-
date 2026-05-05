import { AppRole, can } from "@packages/business-os-core";

export const packageName = "@packages/core-auth";

export const ensurePermission = (role: AppRole, permission: string) => {
  if (!can(role, permission)) throw new Error("Forbidden");
};

const ROLE_NORMALIZATION_MAP: Record<string, AppRole> = {
  owner: "owner",
  admin: "manager",
  manager: "manager",
  finance: "finance",
  staff: "staff",
  viewer: "viewer"
};

export const normalizeRole = (role: string | null | undefined): AppRole | null => {
  if (!role) return null;
  return ROLE_NORMALIZATION_MAP[role.toLowerCase()] ?? null;
};

export const requirePermission = (role: string | null | undefined, permission: string): AppRole => {
  const normalizedRole = normalizeRole(role);
  if (!normalizedRole) throw new Error("Forbidden");
  ensurePermission(normalizedRole, permission);
  return normalizedRole;
};
