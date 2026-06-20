/**
 * Seed Script
 * 
 * Populates the ActionLibrary table with the master list of
 * reduction challenges from the Action Engine.
 * 
 * Run with: npx ts-node src/seed.ts
 */

import prisma from './lib/prisma';
import { ACTION_LIBRARY } from './engine/actionEngine';

async function main() {
  console.log('🌱 Seeding Action Library...\n');

  for (const action of ACTION_LIBRARY) {
    const existing = await prisma.action.findFirst({
      where: { title: action.title },
    });

    if (!existing) {
      await prisma.action.create({ data: action });
      console.log(`  ✓ Created: ${action.title}`);
    } else {
      console.log(`  – Skipped (exists): ${action.title}`);
    }
  }

  console.log('\n✅ Seeding complete.');
}

main()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
