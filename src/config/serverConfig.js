import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
const prisma = new PrismaClient();
export const PORT = process.env.port || 8000
export default prisma;