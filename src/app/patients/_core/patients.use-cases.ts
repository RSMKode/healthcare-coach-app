import {
  addPatient,
  deletePatient,
  getPatient,
  getPatients,
  updatePatient,
} from './patients.db';
import { PatientAddT, PatientUpdateT } from './patients.definitions';

//? Here the use cases for patients are defined. These use cases are functions that encapsulate business logic and are responsible for calling the data access layer, where persistence is handled.

export const getPatientsUseCase = async (options: {
  page?: number;
  pageSize?: number;
  query?: string;
}) => {
  const response = await getPatients(options);
  return response;
};

export const getPatientByIdUseCase = async (options: { patientId: string }) => {
  const response = await getPatient(options);

  return response;
};

export const addPatientUseCase = async (data: PatientAddT) => {
  const response = await addPatient(data);

  return response;
};
export const updatePatientUseCase = async (data: PatientUpdateT) => {
  const response = await updatePatient(data);

  return response;
};

export const deletePatientUseCase = async (data: { patientId: string }) => {
  const response = await deletePatient(data);

  return response;
};
