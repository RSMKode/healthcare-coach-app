import { AppDialog } from '@/app/_components/layout/AppDialog';
import { usePatientsContext } from '../../context';
import PatientEditForm from './PatientEditForm';

export default function PatientAddDialog() {
  const {
    selectedPatientAction,
    setSelectedPatientAction,
    selectedPatient,
    setSelectedPatient,
  } = usePatientsContext();

  const isOpen = selectedPatientAction === 'edit' && selectedPatient !== null;
  if (!isOpen) return null;

  const title = 'Edit Patient';
  const description = 'Fill in the form to edit the patient.';

  return (
    <AppDialog
      title={title}
      description={description}
      body={<PatientEditForm patient={selectedPatient} />}
      open={isOpen}
      onInteractOutside={() => {
        setSelectedPatient(null);
        setSelectedPatientAction(null);
      }}
    />
  );
}
