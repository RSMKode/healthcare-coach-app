'use server';

import { prisma } from '@/lib/prisma.lib';

import { delay } from '@/lib/helpers.lib';
import { coachingNoteAdapter, CoachingNoteAddT, CoachingNoteEditT } from '@/_core/coaching-notes/coaching-notes.definitions';

export const getCoachingNotesByPatientIdAPI = async (options: {
  patientId: string;
}) => {
  await delay(300);

  const { patientId } = options;
  const coachingNotes = await prisma.coachingNote.findMany({
    where: { patientId },
    orderBy: [{ createdAt: 'desc' }],
  });

  if (!coachingNotes.length) {
    return {
      status: 204,
      message: 'No coaching notes found for this patient',
      data: null,
    };
  }

  const parsedCoachingNotes = coachingNotes.map(coachingNoteAdapter);
  return {
    status: 200,
    message: 'Coaching notes retrieved successfully',
    data: parsedCoachingNotes,
  };
};

export const getCoachingNoteAPI = async (options: { coachingNoteId: string }) => {
  await delay(300);

  const { coachingNoteId } = options;
  const coachingNote = await prisma.coachingNote.findUnique({
    where: { id: coachingNoteId },
  });

  if (!coachingNote) {
    return {
      status: 204,
      message: 'Coaching note not found',
      data: null,
    };
  }

  const parsedCoachingNote = coachingNoteAdapter(coachingNote);
  return {
    status: 200,
    message: 'Coaching note retrieved successfully',
    data: parsedCoachingNote,
  };
};

export const addCoachingNoteAPI = async (data: CoachingNoteAddT) => {
  await delay(300);

  try {
    const coachingNote = await prisma.coachingNote.create({
      data,
    });
    const parsedCoachingNote = coachingNoteAdapter(coachingNote);
    return {
      status: 201,
      message: 'Coaching note created successfully',
      data: parsedCoachingNote,
    };
  } catch (error) {
    console.error('Failed to create coaching note', error);
    return {
      status: 500,
      message: 'Failed to create coaching note',
      data: null,
    };
  }
};

export const editCoachingNoteAPI = async (data: CoachingNoteEditT) => {
  await delay(300);

  try {
    const coachingNote = await prisma.coachingNote.update({
      where: { id: data.id },
      data,
    });
    const parsedCoachingNote = coachingNoteAdapter(coachingNote);
    return {
      status: 200,
      message: 'Coaching note updated successfully',
      data: parsedCoachingNote,
    };
  } catch (error) {
    console.error('Failed to update coaching note', error);
    return {
      status: 500,
      message: 'Failed to update coaching note',
      data: null,
    };
  }
};

export const deleteCoachingNoteAPI = async (data: { coachingNoteId: string }) => {
  await delay(300);

  try {
    const coachingNote = await prisma.coachingNote.delete({
      where: { id: data.coachingNoteId },
    });
    const parsedCoachingNote = coachingNoteAdapter(coachingNote);
    return {
      status: 200,
      message: 'Coaching note deleted successfully',
      data: parsedCoachingNote,
    };
  } catch (error) {
    console.error('Failed to delete coaching note', error);
    return {
      status: 500,
      message: 'Failed to delete coaching note',
      data: null,
    };
  }
};