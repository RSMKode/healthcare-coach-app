import { AppDialog } from '@/app/_components/layout/AppDialog';
import { usePatientsContext } from '../../context';
import PatientAddForm from './PatientAddForm';

export default function PatientAddDialog() {
  const { selectedPatientAction, setSelectedPatientAction } =
    usePatientsContext();

  const isOpen = selectedPatientAction === 'add';
  if (!isOpen) return null;

  const title = 'Add Patient';
  const description = 'Fill in the form to add a new patient.';

  return (
    <AppDialog
      title={title}
      description={description}
      body={<PatientAddForm />}
      open={isOpen}
      onInteractOutside={() => {
        setSelectedPatientAction(null);
      }}
    />
  );
}
