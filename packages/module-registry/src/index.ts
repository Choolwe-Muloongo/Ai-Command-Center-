export type TemplateModule = {
  key: string;
  name: string;
  publicPages: string[];
  adminPages: string[];
  roles: string[];
  reports: string[];
  pdfDocuments: string[];
};

export const tenantRentalTemplate: TemplateModule = {
  key: "tenant-rental",
  name: "Tenant Rental System",
  publicPages: ["/", "/properties", "/apply"],
  adminPages: ["/admin/tenants", "/admin/properties", "/admin/leases"],
  roles: ["OWNER", "ADMIN", "MANAGER", "STAFF"],
  reports: ["occupancy", "rent-roll"],
  pdfDocuments: ["lease-agreement", "payment-receipt"]
};

export const templates = [tenantRentalTemplate];
