import {
  CoachingNoteApiT,
  CoachingNoteT,
  coachingNoteAdapter,
} from '@/_core/coaching-notes/coaching-notes.definitions';
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

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

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

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote).toEqual({
      id: 'note-789',
      patientId: 'patient-101',
      note: '',
      createdAt: new Date('2025-09-15T08:00:00'),
      updatedAt: new Date('2025-09-15T08:00:00'),
    });
  });

  it('handles long note content', () => {
    const longNote =
      'A'.repeat(1000) +
      ' This is a very detailed coaching note with extensive information about the patient treatment plan and progress.';

    const coachingNoteApi: CoachingNoteApiT = {
      id: 'note-long',
      patientId: 'patient-detailed',
      note: longNote,
      createdAt: new Date('2025-11-20T16:45:00'),
      updatedAt: new Date('2025-11-21T10:30:00'),
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

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

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.createdAt).toStrictEqual(specificDate);
    expect(adaptedCoachingNote.updatedAt).toStrictEqual(specificDate);
    expect(adaptedCoachingNote.createdAt.getTime()).toBe(
      specificDate.getTime()
    );
  });

  it('converts string dates to Date objects', () => {
    const coachingNoteApi: CoachingNoteApiT = {
      id: 'date-conversion-test',
      patientId: 'patient-dates',
      note: 'Testing date conversion from string to Date objects',
      createdAt: '2025-03-15T11:20:30.500Z' as any,
      updatedAt: '2025-03-16T09:45:15.250Z' as any,
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.createdAt).toBeInstanceOf(Date);
    expect(adaptedCoachingNote.updatedAt).toBeInstanceOf(Date);
    expect(adaptedCoachingNote.createdAt.toISOString()).toBe(
      '2025-03-15T11:20:30.500Z'
    );
    expect(adaptedCoachingNote.updatedAt.toISOString()).toBe(
      '2025-03-16T09:45:15.250Z'
    );
  });

  it('handles maximum note length boundary (2000 characters)', () => {
    const maxLengthNote = 'A'.repeat(2000); // Maximum allowed length

    const coachingNoteApi: CoachingNoteApiT = {
      id: 'max-length-test',
      patientId: 'patient-boundary',
      note: maxLengthNote,
      createdAt: new Date('2025-05-10T14:30:00'),
      updatedAt: new Date('2025-05-10T14:30:00'),
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.note).toBe(maxLengthNote);
    expect(adaptedCoachingNote.note.length).toBe(2000);
    expect(adaptedCoachingNote.note.length).toBeLessThanOrEqual(2000);
  });

  it('handles minimum note length (1 character)', () => {
    const coachingNoteApi: CoachingNoteApiT = {
      id: 'min-length-test',
      patientId: 'patient-minimal',
      note: 'A', // Minimum allowed length
      createdAt: new Date('2025-04-20T10:15:00'),
      updatedAt: new Date('2025-04-20T10:15:00'),
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.note).toBe('A');
    expect(adaptedCoachingNote.note.length).toBe(1);
    expect(adaptedCoachingNote.note.length).toBeGreaterThanOrEqual(1);
  });

  it('handles special characters and unicode in note content', () => {
    const specialNote =
      'Nota médica: paciente presenta 50% de mejora. Síntomas: náuseas, fiebre (38°C). Prescription: 2mg/día. Follow-up: 15/06/2025 📋💊';

    const coachingNoteApi: CoachingNoteApiT = {
      id: 'special-chars-test',
      patientId: 'patient-international',
      note: specialNote,
      createdAt: new Date('2025-06-01T16:30:00'),
      updatedAt: new Date('2025-06-01T16:30:00'),
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.note).toBe(specialNote);
    expect(adaptedCoachingNote.note).toContain('médica');
    expect(adaptedCoachingNote.note).toContain('38°C');
    expect(adaptedCoachingNote.note).toContain('📋💊');
  });

  it('handles multiline note content with line breaks', () => {
    const multilineNote = `Patient Assessment:
- Blood pressure: 120/80 mmHg
- Heart rate: 72 bpm
- Temperature: 36.5°C

Treatment Plan:
1. Continue current medication
2. Schedule follow-up in 2 weeks
3. Monitor blood glucose levels daily

Notes:
Patient is responding well to treatment.
No adverse effects reported.`;

    const coachingNoteApi: CoachingNoteApiT = {
      id: 'multiline-test',
      patientId: 'patient-detailed',
      note: multilineNote,
      createdAt: new Date('2025-05-25T13:45:00'),
      updatedAt: new Date('2025-05-25T14:00:00'),
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.note).toBe(multilineNote);
    expect(adaptedCoachingNote.note).toContain('\n');
    expect(adaptedCoachingNote.note).toContain('Patient Assessment:');
    expect(adaptedCoachingNote.note).toContain('Treatment Plan:');
  });

  it('preserves data integrity across adaptation', () => {
    const originalCreatedDate = new Date('2025-02-14T08:30:15.123Z');
    const originalUpdatedDate = new Date('2025-02-14T08:45:22.456Z');

    const coachingNoteApi: CoachingNoteApiT = {
      id: 'integrity-check',
      patientId: 'patient-integrity',
      note: 'Comprehensive integrity test for coaching note adapter functionality',
      createdAt: originalCreatedDate,
      updatedAt: originalUpdatedDate,
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    // Verify no data loss or corruption
    expect(adaptedCoachingNote.id).toBe(coachingNoteApi.id);
    expect(adaptedCoachingNote.patientId).toBe(coachingNoteApi.patientId);
    expect(adaptedCoachingNote.note).toBe(coachingNoteApi.note);

    // Verify exact date preservation with millisecond precision
    expect(adaptedCoachingNote.createdAt.getTime()).toBe(
      originalCreatedDate.getTime()
    );
    expect(adaptedCoachingNote.updatedAt.getTime()).toBe(
      originalUpdatedDate.getTime()
    );
    expect(adaptedCoachingNote.createdAt.getMilliseconds()).toBe(123);
    expect(adaptedCoachingNote.updatedAt.getMilliseconds()).toBe(456);
  });

  it('handles different CUID formats for ids', () => {
    const coachingNoteApi: CoachingNoteApiT = {
      id: 'clx1234567890abcdef', // Example CUID format
      patientId: 'clz9876543210zyxwvu', // Example CUID format
      note: 'Testing CUID format handling',
      createdAt: new Date('2025-04-12T09:20:00'),
      updatedAt: new Date('2025-04-12T09:20:00'),
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.id).toBe('clx1234567890abcdef');
    expect(adaptedCoachingNote.patientId).toBe('clz9876543210zyxwvu');
    expect(typeof adaptedCoachingNote.id).toBe('string');
    expect(typeof adaptedCoachingNote.patientId).toBe('string');
  });

  it('handles notes with only whitespace characters', () => {
    const whitespaceNote = '   \n\t   \r\n   '; // Various whitespace characters

    const coachingNoteApi: CoachingNoteApiT = {
      id: 'whitespace-test',
      patientId: 'patient-whitespace',
      note: whitespaceNote,
      createdAt: new Date('2025-03-30T12:00:00'),
      updatedAt: new Date('2025-03-30T12:00:00'),
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    expect(adaptedCoachingNote.note).toBe(whitespaceNote);
    expect(adaptedCoachingNote.note.length).toBeGreaterThan(0);
  });

  it('handles extreme timestamp values', () => {
    const testDate1 = new Date('1970-01-01T00:00:00.000Z'); // Unix epoch
    const testDate2 = new Date('2038-01-19T03:14:07.999Z'); // Near 32-bit timestamp limit

    const coachingNoteApi: CoachingNoteApiT = {
      id: 'extreme-dates',
      patientId: 'patient-extreme',
      note: 'Testing extreme date values',
      createdAt: testDate1,
      updatedAt: testDate2,
    };

    const adaptedCoachingNote: CoachingNoteT =
      coachingNoteAdapter(coachingNoteApi);

    // Test that dates are converted correctly even when passed through new Date()
    expect(adaptedCoachingNote.createdAt.getTime()).toBe(testDate1.getTime());
    expect(adaptedCoachingNote.updatedAt.getTime()).toBe(testDate2.getTime());
    expect(adaptedCoachingNote.createdAt.getFullYear()).toBe(1970);
    expect(adaptedCoachingNote.updatedAt.getFullYear()).toBe(2038);
  });
});
