import type { PrismaClient } from '@prisma/client';
// import type { PrismaClient } from '../generated/client'; // Adjust the import path as necessary

export const seedPatients = async (prisma: PrismaClient) => {
  const start = Date.now();
  console.log('Seeding patients...');

  const patient1 = await prisma.patient.create({
    data: {
      name: 'John Doe',
      age: 45,
      primaryCondition: 'Diabetes',
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Jane Smith',
      age: 38,
      primaryCondition: 'HBP',
    },
  });

  const patient3 = await prisma.patient.create({
    data: {
      name: 'Alice Johnson',
      age: 50,
      primaryCondition: 'Asthma',
    },
  });

  const patient4 = await prisma.patient.create({
    data: {
      name: 'Bob Brown',
      age: 60,
      primaryCondition: 'Arthritis',
    },
  });

  const patient5 = await prisma.patient.create({
    data: {
      name: 'Charlie Davis',
      age: 29,
      primaryCondition: 'Anxiety',
    },
  });

  const patient6 = await prisma.patient.create({
    data: {
      name: 'Diana Evans',
      age: 34,
      primaryCondition: 'Depression',
    },
  });

  const patient7 = await prisma.patient.create({
    data: {
      name: 'Ethan Foster',
      age: 42,
      primaryCondition: 'Obesity',
    },
  });

  const patient8 = await prisma.patient.create({
    data: {
      name: 'Fiona Green',
      age: 55,
      primaryCondition: 'Chronic Pain',
    },
  });

  const patient9 = await prisma.patient.create({
    data: {
      name: 'George Harris',
      age: 48,
      primaryCondition: 'Hypertension',
    },
  });

  const patient10 = await prisma.patient.create({
    data: {
      name: 'Hannah White',
      age: 37,
      primaryCondition: 'Migraines',
    },
  });

  const end = Date.now();
  console.log(`Seeding patients completed in ${end - start}ms`);

  return {
    patient1,
    patient2,
    patient3,
    patient4,
    patient5,
    patient6,
    patient7,
    patient8,
    patient9,
    patient10,
  };
};
