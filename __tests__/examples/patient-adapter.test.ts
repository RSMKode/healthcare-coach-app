import { PatientApiT, PatientT, patientAdapter } from '@/_core/patients/patients.definitions';
import { describe, expect, it } from 'vitest';


describe('patientAdapter', () => {
  it('adapts a PatientApiT object to a PatientT object', () => {
    const patientApi: PatientApiT = {
      id: 'some-id',
      name: 'Roger',
      age: 26,
      primaryCondition: 'Diabetes',
      createdAt: new Date('2025-10-01T10:00:00'),
      updatedAt: new Date('2025-10-02T12:00:00'),
      coachingNotes: [
        {
          patientId: 'some-id',
          id: 'note1',
          note: 'Follow-up in 2 weeks',
          createdAt: new Date('2025-10-01T10:00:00'),
          updatedAt: new Date('2025-10-02T12:00:00'),
        },
      ],
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient).toEqual({
      id: 'some-id',
      name: 'Roger',
      age: 26,
      primaryCondition: 'Diabetes',
      createdAt: new Date('2025-10-01T10:00:00'),
      updatedAt: new Date('2025-10-02T12:00:00'),
      coachingNotes: [
        {
          patientId: 'some-id',
          id: 'note1',
          note: 'Follow-up in 2 weeks',
          createdAt: new Date('2025-10-01T10:00:00'),
          updatedAt: new Date('2025-10-02T12:00:00'),
        },
      ],
    });
  });

  it('handles empty coachingNotes array', () => {
    const patientApi: PatientApiT = {
      id: 'some-id',
      name: 'Alice',
      age: 30,
      primaryCondition: 'Hypertension',
      coachingNotes: [],
      createdAt: new Date('2025-10-01T10:00:00'),
      updatedAt: new Date('2025-10-02T12:00:00'),
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient).toEqual({
      id: 'some-id',
      name: 'Alice',
      age: 30,
      primaryCondition: 'Hypertension',
      coachingNotes: [],
      createdAt: new Date('2025-10-01T10:00:00'),
      updatedAt: new Date('2025-10-02T12:00:00'),
    });
  });

  it('preserves exact timestamp data', () => {
    const specificDate = new Date('2025-06-30T23:59:59.999');
    
    const patientApi: PatientApiT = {
      id: 'timestamp-test',
      name: 'John Doe',
      age: 45,
      primaryCondition: 'Heart Disease',
      coachingNotes: [],
      createdAt: specificDate,
      updatedAt: specificDate,
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient.createdAt).toStrictEqual(specificDate);
    expect(adaptedPatient.updatedAt).toStrictEqual(specificDate);
    expect(adaptedPatient.createdAt.getTime()).toBe(specificDate.getTime());
  });

  it('handles null primaryCondition (converts to undefined)', () => {
    const patientApi: PatientApiT = {
      id: 'test-id',
      name: 'Maria',
      age: 35,
      primaryCondition: null,
      coachingNotes: [],
      createdAt: new Date('2025-06-01T10:00:00'),
      updatedAt: new Date('2025-06-01T10:00:00'),
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient.primaryCondition).toBeUndefined();
    expect(adaptedPatient).toEqual({
      id: 'test-id',
      name: 'Maria',
      age: 35,
      primaryCondition: undefined,
      coachingNotes: [],
      createdAt: new Date('2025-06-01T10:00:00'),
      updatedAt: new Date('2025-06-01T10:00:00'),
    });
  });

  it('handles undefined coachingNotes', () => {
    const patientApi: PatientApiT = {
      id: 'test-id',
      name: 'Carlos',
      age: 28,
      primaryCondition: 'Asthma',
      coachingNotes: undefined,
      createdAt: new Date('2025-06-01T10:00:00'),
      updatedAt: new Date('2025-06-01T10:00:00'),
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient.coachingNotes).toBeUndefined();
    expect(adaptedPatient).toEqual({
      id: 'test-id',
      name: 'Carlos',
      age: 28,
      primaryCondition: 'Asthma',
      coachingNotes: undefined,
      createdAt: new Date('2025-06-01T10:00:00'),
      updatedAt: new Date('2025-06-01T10:00:00'),
    });
  });

  it('handles multiple coaching notes with different dates', () => {
    const patientApi: PatientApiT = {
      id: 'patient-123',
      name: 'Ana',
      age: 42,
      primaryCondition: 'Depression',
      coachingNotes: [
        {
          patientId: 'patient-123',
          id: 'note1',
          note: 'Initial consultation',
          createdAt: new Date('2025-01-01T09:00:00'),
          updatedAt: new Date('2025-01-01T09:00:00'),
        },
        {
          patientId: 'patient-123',
          id: 'note2',
          note: 'Follow-up session',
          createdAt: new Date('2025-02-15T14:30:00'),
          updatedAt: new Date('2025-02-16T10:00:00'),
        },
        {
          patientId: 'patient-123',
          id: 'note3',
          note: 'Progress review',
          createdAt: new Date('2025-03-20T16:45:00'),
          updatedAt: new Date('2025-03-20T16:45:00'),
        },
      ],
      createdAt: new Date('2025-01-01T09:00:00'),
      updatedAt: new Date('2025-03-20T17:00:00'),
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient.coachingNotes).toHaveLength(3);
    expect(adaptedPatient.coachingNotes?.[0]).toEqual({
      patientId: 'patient-123',
      id: 'note1',
      note: 'Initial consultation',
      createdAt: new Date('2025-01-01T09:00:00'),
      updatedAt: new Date('2025-01-01T09:00:00'),
    });
    expect(adaptedPatient.coachingNotes?.[1]).toEqual({
      patientId: 'patient-123',
      id: 'note2',
      note: 'Follow-up session',
      createdAt: new Date('2025-02-15T14:30:00'),
      updatedAt: new Date('2025-02-16T10:00:00'),
    });
    expect(adaptedPatient.coachingNotes?.[2]).toEqual({
      patientId: 'patient-123',
      id: 'note3',
      note: 'Progress review',
      createdAt: new Date('2025-03-20T16:45:00'),
      updatedAt: new Date('2025-03-20T16:45:00'),
    });
  });

  it('converts string dates to Date objects', () => {
    const patientApi: PatientApiT = {
      id: 'date-test',
      name: 'Luis',
      age: 50,
      primaryCondition: 'Hypertension',
      coachingNotes: [
        {
          patientId: 'date-test',
          id: 'note1',
          note: 'Blood pressure check',
          createdAt: '2025-04-10T08:30:00.000Z' as any,
          updatedAt: '2025-04-10T08:30:00.000Z' as any,
        },
      ],
      createdAt: '2025-04-01T12:00:00.000Z' as any,
      updatedAt: '2025-04-10T09:00:00.000Z' as any,
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient.createdAt).toBeInstanceOf(Date);
    expect(adaptedPatient.updatedAt).toBeInstanceOf(Date);
    expect(adaptedPatient.coachingNotes?.[0].createdAt).toBeInstanceOf(Date);
    expect(adaptedPatient.coachingNotes?.[0].updatedAt).toBeInstanceOf(Date);
    
    expect(adaptedPatient.createdAt.toISOString()).toBe('2025-04-01T12:00:00.000Z');
    expect(adaptedPatient.updatedAt.toISOString()).toBe('2025-04-10T09:00:00.000Z');
  });

  it('handles edge case values for age and name length', () => {
    const longName = 'A'.repeat(200); // Maximum length
    
    const patientApi: PatientApiT = {
      id: 'edge-test',
      name: longName,
      age: 1, // Minimum age
      primaryCondition: 'Rare genetic condition with very long name that approaches the 300 character limit for primary condition field to test the boundary behavior of the system when dealing with maximum length strings in this specific field',
      coachingNotes: [],
      createdAt: new Date('2025-06-01T10:00:00'),
      updatedAt: new Date('2025-06-01T10:00:00'),
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient.name).toBe(longName);
    expect(adaptedPatient.age).toBe(1);
    expect(adaptedPatient.primaryCondition?.length).toBeLessThanOrEqual(300);
  });

  it('handles maximum age boundary', () => {
    const patientApi: PatientApiT = {
      id: 'age-test',
      name: 'Elderly Patient',
      age: 120, // Maximum age
      primaryCondition: 'Age-related conditions',
      coachingNotes: [],
      createdAt: new Date('2025-06-01T10:00:00'),
      updatedAt: new Date('2025-06-01T10:00:00'),
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient.age).toBe(120);
    expect(adaptedPatient.name).toBe('Elderly Patient');
  });

  it('preserves all patient data integrity across adaptation', () => {
    const originalDate = new Date('2025-05-15T14:22:33.456Z');
    
    const patientApi: PatientApiT = {
      id: 'integrity-test',
      name: 'Test Patient',
      age: 33,
      primaryCondition: 'Multiple Conditions',
      coachingNotes: [
        {
          patientId: 'integrity-test',
          id: 'note-integrity',
          note: 'Comprehensive care plan established',
          createdAt: originalDate,
          updatedAt: originalDate,
        },
      ],
      createdAt: originalDate,
      updatedAt: originalDate,
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    // Verify no data loss or corruption
    expect(adaptedPatient.id).toBe(patientApi.id);
    expect(adaptedPatient.name).toBe(patientApi.name);
    expect(adaptedPatient.age).toBe(patientApi.age);
    expect(adaptedPatient.primaryCondition).toBe(patientApi.primaryCondition);
    expect(adaptedPatient.coachingNotes).toHaveLength(1);
    expect(adaptedPatient.coachingNotes?.[0].note).toBe(patientApi.coachingNotes?.[0].note);
    
    // Verify date preservation with millisecond precision
    expect(adaptedPatient.createdAt.getTime()).toBe(originalDate.getTime());
    expect(adaptedPatient.updatedAt.getTime()).toBe(originalDate.getTime());
    expect(adaptedPatient.coachingNotes?.[0].createdAt.getTime()).toBe(originalDate.getTime());
  });
});
