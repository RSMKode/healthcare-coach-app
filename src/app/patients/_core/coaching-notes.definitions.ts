import { z } from 'zod';
import { CoachingNote, Patient } from '../../../../prisma/generated/client';

export const CoachingNoteActionSchema = z
  .enum(['add', 'edit', 'delete'])
  .or(z.null());
export type CoachingNoteActionT = z.infer<typeof CoachingNoteActionSchema>;
export type CoachingNoteApiT = CoachingNote;
export const CoachingNoteSchema = z.object({
  id: z.string().cuid(),
  patientId: z.string().cuid(),
  note: z.string().min(1).max(2000),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type CoachingNoteT = z.infer<typeof CoachingNoteSchema>;
export const coachingNoteAdapter = (
  coachingNote: CoachingNoteApiT
): CoachingNoteT => ({
  id: coachingNote.id,
  patientId: coachingNote.patientId,
  note: coachingNote.note,
  createdAt: new Date(coachingNote.createdAt),
  updatedAt: new Date(coachingNote.updatedAt),
});

export const CoachingNoteAddSchema = CoachingNoteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type CoachingNoteAddT = z.infer<typeof CoachingNoteAddSchema>;

export const CoachingNoteEditSchema = CoachingNoteSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export type CoachingNoteEditT = z.infer<typeof CoachingNoteEditSchema>;
