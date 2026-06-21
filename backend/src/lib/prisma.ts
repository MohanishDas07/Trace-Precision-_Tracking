import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { dbBase64 } from './dbBase64';

// Vercel Serverless environment makes the project root read-only.
// If we are on Vercel, we copy the base64-encoded SQLite DB to the writable /tmp directory.
if (process.env.VERCEL) {
  const targetDb = '/tmp/dev.db';
  
  try {
    if (!fs.existsSync(targetDb)) {
      fs.writeFileSync(targetDb, Buffer.from(dbBase64, 'base64'));
    }
    process.env.DATABASE_URL = "file:/tmp/dev.db";
  } catch (e) {
    console.error("Failed to write DB to /tmp", e);
  }
}

const prisma = new PrismaClient();

export default prisma;
