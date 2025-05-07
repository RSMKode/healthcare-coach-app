'use client';

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { createContext } from 'react';
import { CoachingNoteT, CoachingNoteActionT } from './_core/coaching-notes/coaching-notes.definitions';
import { PatientT, PatientActionT } from './_core/patients/patients.definitions';

type PatientsContextT = {
  selectedPatient: PatientT | null;
  setSelectedPatient: Dispatch<SetStateAction<PatientT | null>>;

  selectedCoachingNote: CoachingNoteT | null;
  setSelectedCoachingNote: Dispatch<SetStateAction<CoachingNoteT | null>>;

  selectedPatientAction: PatientActionT;
  setSelectedPatientAction: Dispatch<SetStateAction<PatientActionT>>;

  selectedCoachingNoteAction: CoachingNoteActionT;
  setSelectedCoachingNoteAction: Dispatch<SetStateAction<CoachingNoteActionT>>;
};

// Crear un contexto para el estado de la transición
const PatientsContext = createContext(null as unknown as PatientsContextT);

export const PatientsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedPatient, setSelectedPatient] = useState<PatientT | null>(null);
  const [selectedPatientAction, setSelectedPatientAction] =
    useState<PatientActionT>(null);

  const [selectedCoachingNote, setSelectedCoachingNote] =
    useState<CoachingNoteT | null>(null);
  const [selectedCoachingNoteAction, setSelectedCoachingNoteAction] =
    useState<CoachingNoteActionT>(null);

  return (
    <PatientsContext.Provider
      value={{
        selectedPatient,
        setSelectedPatient,
        selectedPatientAction,
        setSelectedPatientAction,
        selectedCoachingNote,
        setSelectedCoachingNote,
        selectedCoachingNoteAction,
        setSelectedCoachingNoteAction,
      }}>
      {children}
    </PatientsContext.Provider>
  );
};

export const usePatientsContext = () => {
  const context = useContext(PatientsContext);
  if (context === undefined) {
    throw new Error(
      'usePatientsContext must be used within a PatientsContextProvider'
    );
  }
  return context;
};
