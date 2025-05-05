'use client';

import { CACHE_TAGS } from '@/config/cache-tags.config';
import { useQuery } from '@tanstack/react-query';
import {
  getPatientByIdUseCase,
  getPatientsUseCase,
} from '../_core/patients.use-cases';

export const usePatients = () => {
  const getMany = (options: {
    page?: number;
    pageSize?: number;
    query?: string;
  }) => {
    const { page, pageSize, query } = options;

    const queryFn = useQuery({
      queryKey: [CACHE_TAGS.patients, `page-${page}`, `pageSize-${pageSize}`, `query-${query}`],
      queryFn: () => getPatientsUseCase(options),
    });
    return queryFn;
  };

  const getById = (patientId: string) => {
    const query = useQuery({
      queryKey: [CACHE_TAGS.patients, patientId],
      queryFn: () => getPatientByIdUseCase({ patientId }),
    });
    return query;
  };

  return { getMany, getById };
};
