import { paginationSearchParams } from '@/_shared/pagination.search-params';
import { CardGrid } from '@/app/_components/layout/CardGrid';
import InfoLabel from '@/app/_components/layout/InfoLabel';
import { Section } from '@/app/_components/layout/Section';
import { CardSkeleton } from '@/app/_components/skeletons/CardSkeleton';
import { PARAMS } from '@/config/params.config';
import { parseAsString, useQueryState, useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { usePatients } from '../_hooks/use-patients';
import { PatientCard } from './PatientCard';
import { PatientListPagination } from './PatientListPagination';

type PatientListProps = React.ComponentProps<typeof Section>;
export function PatientList({ ...props }: PatientListProps) {
  const [query] = useQueryState(PARAMS.query, parseAsString.withDefault(''));

  const [pagination] = useQueryStates(paginationSearchParams());
  const { page, pageSize } = pagination;

  const { getPatients } = usePatients();
  const { data, isLoading, isRefetching, isError, error } = getPatients({
    page,
    pageSize,
    query,
  });
  const { data: paginatedPatients } = data || {};
  const { data: patients, pageCount = 0 } = paginatedPatients || {};

  const fakePatientCount = pageSize || 12;
  const fakePatients = Array.from({ length: fakePatientCount });

  useEffect(() => {
    if (isError) {
      toast.error(error.message);
    }
  }, [isError, error]);

  console.log('patients', patients);

  const currentlyLoading = isLoading || isRefetching;

  return (
    <>
      {
        <CardGrid>
          {currentlyLoading
            ? fakePatients.map((_, index) => <CardSkeleton key={index} />)
            : patients?.map(patient => (
                <PatientCard patient={patient} key={patient.id} />
              ))}
        </CardGrid>
      }
      {(!patients || patients?.length === 0) && !currentlyLoading && (
        <InfoLabel>{`No patients found for "${query}"`}</InfoLabel>
      )}
      {patients?.length && <PatientListPagination pageCount={pageCount} />}
    </>
  );
}
