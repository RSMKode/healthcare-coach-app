'use client';

import React from 'react';
import { Section } from '../_components/layout/Section';
import { PatientList } from './_components/PatientList';

export default function PatientsPage() {
  return (
    <Section>
      <PatientList />
    </Section>
  );
}
