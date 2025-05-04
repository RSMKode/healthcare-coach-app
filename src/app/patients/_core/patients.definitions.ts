import { z } from 'zod';
import { CoachingNote, Patient } from '../../../../prisma/generated/client';

export const CoachingNoteSchema = z.string().min(1).max(2000);
// export type CoachingNoteT = z.infer<typeof CoachingNoteSchema>;
export type CoachingNoteT = CoachingNote;
export const PatientSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  age: z.number().min(0).max(120),
  coachingNotes: z.array(CoachingNoteSchema).optional(),
});
// export type PatientT = z.infer<typeof PatientSchema>;
export type PatientT = Patient;
