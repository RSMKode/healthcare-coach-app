import type { PrismaClient } from '@prisma/client';
// import type { PrismaClient } from '../generated/client'; // Adjust the import path as necessary

export const seedCoachingNotes = async (
  prisma: PrismaClient,
  patients: Record<string, any>
) => {
  const start = Date.now();
  console.log('Seeding coaching notes...');

  const { patient1, patient2, patient3, patient4, patient5, patient6 } =
    patients;

  const coachingNote1 = await prisma.coachingNote.create({
    data: {
      patientId: patient1.id,
      note: 'Encourage daily exercise and monitor blood sugar levels.',
    },
  });

  const coachingNote2 = await prisma.coachingNote.create({
    data: {
      patientId: patient2.id,
      note: 'Recommend a low-sodium diet and regular blood pressure checks.',
    },
  });

  const coachingNote3 = await prisma.coachingNote.create({
    data: {
      patientId: patient3.id,
      note: 'Advise using a peak flow meter to monitor asthma symptoms.',
    },
  });

  const coachingNote4 = await prisma.coachingNote.create({
    data: {
      patientId: patient4.id,
      note: 'Suggest physical therapy exercises to improve joint mobility.',
    },
  });

  const coachingNote5 = await prisma.coachingNote.create({
    data: {
      patientId: patient5.id,
      note: 'Recommend mindfulness techniques to manage anxiety.',
    },
  });

  const coachingNote6 = await prisma.coachingNote.create({
    data: {
      patientId: patient6.id,
      note: 'Encourage regular counseling sessions and self-care routines.',
    },
  });

  const coachingNote7 = await prisma.coachingNote.create({
    data: {
      patientId: patient1.id,
      note: 'Discuss meal planning strategies to maintain a balanced diet.',
    },
  });

  const coachingNote8 = await prisma.coachingNote.create({
    data: {
      patientId: patient2.id,
      note: 'Promote regular physical activity to support cardiovascular health.',
    },
  });

  const end = Date.now();
  console.log(`Seeding Patients completed in ${end - start}ms`);

  return {
    coachingNote1,
    coachingNote2,
    coachingNote3,
    coachingNote4,
    coachingNote5,
    coachingNote6,
    coachingNote7,
    coachingNote8,
  }
};
