import { paginationSearchParams } from '@/_shared/pagination.search-params';
import { CardGrid } from '@/app/_components/layout/CardGrid';
import { Section } from '@/app/_components/layout/Section';
import { useQueryStates } from 'nuqs';
import { CardSkeleton } from '@/app/_components/skeletons/CardSkeleton';
import { PatientCard } from './PatientCard';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { usePatients } from '../_hooks/use-patients';
import { PatientListPagination } from './PatientListPagination';

type PatientListProps = React.ComponentProps<typeof Section>;
export function PatientList({ ...props }: PatientListProps) {
  const [pagination] = useQueryStates(paginationSearchParams());
  const { page, pageSize } = pagination;

  const { getMany: patientsGetMany } = usePatients();
  const {
    data: paginatedPatients,
    isLoading,
    isError,
    error,
  } = patientsGetMany({
    page,
    pageSize,
  });
  const { data: patients, pageCount = 0 } = paginatedPatients || {};

  const fakePatientCount = pageSize || 12;
  const fakePatients = Array.from({ length: fakePatientCount });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  console.log('patients', patients);

  return (
    <>
      <CardGrid>
        {isLoading
          ? fakePatients.map((_, index) => <CardSkeleton key={index} />)
          : patients?.map(patient => (
              <PatientCard patient={patient} key={patient.id} />
            ))}
      </CardGrid>
      <PatientListPagination pageCount={pageCount} />
    </>
  );
}
