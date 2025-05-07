import { ApiResponseT } from '@/_shared/api.definitions';
import { handleResponseError } from '../../../../lib/error.lib';
import {
  addCoachingNoteAPI,
  deleteCoachingNoteAPI,
  editCoachingNoteAPI,
  getCoachingNoteAPI,
  getCoachingNotesByPatientIdAPI,
} from './coaching-notes.api';
import {
  CoachingNoteAddT,
  CoachingNoteEditT
} from './coaching-notes.definitions';


//? Here it simulates the call to the API, in a real application, this would be replaced by the actual API call
// import { getCoachingNotesByPatientIdAPI } from './coaching-notes.api';
export const getCoachingNotesByPatientId = async (options: {
  patientId: string;
}) => {
  const response = await getCoachingNotesByPatientIdAPI(options);
  handleResponseError(response as ApiResponseT);

  return response;
};

export const getCoachingNote = async (options: { coachingNoteId: string }) => {
  const response = await getCoachingNoteAPI(options);
  handleResponseError(response as ApiResponseT);

  return response;
};

export const addCoachingNote = async (data: CoachingNoteAddT) => {
  const response = await addCoachingNoteAPI(data);
  handleResponseError(response as ApiResponseT);

  return response;
};

export const editCoachingNote = async (data: CoachingNoteEditT) => {
  const response = await editCoachingNoteAPI(data);
  handleResponseError(response as ApiResponseT);

  return response;
};

export const deleteCoachingNote = async (data: { coachingNoteId: string }) => {
  const response = await deleteCoachingNoteAPI(data);
  handleResponseError(response as ApiResponseT);

  return response;
};
