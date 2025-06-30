import { CoachingNoteApiT, CoachingNoteT, coachingNoteAdapter } from '@/_core/coaching-notes/coaching-notes.definitions';
import { describe, expect, it } from 'vitest';

describe('coachingNoteAdapter', () => {
  it('adapts a CoachingNoteApiT object to a CoachingNoteT object', () => {
    const coachingNoteApi: CoachingNoteApiT = {
      id: 'note-123',
      patientId: 'patient-456',
      note: 'Patient shows improvement in glucose levels. Continue current medication.',
      createdAt: new Date('2025-10-01T09:30:00'),
      updatedAt: new Date('2025-10-02T14:15:00'),
    };

    const adaptedCoachingNote: CoachingNoteT = coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote).toEqual({
      id: 'note-123',
      patientId: 'patient-456',
      note: 'Patient shows improvement in glucose levels. Continue current medication.',
      createdAt: new Date('2025-10-01T09:30:00'),
      updatedAt: new Date('2025-10-02T14:15:00'),
    });
  });

  it('handles empty note content', () => {
    const coachingNoteApi: CoachingNoteApiT = {
      id: 'note-789',
      patientId: 'patient-101',
      note: '',
      createdAt: new Date('2025-09-15T08:00:00'),
      updatedAt: new Date('2025-09-15T08:00:00'),
    };

    const adaptedCoachingNote: CoachingNoteT = coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote).toEqual({
      id: 'note-789',
      patientId: 'patient-101',
      note: '',
      createdAt: new Date('2025-09-15T08:00:00'),
      updatedAt: new Date('2025-09-15T08:00:00'),
    });
  });

  it('handles long note content', () => {
    const longNote = 'A'.repeat(1000) + ' This is a very detailed coaching note with extensive information about the patient treatment plan and progress.';
    
    const coachingNoteApi: CoachingNoteApiT = {
      id: 'note-long',
      patientId: 'patient-detailed',
      note: longNote,
      createdAt: new Date('2025-11-20T16:45:00'),
      updatedAt: new Date('2025-11-21T10:30:00'),
    };

    const adaptedCoachingNote: CoachingNoteT = coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote).toEqual({
      id: 'note-long',
      patientId: 'patient-detailed',
      note: longNote,
      createdAt: new Date('2025-11-20T16:45:00'),
      updatedAt: new Date('2025-11-21T10:30:00'),
    });
    expect(adaptedCoachingNote.note.length).toBe(longNote.length);
  });

  it('preserves exact timestamp data', () => {
    const specificDate = new Date('2025-06-30T23:59:59.999');
    
    const coachingNoteApi: CoachingNoteApiT = {
      id: 'timestamp-test',
      patientId: 'patient-time',
      note: 'Testing timestamp preservation',
      createdAt: specificDate,
      updatedAt: specificDate,
    };

    const adaptedCoachingNote: CoachingNoteT = coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.createdAt).toStrictEqual(specificDate);
    expect(adaptedCoachingNote.updatedAt).toStrictEqual(specificDate);
    expect(adaptedCoachingNote.createdAt.getTime()).toBe(specificDate.getTime());
  });
});
