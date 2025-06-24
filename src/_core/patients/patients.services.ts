'use server';

import { addPatientAPI, deletePatientAPI, editPatientAPI, getPatientAPI, getPatientsAPI } from '@/app/_api/patients/patients.api';
import { handleResponseError } from '@/lib/error.lib';
import { ApiResponseT } from '../_shared/api.definitions';
import {
  PatientAddT,
  PatientEditT
} from './patients.definitions';

//? Here it simulates the call to the API, in a real application, this would be replaced by the actual API call

export const getPatients = async (options: {
  page?: number;
  pageSize?: number;
  query?: string;
}) => {
  const response = await getPatientsAPI(options);
  handleResponseError(response as ApiResponseT);

  return response;
};

export const getPatient = async (options: { patientId: string }) => {
  const response = await getPatientAPI(options);
  handleResponseError(response as ApiResponseT);

  return response;
};

export const addPatient = async (data: PatientAddT) => {
  const response = await addPatientAPI(data);
  handleResponseError(response as ApiResponseT);

  return response;
};
export const editPatient = async (data: PatientEditT) => {
  const response = await editPatientAPI(data);
  handleResponseError(response as ApiResponseT);

  return response;
};

export const deletePatient = async (data: { patientId: string }) => {
  const response = await deletePatientAPI(data);
  handleResponseError(response as ApiResponseT);

  return response;
};
