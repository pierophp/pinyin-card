import { PrismaClient } from "@prisma/client";
let prismaClient: PrismaClient | null = null;
export function getPrisma() {
  if (prismaClient) {
    return prismaClient;
  }

  prismaClient = new PrismaClient();
  return prismaClient;
}
