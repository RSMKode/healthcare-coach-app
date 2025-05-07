import { PrismaClient } from '@prisma/client';
import { seedPatients } from './0_patients.seed';
import { seedCoachingNotes } from './1_coaching-notes.seed';

const prisma = new PrismaClient();

async function main() {
  const start = new Date();
  console.log('Seeding database...');

  try {
    // Clear existing data
    await prisma.coachingNote.deleteMany();
    await prisma.patient.deleteMany();
  } catch (error) {
    console.error('Error clearing data:', error);
  }

  const patientsRecord = await seedPatients(prisma);
  const coachingNotesRecord = await seedCoachingNotes(prisma, patientsRecord);

  const end = new Date();
  console.log(`Seeding completed: ${end.getTime() - start.getTime()}ms`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
