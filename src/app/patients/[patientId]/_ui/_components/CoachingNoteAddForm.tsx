'use client';

import ErrorLabel from '@/app/_components/layout/ErrorLabel';
import { Button } from '@/app/_components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { CoachingNoteAddSchema } from '@/app/patients/_core/coaching-notes/coaching-notes.definitions';
import { useAddCoachingNote } from '@/app/patients/_ui/_hooks/use-coaching-notes';
import { usePatientsContext } from '@/app/patients/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TbPlaylistAdd } from 'react-icons/tb';
import { z } from 'zod';

export const CoachingNoteAddFormSchema = CoachingNoteAddSchema.omit({
  patientId: true,
});
export type CoachingNoteAddFormT = z.infer<typeof CoachingNoteAddFormSchema>;

export default function CoachingNoteAddForm() {
  const { selectedPatient, setSelectedCoachingNoteAction } = usePatientsContext();
  const { mutate, isError, error, isPending } = useAddCoachingNote({
    onSuccess: () => {
      setSelectedCoachingNoteAction(null);
    },
  });
  
  const form = useForm<CoachingNoteAddFormT>({
    resolver: zodResolver(CoachingNoteAddFormSchema),
    defaultValues: {
      note: '',
    },
  });
  if (!selectedPatient ) return null;

  function onSubmit(values: CoachingNoteAddFormT) {
    if (!selectedPatient) {
      return;
    }
    mutate({
      ...values,
      patientId: selectedPatient.id,
    });
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your note here..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" isPending={isPending} className="w-full">
            <span>Submit</span>
            <TbPlaylistAdd className="size-4" />
          </Button>
        </form>
      </Form>
      {isError && <ErrorLabel>{error?.message}</ErrorLabel>}
    </>
  );
}
