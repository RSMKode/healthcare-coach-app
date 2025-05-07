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
import {
  CoachingNoteEditSchema,
  CoachingNoteT,
} from '@/app/patients/_core/coaching-notes/coaching-notes.definitions';
import { PatientT } from '@/app/patients/_core/patients/patients.definitions';
import { useEditCoachingNote } from '@/app/patients/_ui/_hooks/use-coaching-notes';
import { usePatientsContext } from '@/app/patients/context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TbPlaylistAdd } from 'react-icons/tb';
import { z } from 'zod';

export const CoachingNoteEditFormSchema = CoachingNoteEditSchema.omit({
  id: true,
  patientId: true,
});
export type CoachingNoteEditFormT = z.infer<typeof CoachingNoteEditFormSchema>;

type CoachingNoteEditFormProps = {
  patient: PatientT;
  coachingNote: CoachingNoteT;
};
export default function CoachingNoteEditForm({
  patient,
  coachingNote,
}: CoachingNoteEditFormProps) {
  const { setSelectedCoachingNoteAction, setSelectedCoachingNote } =
    usePatientsContext();

  const { mutate, isError, error, isPending } = useEditCoachingNote({
    onSuccess: () => {
      setSelectedCoachingNote(null);
      setSelectedCoachingNoteAction(null);
    },
  });

  const form = useForm<CoachingNoteEditFormT>({
    resolver: zodResolver(CoachingNoteEditFormSchema),
    defaultValues: {
      note: coachingNote.note,
    },
  });

  function onSubmit(values: CoachingNoteEditFormT) {
    mutate({
      ...values,
      id: coachingNote.id,
      patientId: patient.id,
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
