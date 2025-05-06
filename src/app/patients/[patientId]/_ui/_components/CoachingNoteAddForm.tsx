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
import { CoachingNoteAddSchema } from '@/app/patients/_core/coaching-notes.definitions';
import { useCoachingNotes } from '@/app/patients/_ui/_hooks/use-coaching-notes';
import { usePatients } from '@/app/patients/_ui/_hooks/use-patients';
import { usePatientsContext } from '@/app/patients/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TbPlaylistAdd } from 'react-icons/tb';
import { z } from 'zod';

export const CoachingNoteAddFormSchema = CoachingNoteAddSchema.omit({
  patientId: true,
});
export type CoachingNoteAddFormT = z.infer<typeof CoachingNoteAddFormSchema>;

type CoachingNoteAddFormProps = {};
export default function CoachingNoteAddForm({}: CoachingNoteAddFormProps) {
  const { selectedPatient, setSelectedCoachingNoteAction } = usePatientsContext();
  if (!selectedPatient ) return null;
  const { addCoachingNote } = useCoachingNotes();
  const { mutate, isError, error, isPending } = addCoachingNote({
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
