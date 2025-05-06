import {
  getCoachingNotesByPatientId,
  addCoachingNote,
  editCoachingNote,
  deleteCoachingNote,
  getCoachingNote,
} from './coaching-notes.services';
import {
  CoachingNoteAddT,
  CoachingNoteEditT,
} from './coaching-notes.definitions';

export const getCoachingNotesUseCase = async (options: {
  patientId: string;
}) => {
  const response = await getCoachingNotesByPatientId(options);
  return response;
};

export const getCoachingNoteUseCase = async (options: {
  coachingNoteId: string;
}) => {
  const response = await getCoachingNote(options);

  return response;
};

export const addCoachingNoteUseCase = async (data: CoachingNoteAddT) => {
  const response = await addCoachingNote(data);

  return response;
};
export const editCoachingNoteUseCase = async (data: CoachingNoteEditT) => {
  const response = await editCoachingNote(data);

  return response;
};

export const deleteCoachingNoteUseCase = async (data: {
  coachingNoteId: string;
}) => {
  const response = await deleteCoachingNote(data);

  return response;
};
