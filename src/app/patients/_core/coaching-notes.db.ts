'use server';

import { NotFoundError } from '@/lib/error.lib';
import { prisma } from '@/lib/prisma.lib';
import {
  coachingNoteAdapter,
  CoachingNoteAddT,
  CoachingNoteUpdateT,
} from './patients.definitions';

export const getCoachingNotesByPatientId = async (options: {
  patientId: string;
}) => {
  const { patientId } = options;
  const coachingNotes = await prisma.coachingNote.findMany({
    where: { patientId },
    orderBy: [{ createdAt: 'desc' }],
  });
  if (!coachingNotes.length) {
    throw new NotFoundError('No coaching notes found for this patient');
  }
  const parsedCoachingNotes = coachingNotes.map(coachingNoteAdapter);
  const message = 'Coaching notes retrieved successfully';
  return {
    message,
    data: parsedCoachingNotes,
  };
};

export const getCoachingNote = async (options: { coachingNoteId: string }) => {
  const { coachingNoteId } = options;
  const coachingNote = await prisma.coachingNote.findUnique({
    where: { id: coachingNoteId },
  });
  if (!coachingNote) {
    throw new NotFoundError('Coaching note not found');
  }
  const parsedCoachingNote = coachingNoteAdapter(coachingNote);
  const message = 'Coaching note retrieved successfully';
  return { message, data: parsedCoachingNote };
};

export const addCoachingNote = async (data: CoachingNoteAddT) => {
  let coachingNote;
  try {
    coachingNote = await prisma.coachingNote.create({
      data,
    });
  } catch (error) {
    const message = 'Failed to create coaching note';
    console.error(message, error);
    throw new Error(message);
  }
  const message = 'Coaching note created successfully';
  const parsedCoachingNote = coachingNoteAdapter(coachingNote);

  return { message, data: parsedCoachingNote };
};

export const updateCoachingNote = async (data: CoachingNoteUpdateT) => {
  let coachingNote;
  try {
    coachingNote = await prisma.coachingNote.update({
      where: { id: data.id },
      data,
    });
  } catch (error) {
    const message = 'Failed to update coaching note';
    console.error(message, error);
    throw new Error(message);
  }
  const message = 'Coaching note updated successfully';
  const parsedCoachingNote = coachingNoteAdapter(coachingNote);

  return { message, data: parsedCoachingNote };
};

export const deleteCoachingNote = async (data: { coachingNoteId: string }) => {
  let coachingNote;
  try {
    coachingNote = await prisma.coachingNote.delete({
      where: { id: data.coachingNoteId },
    });
  } catch (error) {
    const message = 'Failed to delete coaching note';
    console.error(message, error);
    throw new Error(message);
  }
  const message = 'Coaching note deleted successfully';
  const parsedCoachingNote = coachingNoteAdapter(coachingNote);

  return { message, data: parsedCoachingNote };
};
