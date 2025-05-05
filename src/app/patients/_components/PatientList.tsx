import { paginationSearchParams } from '@/_shared/pagination.search-params';
import { CardGrid } from '@/app/_components/layout/CardGrid';
import { Section } from '@/app/_components/layout/Section';
import { useQueryStates } from 'nuqs';
import { useGetPatients } from '../_core/patients.use-cases';
import { CardSkeleton } from '@/app/_components/skeletons/CardSkeleton';
import { PatientCard } from './PatientCard';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function PatientList() {
  const [pagination] = useQueryStates(paginationSearchParams());

  const { page, pageSize } = pagination;

  const {
    data: paginatedPatients,
    isLoading,
    isError,
    error,
  } = useGetPatients({
    page,
    pageSize,
  });
  const { data: patients } = paginatedPatients || {};

  const fakePatientCount = 10;
  const fakePatients = Array.from({ length: fakePatientCount });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  console.log('patients', patients);

  return (
    <Section>
      <h2 className="text-2xl font-bold">Patients</h2>
      <CardGrid>
        {isLoading
          ? fakePatients.map((_, index) => <CardSkeleton key={index} />)
          : patients?.map(patient => (
              <PatientCard patient={patient} key={patient.id} />
            ))}
      </CardGrid>
    </Section>
  );
}
