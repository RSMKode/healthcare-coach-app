import { PatientApiT, PatientT, patientAdapter } from '@/_core/patients/patients.definitions';
import { describe, expect, it } from 'vitest';


describe('patientAdapter', () => {
  it('adapts a PatientApiT object to a PatientT object', () => {
    const patientApi: PatientApiT = {
      id: 'some-id',
      name: 'Roger',
      age: 26,
      primaryCondition: 'Diabetes',
      createdAt: new Date('2025-10-01T10:00:00Z'),
      updatedAt: new Date('2025-10-02T12:00:00Z'),
      coachingNotes: [
        {
          patientId: 'some-id',
          id: 'note1',
          note: 'Follow-up in 2 weeks',
          createdAt: new Date('2025-10-01T10:00:00Z'),
          updatedAt: new Date('2025-10-02T12:00:00Z'),
        },
      ],
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient).toEqual({
      id: 'some-id',
      name: 'Roger',
      age: 26,
      primaryCondition: 'Diabetes',
      createdAt: new Date('2025-10-01T10:00:00Z'),
      updatedAt: new Date('2025-10-02T12:00:00Z'),
      coachingNotes: [
        {
          patientId: 'some-id',
          id: 'note1',
          note: 'Follow-up in 2 weeks',
          createdAt: new Date('2025-10-01T10:00:00Z'),
          updatedAt: new Date('2025-10-02T12:00:00Z'),
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
      createdAt: new Date('2025-10-01T10:00:00Z'),
      updatedAt: new Date('2025-10-02T12:00:00Z'),
    };

    const adaptedPatient: PatientT = patientAdapter(patientApi);

    expect(adaptedPatient).toEqual({
      id: 'some-id',
      name: 'Alice',
      age: 30,
      primaryCondition: 'Hypertension',
      coachingNotes: [],
      createdAt: new Date('2025-10-01T10:00:00Z'),
      updatedAt: new Date('2025-10-02T12:00:00Z'),
    });
  });
});
