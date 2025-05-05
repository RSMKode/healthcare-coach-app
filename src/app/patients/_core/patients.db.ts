"use server"

import { NotFoundError } from '@/lib/error';
import { getPaginatedResults } from '@/lib/pagination';
import { prisma } from '@/lib/prisma';
import { normalizeString } from '@/lib/utils';

export const getPatients = async (options: {
  page?: number;
  pageSize?: number;
  query?: string;
}) => {
  const { page = 1, pageSize = 20, query } = options;
  console.log({options})

  // delay(1000);

  const patients = await prisma.patient.findMany({
    orderBy: [{ name: 'desc' }],
  });
  if (!patients.length) throw new NotFoundError('No patients found');

  // Text fields created by Prisma Client in SQLite databases do not support case-insensitive filtering.
  const filteredPatients = query
    ? patients.filter(patient => {
        normalizeString(patient.name).includes(normalizeString(query));
      })
    : patients;
    console.log({filteredPatients})

  const paginatedPatients = getPaginatedResults(filteredPatients, {
    page,
    pageSize,
  });
  return paginatedPatients;
};

export const getPatientById = async (id: string) => {
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: { coachingNotes: true },
  });
  if (!patient) {
    throw new NotFoundError('Patient not found');
  }
  return patient;
};

export const getCoachingNotesByPatientId = async (patientId: string) => {
  const coachingNotes = await prisma.coachingNote.findMany({
    where: { patientId },
    orderBy: [{ createdAt: 'desc' }],
  });
  if (!coachingNotes.length) {
    throw new NotFoundError('No coaching notes found for this patient');
  }
  return coachingNotes;
}
