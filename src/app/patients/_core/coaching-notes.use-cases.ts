
import { getCoachingNotesByPatientId, addCoachingNote, updateCoachingNote, deleteCoachingNote, getCoachingNote } from './coaching-notes.db';
import { CoachingNoteAddT, CoachingNoteUpdateT } from './patients.definitions';

export const getCoachingNotesByPatientIdUseCase = async (options: {patientId: string}) => {
  const response = await getCoachingNotesByPatientId(options);
  return response;
};

export const getCoachingNoteUseCase = async (options: { coachingNoteId: string }) => {
  const response = await getCoachingNote(options);

  return response;
};

export const addCoachingNoteUseCase = async (data: CoachingNoteAddT) => {
  const response = await addCoachingNote(data);

  return response;
};
export const updateCoachingNoteUseCase = async (data: CoachingNoteUpdateT) => {
  const response = await updateCoachingNote(data);

  return response;
};

export const deleteCoachingNoteUseCase = async (data: { coachingNoteId: string }) => {
  const response = await deleteCoachingNote(data);

  return response;
}


