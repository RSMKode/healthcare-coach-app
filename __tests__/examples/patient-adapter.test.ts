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
});
