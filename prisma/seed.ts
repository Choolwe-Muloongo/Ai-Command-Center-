import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({ where: { email: "admin@internal.local" }, update: {}, create: { email: "admin@internal.local", password: "$2a$10$hashed", status: "ACTIVE", createdBy: "seed" } });
  const biz = await prisma.business.create({ data: { name: "Acme Rentals", status: "ACTIVE", createdBy: admin.id } });
  const branch = await prisma.branch.create({ data: { businessId: biz.id, name: "HQ", status: "ACTIVE", createdBy: admin.id } });
  await prisma.template.upsert({ where: { key: "tenant-rental" }, update: {}, create: { key: "tenant-rental", status: "ACTIVE", createdBy: admin.id, businessId: biz.id } });
  await prisma.role.createMany({ data: ["OWNER", "ADMIN", "MANAGER", "STAFF"].map((name) => ({ name, status: "ACTIVE", createdBy: admin.id, businessId: biz.id, branchId: branch.id })) });
}
main().finally(() => prisma.$disconnect());
