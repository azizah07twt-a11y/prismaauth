import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const adapter = new PrismaMariaDb({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD || "",
  database: "db_prisma_auth",
  port: 3306,
});

const globalForPrisma = globalThis as unknown as {
  prismaDb: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prismaDb ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaDb = prisma;
}