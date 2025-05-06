import { Button } from '@/app/_components/ui/button';
import React from 'react';
import { TbPlaylistAdd } from 'react-icons/tb';
import { usePatientsContext } from '../../context';

export default function PatientAddButton() {
  const { setSelectedPatientAction } = usePatientsContext();

  const patientAction = {
    label: 'Add patient',
    icon: TbPlaylistAdd,
    onClick: () => {
      setSelectedPatientAction('add');
    },
  };
  const { label, icon: Icon, onClick } = patientAction;

  return (
    <Button onClick={() => onClick()}>
      <span>{label}</span>
      <Icon className="size-4" />
    </Button>
  );
}
