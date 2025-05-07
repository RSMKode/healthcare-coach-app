'use client';

import InfoLabel from '@/app/_components/layout/InfoLabel';
import { Section } from '@/app/_components/layout/Section';
import { CardSkeleton } from '@/app/_components/skeletons/CardSkeleton';
import { notFound, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { usePatientsContext } from '../context';
import CoachingNoteAddDialog from './_ui/_components/CoachingNoteAddDialog';
import { CoachingNoteCardList } from './_ui/_components/CoachingNoteCardList';
import CoachingNoteDeleteDialog from './_ui/_components/CoachingNoteDeleteDialog';
import CoachingNoteEditDialog from './_ui/_components/CoachingNoteEditDialog';
import { PatientDetails } from './_ui/_components/PatientDetails';
import { useGetPatient } from '../_ui/_hooks/use-patients';

export default function PatientPage() {
  const { patientId } = useParams<{ patientId: string }>();
  // if (!patientId) return notFound();

  const {
    setSelectedPatient,
    setSelectedCoachingNote,
    setSelectedCoachingNoteAction,
  } = usePatientsContext();

  const { data, isLoading, isRefetching, isError, error } = useGetPatient({
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
