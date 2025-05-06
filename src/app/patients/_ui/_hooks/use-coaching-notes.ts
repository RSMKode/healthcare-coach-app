'use client';

import { CACHE_TAGS } from '@/config/cache-tags.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  addCoachingNoteUseCase,
  editCoachingNoteUseCase,
  deleteCoachingNoteUseCase,
  getCoachingNotesUseCase,
  getCoachingNoteUseCase,
} from '../../_core/coaching-notes.use-cases';
import page from '@/app/page';

type MutationOptionsT = {
  onSuccess?: () => void;
  onError?: () => void;
  onSettled?: () => void;
  onMutate?: () => void;
};
export const useCoachingNotes = () => {
  const queryClient = useQueryClient();

  const getCoachingNotes = (options: { patientId: string }) => {
    const { patientId } = options;

    const queryFn = useQuery({
      queryKey: [
        CACHE_TAGS.coachingNotes,
        {
          patientId,
        },
      ],
      queryFn: () => getCoachingNotesUseCase(options),
      retry: 1,
      retryDelay: 100,
    });
    return queryFn;
  };

  const getCoachingNote = (options: { coachingNoteId: string }) => {
    const { coachingNoteId } = options;
    const query = useQuery({
      queryKey: [CACHE_TAGS.coachingNote, { coachingNoteId }],
      queryFn: () => getCoachingNoteUseCase({ coachingNoteId }),
    });
    return query;
  };

  const addCoachingNote = (options?: MutationOptionsT) => {
    const { onSuccess, onError } = options || {};
    const mutation = useMutation({
      mutationFn: addCoachingNoteUseCase,
      onSuccess: ({ data, message }) => {
        queryClient.invalidateQueries({
          queryKey: [
            CACHE_TAGS.coachingNotes,
            {
              patientId: data.patientId,
            },
          ],
        });
        // queryClient.invalidateQueries({
        //   queryKey: [
        //     CACHE_TAGS.patient,
        //     {
        //       patientId: data.patientId,
        //     },
        //   ],
        // });
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

  const editCoachingNote = (options?: MutationOptionsT) => {
    const { onSuccess, onError } = options || {};
    const mutation = useMutation({
      mutationFn: editCoachingNoteUseCase,
      onSuccess: ({ data, message }) => {
        queryClient.invalidateQueries({
          queryKey: [
            CACHE_TAGS.coachingNotes,
            {
              patientId: data.patientId,
            },
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            CACHE_TAGS.coachingNote,
            {
              coachingNoteId: data.id,
            },
          ],
        });
        // queryClient.invalidateQueries({
        //   queryKey: [
        //     CACHE_TAGS.patient,
        //     {
        //       patientId: data.patientId,
        //     },
        //   ],
        // });
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
  const deleteCoachingNote = (options?: MutationOptionsT) => {
    const { onSuccess, onError } = options || {};
    const mutation = useMutation({
      mutationFn: deleteCoachingNoteUseCase,
      onSuccess: ({ data, message }) => {
        queryClient.invalidateQueries({
          queryKey: [
            CACHE_TAGS.coachingNotes,
            {
              patientId: data.patientId,
            },
          ],
        });
        queryClient.invalidateQueries({
          queryKey: [
            CACHE_TAGS.coachingNote,
            {
              coachingNoteId: data.id,
            },
          ],
        });
        // queryClient.invalidateQueries({
        //   queryKey: [
        //     CACHE_TAGS.patient,
        //     {
        //       patientId: data.patientId,
        //     },
        //   ],
        // });
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
    getCoachingNotes,
    getCoachingNote,
    addCoachingNote,
    editCoachingNote,
    deleteCoachingNote,
  };
};
