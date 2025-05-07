'use client';

import ErrorLabel from '@/app/_components/layout/ErrorLabel';
import { Button } from '@/app/_components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PatientAddSchema, PatientT } from '../../_core/patients/patients.definitions';
import { usePatientsContext } from '../../context';
import { TbEdit } from 'react-icons/tb';
import { useEditPatient } from '../_hooks/use-patients';

export const PatientAddFormSchema = PatientAddSchema;
export type PatientAddFormT = z.infer<typeof PatientAddFormSchema>;

type PatientAddFormProps = {
  patient: PatientT;
};
export default function PatientAddForm({ patient }: PatientAddFormProps) {
  const { setSelectedPatientAction } = usePatientsContext();
  const { mutate, isError, error, isPending } = useEditPatient({
    onSuccess: () => {
      setSelectedPatientAction(null);
    },
  });

  const form = useForm<PatientAddFormT>({
    resolver: zodResolver(PatientAddFormSchema),
    defaultValues: {
      name: patient.name,
      age: patient.age,
      primaryCondition: patient.primaryCondition ?? '',
    },
  });

  function onSubmit(values: PatientAddFormT) {
    mutate({ id: patient.id, ...values });
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Alex" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="18" type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="primaryCondition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Primary Condition</FormLabel>
                <FormControl>
                  <Input placeholder="Diabetes" {...field} />
                </FormControl>
                <FormDescription>
                  The primary condition that the patient is being treated for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" isPending={isPending} className="w-full">
            <span>Edit</span>
            <TbEdit className="size-4" />
          </Button>
        </form>
      </Form>
      {isError && <ErrorLabel>{error?.message}</ErrorLabel>}
    </>
  );
}
