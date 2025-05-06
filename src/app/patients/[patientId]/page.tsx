'use client';

import { PatientDetails } from './_ui/_components/PatientDetails';
import { useParams } from 'next/navigation';
import { usePatients } from '../_ui/_hooks/use-patients';
import InfoLabel from '@/app/_components/layout/InfoLabel';
import { Section } from '@/app/_components/layout/Section';
import { CardSkeleton } from '@/app/_components/skeletons/CardSkeleton';
import { CoachingNoteCardList } from './_ui/_components/CoachingNoteCardList';
import { useEffect, useState } from 'react';
import { usePatientsContext } from '../context';
import CoachingNoteAddDialog from './_ui/_components/CoachingNoteAddDialog';
import CoachingNoteDeleteDialog from './_ui/_components/CoachingNoteDeleteDialog';
import CoachingNoteEditDialog from './_ui/_components/CoachingNoteEditDialog';

export default function PatientPage() {
  const { patientId } = useParams<{ patientId: string }>();
  const { getPatient } = usePatients();
  const {
    setSelectedPatient,
    setSelectedCoachingNote,
    setSelectedCoachingNoteAction,
  } = usePatientsContext();

  const { data, isLoading, isRefetching, isError, error } = getPatient({
    patientId,
  });
  const { data: patient } = data || {};
  const { coachingNotes = [] } = patient || {};

  const isCurrentlyLoading = isLoading || isRefetching;

  useEffect(() => {
    if (patient) setSelectedPatient(patient);
    setSelectedCoachingNote(null);
    setSelectedCoachingNoteAction(null);
  }, [patient]);

  return (
    <>
      <header className="flex items-center justify-between w-full gap-2 py-2">
        <h1 className="text-2xl font-bold leading-none">Patient Details</h1>
      </header>
      <Section className="h-full">
        {!patient && !isCurrentlyLoading && (
          <InfoLabel className="w-full">Patient not found</InfoLabel>
        )}
        {isCurrentlyLoading && <CardSkeleton className="w-full" />}
        {!isCurrentlyLoading && patient && (
          <>
            <PatientDetails className="w-full" patient={patient} />
            <CoachingNoteCardList patient={patient} />
          </>
        )}
      </Section>
      <CoachingNoteAddDialog />
      <CoachingNoteEditDialog />
      <CoachingNoteDeleteDialog />
    </>
  );
}
