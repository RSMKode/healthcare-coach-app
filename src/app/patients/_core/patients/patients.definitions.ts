import { z } from 'zod';
import { Patient } from '../../../../../prisma/generated/client';
import { CoachingNoteApiT, CoachingNoteSchema, coachingNoteAdapter } from '../coaching-notes/coaching-notes.definitions';


export const PatientActionSchema = z
  .enum(['add', 'edit', 'delete'])
  .or(z.null());
export type PatientActionT = z.infer<typeof PatientActionSchema>;


export const PatientSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1).max(200),
  age: z.coerce.number().min(1).max(120),
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

export const PatientEditSchema = PatientSchema.omit({
  coachingNotes: true,
  createdAt: true,
  updatedAt: true,
});
export type PatientEditT = z.infer<typeof PatientEditSchema>;
