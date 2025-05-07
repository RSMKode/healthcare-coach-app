'use server';

import { delay } from '@/lib/helpers.lib';
import { getPaginatedResults } from '@/lib/pagination.lib';
import { prisma } from '@/lib/prisma.lib';
import { normalizeString } from '@/lib/utils';
import {
  patientAdapter,
  PatientAddT,
  PatientEditT,
} from './patients.definitions';

export const getPatientsAPI = async (options: {
  page?: number;
  pageSize?: number;
  query?: string;
}) => {
  await delay(500);
  const { page = 1, pageSize = 20, query } = options;

  const patients = await prisma.patient.findMany({
    orderBy: [{ name: 'desc' }],
  });

  if (!patients.length) {
    return {
      status: 204,
      message: 'No patients found',
      data: null,
    };
  }

  const parsedPatients = patients.map(patientAdapter) ?? [];

  const filteredPatients = query
    ? parsedPatients.filter(
        patient =>
          normalizeString(patient.name).includes(normalizeString(query)) ||
          normalizeString(patient.age.toString()).includes(
            normalizeString(query)
          ) ||
          normalizeString(patient.primaryCondition ?? '').includes(
            normalizeString(query)
          )
      )
    : parsedPatients;

  if (!filteredPatients.length) {
    return {
      status: 204,
      message: 'No patients found with this query',
      data: null,
    };
  }

  const paginatedPatients = getPaginatedResults(filteredPatients, {
    page,
    pageSize,
  });

  return {
    status: 200,
    message: 'Patients retrieved successfully',
    data: paginatedPatients,
  };
};

export const getPatientAPI = async (options: { patientId: string }) => {
  await delay(500);

  const { patientId } = options;
  const patient = await prisma.patient.findUnique({
    where: { id: patientId },
    include: { coachingNotes: true },
  });

  if (!patient) {
    return {
      status: 204,
      message: 'Patient not found',
      data: null,
    };
  }

  const parsedPatient = patientAdapter(patient);

  return {
    status: 200,
    message: 'Patient retrieved successfully',
    data: parsedPatient,
  };
};

export const addPatientAPI = async (data: PatientAddT) => {
  await delay(500);

  try {
    const patient = await prisma.patient.create({ data });
    const parsedPatient = patientAdapter(patient);

    return {
      status: 201,
      message: 'Patient created successfully',
      data: parsedPatient,
    };
  } catch (error) {
    console.error('Failed to create patient', error);
    return {
      status: 500,
      message: 'Failed to create patient',
      data: null,
    };
  }
};

export const editPatientAPI = async (data: PatientEditT) => {
  await delay(500);

  try {
    const patient = await prisma.patient.update({
      where: { id: data.id },
      data,
    });
    const parsedPatient = patientAdapter(patient);

    return {
      status: 200,
      message: 'Patient updated successfully',
      data: parsedPatient,
    };
  } catch (error) {
    console.error('Failed to update patient', error);
    return {
      status: 500,
      message: 'Failed to update patient',
      data: null,
    };
  }
};

export const deletePatientAPI = async (data: { patientId: string }) => {
  await delay(500);

  const { patientId } = data;

  try {
    await prisma.coachingNote.deleteMany({
      where: { patientId },
    });

    const patient = await prisma.patient.delete({
      where: { id: patientId },
    });
    const parsedPatient = patientAdapter(patient);

    return {
      status: 200,
      message: 'Patient deleted successfully',
      data: parsedPatient,
    };
  } catch (error) {
    console.error('Failed to delete patient', error);
    return {
      status: 500,
      message: 'Failed to delete patient',
      data: null,
    };
  }
};