import { AppDialog } from '@/app/_components/layout/AppDialog';
import { usePatientsContext } from '@/app/patients/context';
import CoachingNoteAddForm from './CoachingNoteAddForm';

export default function CoachingNoteAddDialog() {
  const {
    selectedCoachingNoteAction,
    setSelectedCoachingNoteAction,
    setSelectedCoachingNote,
  } = usePatientsContext();

  const isOpen = selectedCoachingNoteAction === 'add'
  if (!isOpen) return null;

  const title = 'Add CoachingNote';
  const description = 'Fill in the form to add a new poachingNote.';

  return (
    <AppDialog
      title={title}
      description={description}
      body={<CoachingNoteAddForm />}
      open={isOpen}
      onInteractOutside={() => {
        setSelectedCoachingNote(null);
        setSelectedCoachingNoteAction(null);
      }}
    />
  );
}
