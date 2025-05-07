'use client';

import React, { useEffect } from 'react';
import { Section } from '../_components/layout/Section';
import { PatientList } from './_ui/_components/PatientList';
import PatientDeleteDialog from './_ui/_components/PatientDeleteDialog';
import PatientAddButton from './_ui/_components/PatientAddButton';
import PatientAddDialog from './_ui/_components/PatientAddDialog';
import PatientEditDialog from './_ui/_components/PatientEditDialog';
import PatientSearch from './_ui/_components/PatientSearch';
import { usePatientsContext } from './context';

export default function PatientsPage() {
  const { setSelectedPatient, setSelectedPatientAction } = usePatientsContext();

  useEffect(() => {
    setSelectedPatient(null);
    setSelectedPatientAction(null);
  }, []);

  return (
    <>
      <header className="flex flex-col items-center justify-between w-full gap-4 px-1 py-2 sticky top-0 z-20 bg-background/75 backdrop-blur-md rounded-b-lg">
        <div className='flex items-center gap-2 w-full justify-between'>
          <h1 className="text-2xl font-bold leading-none">Patients</h1>
          <PatientAddButton />
        </div>
        <PatientSearch />
      </header>
      <PatientList />
      <PatientAddDialog />
      <PatientEditDialog />
      <PatientDeleteDialog />
    </>
  );
}
