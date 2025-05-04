import { CACHE_TAGS } from '@/config/cache-tags.config';
import { useQuery } from '@tanstack/react-query';
import { getPatientById, getPatients } from './patients.db';

export const useGetPatients = (options: {
  page?: number;
  pageSize?: number;
  query?: string;
}) => {
  const query = useQuery({
    queryKey: [CACHE_TAGS.patients],
    queryFn: () => getPatients(options),
  });
  return query;
};

export const useGetPatientById = (patientId: string) => {
  const query = useQuery({
    queryKey: [CACHE_TAGS.patient, patientId],
    queryFn: () => getPatientById(patientId),
  });
  return query;
};
