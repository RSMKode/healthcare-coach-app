'use client';

import { CACHE_TAGS } from '@/config/cache-tags.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  addPatientUseCase,
  deletePatientUseCase,
  getPatientUseCase,
  getPatientsUseCase,
  editPatientUseCase,
} from '../../_core/patients.use-cases';

type MutationOptionsT = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
  onMutate?: () => void;
};
export const usePatients = () => {
  const queryClient = useQueryClient();

  const getPatients = (options: {
    page?: number;
    pageSize?: number;
    query?: string;
  }) => {
    const { page, pageSize, query } = options;

    const queryFn = useQuery({
      queryKey: [
        CACHE_TAGS.patients,
        {
          page,
          pageSize,
          query,
        },
      ],
      queryFn: () => getPatientsUseCase(options),
      retry: 1,
      retryDelay: 100,
    });
    return queryFn;
  };

  const getPatient = (options: { patientId: string }) => {
    const { patientId } = options;
    const query = useQuery({
      queryKey: [CACHE_TAGS.patient, { patientId }],
      queryFn: () => getPatientUseCase({ patientId }),
    });
    return query;
  };

  const addPatient = (options?: MutationOptionsT) => {
    const { onSuccess, onError } = options || {};
    const mutation = useMutation({
      mutationFn: addPatientUseCase,
      onSuccess: ({ data, message }) => {
        queryClient.invalidateQueries({
          queryKey: [CACHE_TAGS.patients],
        });
        message && toast.success(message);
        onSuccess?.();
      },
      onError: err => {
        const error = err as Error;
        toast.error(error.message);
        onError?.();
      },
    });
    return mutation;
  };

  const editPatient = (options?: MutationOptionsT) => {
    const { onSuccess, onError } = options || {};
    const mutation = useMutation({
      mutationFn: editPatientUseCase,
      onSuccess: ({ data, message }) => {
        queryClient.invalidateQueries({
          queryKey: [CACHE_TAGS.patients],
        });
        queryClient.invalidateQueries({
          queryKey: [
            CACHE_TAGS.patient,
            {
              patientId: data.id,
            },
          ],
        });
        message && toast.success(message);
        onSuccess?.();
      },
      onError: err => {
        const error = err as Error;
        toast.error(error.message);
        onError?.();
      },
    });
    return mutation;
  };
  const deletePatient = (options?: MutationOptionsT) => {
    const { onSuccess, onError } = options || {};
    const mutation = useMutation({
      mutationFn: deletePatientUseCase,
      onSuccess: ({ data, message }) => {
        queryClient.invalidateQueries({
          queryKey: [CACHE_TAGS.patients],
        });
        queryClient.invalidateQueries({
          queryKey: [
            CACHE_TAGS.patient,
            {
              patientId: data.id,
            },
          ],
        });
        message && toast.success(message);
        onSuccess?.();
      },
      onError: err => {
        const error = err as Error;
        toast.error(error.message);
        onError?.();
      },
    });
    return mutation;
  };

  return {
    getPatients,
    getPatient,
    addPatient,
    editPatient,
    deletePatient,
  };
};
