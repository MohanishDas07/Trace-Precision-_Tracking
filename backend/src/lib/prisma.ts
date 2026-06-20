import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Vercel Serverless environment makes the project root read-only.
// If we are on Vercel, we must copy the SQLite DB to the writable /tmp directory.
if (process.env.VERCEL) {
  const sourceDb = path.join(process.cwd(), 'prisma/dev.db');
  const targetDb = '/tmp/dev.db';
  
  try {
    if (!fs.existsSync(targetDb) && fs.existsSync(sourceDb)) {
      fs.copyFileSync(sourceDb, targetDb);
    }
    process.env.DATABASE_URL = "file:/tmp/dev.db";
  } catch (e) {
    console.error("Failed to copy DB to /tmp", e);
  }
}

const prisma = new PrismaClient();

export default prisma;
