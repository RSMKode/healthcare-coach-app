'use client';

import { CACHE_TAGS } from '@/config/cache-tags.config';
import {
  useMutation,
  UseMutationOptions,
  useQuery,
} from '@tanstack/react-query';
import {
  addPatientUseCase,
  getPatientByIdUseCase,
  getPatientsUseCase,
  updatePatientUseCase,
} from '../_core/patients.use-cases';
import { PatientAddT } from '../_core/patients.definitions';
import { toast } from 'sonner';

export const usePatients = () => {
  const getMany = (options: {
    page?: number;
    pageSize?: number;
    query?: string;
  }) => {
    const { page, pageSize, query } = options;

    const queryFn = useQuery({
      queryKey: [
        CACHE_TAGS.patients,
        CACHE_TAGS.ALL,
        {
          page,
          pageSize,
          query,
        },
      ],
      queryFn: () => getPatientsUseCase(options),
    });
    return queryFn;
  };

  const getById = (patientId: string) => {
    const query = useQuery({
      queryKey: [CACHE_TAGS.patients, CACHE_TAGS.ALL, { patientId }],
      queryFn: () => getPatientByIdUseCase({ patientId }),
    });
    return query;
  };

  const add = () =>
    // options?: Pick<
    //   UseMutationOptions<void, unknown, PatientAddT>,
    //   'onMutate' | 'onError' | 'onSettled' | 'onSuccess'
    // >
    {
      // const { onSuccess, onError, onSettled } = options || {};

      const mutation = useMutation({
        mutationFn: addPatientUseCase,
        onSuccess: data => {
          const { message } = data;
          message && toast.success(message);
        },
        onError: err => {
          const error = err as Error;
          toast.error(error.message);
        },
      });
      return mutation;
    };

  const update = () =>
    // options?: Pick<
    //   UseMutationOptions<void, unknown, PatientAddT>,
    //   'onMutate' | 'onError' | 'onSettled' | 'onSuccess'
    // >
    {
      // const { onSuccess, onError, onSettled } = options || {};

      const mutation = useMutation({
        mutationFn: updatePatientUseCase,
        onSuccess: data => {
          const { message } = data;
          message && toast.success(message);
        },
        onError: err => {
          const error = err as Error;
          toast.error(error.message);
        },
      });
      return mutation;
    };

  return { getMany, getById, add, update };
};
