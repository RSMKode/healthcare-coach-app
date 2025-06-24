import { CardGrid } from '@/app/_components/layout/CardGrid';
import InfoLabel from '@/app/_components/layout/InfoLabel';
import { Section } from '@/app/_components/layout/Section';
import { CardSkeleton } from '@/app/_components/skeletons/CardSkeleton';
import CoachingNoteAddButton from './CoachingNoteAddButton';
import { CoachingNoteCard } from './CoachingNoteCard';
import { useGetCoachingNotes } from '@/app/patients/_ui/_hooks/use-coaching-notes';
import { PatientT } from '@/_core/patients/patients.definitions';

type CoachingNoteCardListProps = React.ComponentProps<'div'> & {
  patient: PatientT;
};
export function CoachingNoteCardList({
  className,
  patient,
  ...props
}: CoachingNoteCardListProps) {

  const { data, isLoading, isRefetching, isError, error } = useGetCoachingNotes({
    patientId: patient.id,
  });
  const { data: coachingNotes = [] } = data || {};

  // const isCurrentlyLoading = isLoading || isRefetching;
  const isCurrentlyLoading = isLoading;
  const fakeCoachingNoteCount = 6;
  const fakeCoachingNotes = Array.from({ length: fakeCoachingNoteCount });

  return (
    <Section className='overflow-y-auto'>
      <header className="flex items-center justify-between w-full gap-2 py-2">
        <h2 className="text-xl font-bold leading-none">Coaching Notes</h2>
        <CoachingNoteAddButton />
      </header>
      {!coachingNotes?.length && !isCurrentlyLoading && (
        <InfoLabel className="w-full">No coaching notes found</InfoLabel>
      )}
      {isCurrentlyLoading && (
        <CardGrid className="grid-cols-auto-fill">
          {fakeCoachingNotes.map((_, index) => (
            <CardSkeleton key={index} headerSections={0} />
          ))}
        </CardGrid>
      )}
      {!isCurrentlyLoading && coachingNotes && coachingNotes.length > 0 && (
        <CardGrid className="grid-cols-auto-fill">
          {coachingNotes.map(coachingNote => (
            <CoachingNoteCard
              key={coachingNote.id}
              coachingNote={coachingNote}
              className="w-full"
            />
          ))}
        </CardGrid>
      )}
    </Section>
  );
}
