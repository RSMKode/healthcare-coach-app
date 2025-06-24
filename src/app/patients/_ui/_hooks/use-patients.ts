'use client';

import { getPatientsUseCase, getPatientUseCase, addPatientUseCase, editPatientUseCase, deletePatientUseCase } from '@/_core/patients/patients.use-cases';
import { CACHE_TAGS } from '@/config/cache-tags.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';


type MutationOptionsT = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
  onMutate?: () => void;
};

export const useGetPatients = (options: { page?: number; pageSize?: number; query?: string }) => {
  const { page, pageSize, query } = options;

  return useQuery({
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
};

export const useGetPatient = (options: { patientId: string }) => {
  const { patientId } = options;

  return useQuery({
    queryKey: [CACHE_TAGS.patient, { patientId }],
    queryFn: () => getPatientUseCase({ patientId }),
  });
};

export const useAddPatient = (options?: MutationOptionsT) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
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
};

export const useEditPatient = (options?: MutationOptionsT) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: editPatientUseCase,
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_TAGS.patients],
      });
      queryClient.invalidateQueries({
        queryKey: [
          CACHE_TAGS.patient,
          {
            patientId: data?.id,
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
};

export const useDeletePatient = (options?: MutationOptionsT) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: deletePatientUseCase,
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({
        queryKey: [CACHE_TAGS.patients],
      });
      queryClient.invalidateQueries({
        queryKey: [
          CACHE_TAGS.patient,
          {
            patientId: data?.id,
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
};