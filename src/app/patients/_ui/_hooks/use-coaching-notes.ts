'use client';

import { CACHE_TAGS } from '@/config/cache-tags.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  addCoachingNoteUseCase,
  deleteCoachingNoteUseCase,
  editCoachingNoteUseCase,
  getCoachingNotesUseCase,
  getCoachingNoteUseCase,
} from '../../_core/coaching-notes/coaching-notes.use-cases';

type MutationOptionsT = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
  onMutate?: () => void;
};

export const useGetCoachingNotes = (options: { patientId: string }) => {
  const { patientId } = options;

  return useQuery({
    queryKey: [
      CACHE_TAGS.coachingNotes,
      {
        patientId,
      },
    ],
    queryFn: () => getCoachingNotesUseCase(options),
    retry: false,
    // retry: 1,
    // retryDelay: 100,
  });
};

export const useGetCoachingNote = (options: { coachingNoteId: string }) => {
  const { coachingNoteId } = options;

  return useQuery({
    queryKey: [CACHE_TAGS.coachingNote, { coachingNoteId }],
    queryFn: () => getCoachingNoteUseCase({ coachingNoteId }),
  });
};

export const useAddCoachingNote = (options?: MutationOptionsT) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: addCoachingNoteUseCase,
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({
        queryKey: [
          CACHE_TAGS.coachingNotes,
          {
            patientId: data?.patientId,
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

export const useEditCoachingNote = (options?: MutationOptionsT) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: editCoachingNoteUseCase,
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({
        queryKey: [
          CACHE_TAGS.coachingNotes,
          {
            patientId: data?.patientId,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          CACHE_TAGS.coachingNote,
          {
            coachingNoteId: data?.id,
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

export const useDeleteCoachingNote = (options?: MutationOptionsT) => {
  const queryClient = useQueryClient();
  const { onSuccess, onError } = options || {};

  return useMutation({
    mutationFn: deleteCoachingNoteUseCase,
    onSuccess: ({ data, message }) => {
      queryClient.invalidateQueries({
        queryKey: [
          CACHE_TAGS.coachingNotes,
          {
            patientId: data?.patientId,
          },
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          CACHE_TAGS.coachingNote,
          {
            coachingNoteId: data?.id,
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
