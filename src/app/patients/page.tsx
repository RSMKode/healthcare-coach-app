'use client';

import React from 'react';
import { Section } from '../_components/layout/Section';
import { PatientList } from './_components/PatientList';

export default function PatientsPage() {
  return (
    <>
      <header className="flex items-center justify-between w-full px-4 py-2">
        <h1 className="text-2xl font-bold">Patients</h1>
      </header>
      <Section className='h-full justify-between'>
        <PatientList />
      </Section>
    </>
  );
}
