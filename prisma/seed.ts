import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@internal.local" },
    update: {
      name: "System Admin",
      status: "ACTIVE"
    },
    create: {
      email: "admin@internal.local",
      name: "System Admin",
      password: "$2a$10$hashed",
      status: "ACTIVE",
      createdBy: "seed"
    }
  });

  const template = await prisma.template.upsert({
    where: { key: "tenant-rental" },
    update: { status: "ACTIVE" },
    create: {
      key: "tenant-rental",
      status: "ACTIVE",
      createdBy: admin.id
    }
  });

  const business = await prisma.business.create({
    data: {
      name: "Acme Rentals",
      status: "ACTIVE",
      createdBy: admin.id
    }
  });

  const branch = await prisma.branch.create({
    data: {
      businessId: business.id,
      name: "HQ",
      status: "ACTIVE",
      createdBy: admin.id
    }
  });

  await prisma.user.update({
    where: { id: admin.id },
    data: { businessId: business.id, branchId: branch.id }
  });

  await prisma.role.createMany({
    data: ["OWNER", "ADMIN", "MANAGER", "STAFF"].map((name) => ({
      name,
      status: "ACTIVE",
      createdBy: admin.id,
      businessId: business.id,
      branchId: branch.id
    }))
  });

  const project = await prisma.project.create({
    data: {
      businessId: business.id,
      branchId: branch.id,
      templateId: template.id,
      name: "Tenant Rental Dashboard",
      status: "ACTIVE",
      createdBy: admin.id
    }
  });

  await prisma.activityLog.create({
    data: {
      businessId: business.id,
      branchId: branch.id,
      action: "SEED_DASHBOARD_CREATED",
      status: "ACTIVE",
      createdBy: admin.id
    }
  });

  await prisma.generatedSystem.create({
    data: {
      businessId: business.id,
      branchId: branch.id,
      projectId: project.id,
      status: "ACTIVE",
      createdBy: admin.id
    }
  });
}

main().finally(() => prisma.$disconnect());
