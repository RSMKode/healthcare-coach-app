import { AppDialog } from '@/app/_components/layout/AppDialog';
import { usePatientsContext } from '@/app/patients/context';
import CoachingNoteEditForm from './CoachingNoteEditForm';

export default function CoachingNoteEditDialog() {
  const {
    selectedPatient,
    selectedCoachingNoteAction,
    selectedCoachingNote,
    setSelectedCoachingNoteAction,
    setSelectedCoachingNote,
  } = usePatientsContext();

  const isOpen =
    selectedCoachingNoteAction === 'edit' &&
    selectedCoachingNote !== null &&
    selectedPatient !== null;
  if (!isOpen) return null;

  const title = 'Edit Note';
  const description = 'Fill in the form to edit the note.';

  return (
    <AppDialog
      title={title}
      description={description}
      body={
        <CoachingNoteEditForm
          patient={selectedPatient}
          coachingNote={selectedCoachingNote}
        />
      }
      open={isOpen}
      onInteractOutside={() => {
        setSelectedCoachingNote(null);
        setSelectedCoachingNoteAction(null);
      }}
    />
  );
}
