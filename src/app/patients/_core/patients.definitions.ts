import { z } from 'zod';
import { CoachingNote, Patient } from '../../../../prisma/generated/client';

// COACHING NOTE
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

export const CoachingNoteUpdateSchema = CoachingNoteSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export type CoachingNoteUpdateT = z.infer<typeof CoachingNoteUpdateSchema>;

//PATIENT
export const PatientSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  age: z.number().min(0).max(120),
  primaryCondition: z.string().min(1).max(300).optional(),
  coachingNotes: z.array(CoachingNoteSchema).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
export type PatientApiT = Patient & {
  coachingNotes?: CoachingNoteApiT[];
}
export type PatientT = z.infer<typeof PatientSchema>;

export const patientAdapter = (patient: PatientApiT): PatientT => ({
  id: patient.id,
  name: patient.name,
  age: patient.age,
  primaryCondition: patient.primaryCondition ?? undefined,
  coachingNotes: patient.coachingNotes?.map(coachingNoteAdapter),
  createdAt: new Date(patient.createdAt),
  updatedAt: new Date(patient.updatedAt),
});

export const PatientAddSchema = PatientSchema.omit({
  id: true,
  coachingNotes: true,
  createdAt: true,
  updatedAt: true,
});
export type PatientAddT = z.infer<typeof PatientAddSchema>;

export const PatientUpdateSchema = PatientSchema.omit({
  coachingNotes: true,
  createdAt: true,
  updatedAt: true,
});
export type PatientUpdateT = z.infer<typeof PatientUpdateSchema>;
