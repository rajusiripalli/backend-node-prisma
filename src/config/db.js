import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../../src/generated/prisma/client.ts";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "info", "warn", "error"] : ["error"],

});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Database connected via Prisma");
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
};

const disconnectDB = async () => {
        await prisma.$disconnect();
};

export {prisma, connectDB, disconnectDB};

