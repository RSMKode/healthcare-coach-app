'use server';

import { NotFoundError } from '@/lib/error.lib';
import { delay } from '@/lib/helpers.lib';
import { getPaginatedResults } from '@/lib/pagination.lib';
import { prisma } from '@/lib/prisma.lib';
import { normalizeString } from '@/lib/utils';
import {
  patientAdapter,
  PatientAddT,
  PatientEditT,
} from './patients.definitions';

export const getPatients = async (options: {
  page?: number;
  pageSize?: number;
  query?: string;
}) => {
  await delay(500);
  const { page = 1, pageSize = 20, query } = options;

  const patients = await prisma.patient.findMany({
    orderBy: [{ name: 'desc' }],
  });
  if (!patients.length) throw new NotFoundError('No patients found');

  const parsedPatients = patients.map(patientAdapter) ?? [];

  // Text fields created by Prisma Client in SQLite databases do not support case-insensitive filtering.
  const filteredPatients = query
    ? parsedPatients.filter(patient =>
        normalizeString(patient.name).includes(normalizeString(query))
      )
    : parsedPatients;
  console.log({ filteredPatients });
  if (!filteredPatients.length) {
    throw new NotFoundError('No patients found with this query');
  }
  console.log({ filteredPatients });

  const paginatedPatients = getPaginatedResults(filteredPatients, {
    page,
    pageSize,
  });
  const message = 'Patients retrieved successfully';
  return { message, data: paginatedPatients };
};

export const getPatient = async (options: { patientId: string }) => {
  await delay(500);

  const { patientId } = options;
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: { coachingNotes: true },
  });
  if (!patient) {
    throw new NotFoundError('Patient not found');
  }
  const message = 'Patient retrieved successfully';
  const parsedPatient = patientAdapter(patient);
  return { message, data: parsedPatient };
};

export const addPatient = async (data: PatientAddT) => {
  await delay(500);

  // const existingPatient = await prisma.patient.findUnique({
  //   where: { id: data.name },
  // });
  // if (existingPatient) throw new Error('Patient already exists');

  let patient;
  try {
    patient = await prisma.patient.create({ data });
  } catch (error) {
    const message = 'Failed to create patient';
    console.error(message, error);
    throw new Error(message);
  }
  const message = 'Patient created successfully';
  const parsedPatient = patientAdapter(patient);

  return { message, data: parsedPatient };
};
export const editPatient = async (data: PatientEditT) => {
  await delay(500);

  let patient;
  try {
    patient = await prisma.patient.update({
      where: { id: data.id },
      data,
    });
  } catch (error) {
    const message = 'Failed to update patient';
    console.error(message, error);
    throw new Error(message);
  }
  const message = 'Patient updated successfully';
  const parsedPatient = patientAdapter(patient);

  return { message, data: parsedPatient };
};

export const deletePatient = async (data: { patientId: string }) => {
  await delay(500);

  const { patientId } = data;
  let patient;
  try {
    await prisma.coachingNote.deleteMany({
      where: { patientId },
    });
    // await prisma.coachingNote.deleteMany({
    patient = await prisma.patient.delete({
      where: { id: patientId },
    });
  } catch (error) {
    const message = 'Failed to delete patient';
    console.error(message, error);
    throw new Error(message);
  }
  const message = 'Patient deleted successfully';
  const parsedPatient = patientAdapter(patient);

  return { message, data: parsedPatient };
};
