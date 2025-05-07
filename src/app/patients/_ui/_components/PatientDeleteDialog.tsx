import { AppAlertDialog } from '@/app/_components/layout/AppAlertDialog';
import { TbTrash } from 'react-icons/tb';
import { usePatientsContext } from '../../context';
import { useDeletePatient } from '../_hooks/use-patients';

export default function PatientDeleteDialog() {
  const {
    selectedPatientAction,
    selectedPatient,
    setSelectedPatientAction,
    setSelectedPatient,
  } = usePatientsContext();
  const { mutate, isPending } = useDeletePatient({
    onSuccess: () => {
      setSelectedPatientAction(null);
      setSelectedPatient(null);
    },
  });

  const isOpen = selectedPatientAction === 'delete' && selectedPatient !== null;
  if (!isOpen) return null;

  const title = 'Delete Patient';
  const description =
    'Are you sure you want to delete this patient? This action cannot be undone.';

  return (
    <AppAlertDialog
      title={title}
      description={description}
      open={isOpen}
      isActionPending={isPending}
      onActionClick={() => {
        mutate({
          patientId: selectedPatient.id,
        });
      }}
      onCancelClick={() => {
        setSelectedPatientAction(null);
        setSelectedPatient(null);
      }}
      actionButtonChildren={
        <span className="flex items-center gap-2">
          Delete Patient
          <TbTrash className="size-5" />
        </span>
      }
    />
  );
}
