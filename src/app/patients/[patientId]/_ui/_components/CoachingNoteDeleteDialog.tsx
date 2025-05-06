import { AppAlertDialog } from '@/app/_components/layout/AppAlertDialog';
import { useCoachingNotes } from '@/app/patients/_ui/_hooks/use-coaching-notes';
import { usePatients } from '@/app/patients/_ui/_hooks/use-patients';
import { usePatientsContext } from '@/app/patients/context';
import { TbTrash } from 'react-icons/tb';

export default function CoachingNoteDeleteDialog() {
  const {
    selectedPatient,
    selectedCoachingNoteAction,
    selectedCoachingNote,
    setSelectedCoachingNoteAction,
    setSelectedCoachingNote,
  } = usePatientsContext();
  const { deleteCoachingNote } = useCoachingNotes();
  const { mutate, isPending } = deleteCoachingNote({
    onSuccess: () => {
      setSelectedCoachingNote(null);
      setSelectedCoachingNoteAction(null);
    },
  });

  const isOpen =
    selectedCoachingNoteAction === 'delete' &&
    selectedCoachingNote !== null &&
    selectedPatient !== null;
  if (!isOpen) return null;

  const title = 'Delete Note';
  const description =
    'Are you sure you want to delete this note? This action cannot be undone.';

  return (
    <AppAlertDialog
      title={title}
      description={description}
      open={isOpen}
      isActionPending={isPending}
      onActionClick={() => {
        mutate({
          coachingNoteId: selectedCoachingNote.id,
        });
      }}
      onCancelClick={() => {
        setSelectedCoachingNote(null);
        setSelectedCoachingNoteAction(null);
      }}
      isActionDestructive={true}
      actionButtonChildren={
        <span className="flex items-center gap-2">
          Delete Note
          <TbTrash className="size-5" />
        </span>
      }
    />
  );
}
