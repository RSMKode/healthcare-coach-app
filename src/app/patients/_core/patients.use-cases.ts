import { getPatientById, getPatients } from './patients.db';

//? Here the use cases for patients are defined. These use cases are functions that encapsulate business logic and are responsible for calling the data access layer, where persistence is handled.

export const getPatientsUseCase = async (options: {
  page?: number;
  pageSize?: number;
  query?: string;
}) => {
  const response = await getPatients(options);
  return response;
};

export const getPatientByIdUseCase = (options: { patientId: string }) => {
  const { patientId } = options;
  const response = getPatientById(patientId);

  return response;
};
