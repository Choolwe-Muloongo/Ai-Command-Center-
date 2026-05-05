import { can, AppRole } from "@packages/business-os-core";
export const ensurePermission = (role: AppRole, permission: string) => {
  if (!can(role, permission)) throw new Error("Forbidden");
};
