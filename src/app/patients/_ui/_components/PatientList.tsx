import { paginationSearchParams } from '@/_shared/pagination.search-params';
import { CardGrid } from '@/app/_components/layout/CardGrid';
import InfoLabel from '@/app/_components/layout/InfoLabel';
import { Section } from '@/app/_components/layout/Section';
import { CardSkeleton } from '@/app/_components/skeletons/CardSkeleton';
import { PARAMS } from '@/config/params.config';
import { parseAsString, useQueryState, useQueryStates } from 'nuqs';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { PatientCard } from './PatientCard';
import { PatientListPagination } from './PatientListPagination';
import { useGetPatients } from '../_hooks/use-patients';
import { cn } from '@/app/_components/components.utils';

type PatientListProps = React.ComponentProps<typeof Section>;
export function PatientList() {
  const [query] = useQueryState(PARAMS.query, parseAsString.withDefault(''));

  const [pagination] = useQueryStates(paginationSearchParams());
  const { page, pageSize } = pagination;

  const { data, isLoading, isRefetching, isError, error } = useGetPatients({
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

  // const isCurrentlyLoading = isLoading || isRefetching;
  const isCurrentlyLoading = isLoading;

  return (
    <Section className="">
      {
        <CardGrid className="px-1">
          {isCurrentlyLoading
            ? fakePatients.map((_, index) => <CardSkeleton key={index} />)
            : patients?.map(patient => (
                <PatientCard patient={patient} key={patient.id} />
              ))}
        </CardGrid>
      }
      {(!patients || patients?.length === 0) && !isCurrentlyLoading && (
        <InfoLabel>{`No patients found for "${query}"`}</InfoLabel>
      )}
      {/* {patients?.length && ( */}
      <PatientListPagination
        pageCount={pageCount}
        className={cn(
          'bottom-0 sticky py-2 px-1 bg-background/75 backdrop-blur rounded-t-lg',
          pageCount <= 0 && 'opacity-60 pointer-events-none'
        )}
      />
      {/* )} */}
    </Section>
  );
}
