'use client';

import ErrorLabel from '@/app/_components/layout/ErrorLabel';
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
import { toast } from 'sonner';
import { z } from 'zod';
import { PatientAddSchema } from '../_core/patients.definitions';
import { usePatients } from '../_hooks/use-patients';

export const PatientUpdateFormSchema = PatientAddSchema;
export type PatientUpdateFormT = z.infer<typeof PatientUpdateFormSchema>;

type PatientUpdateFormProps = {
  patient: PatientUpdateFormT;
};
export default function PatientUpdateForm({ patient }: PatientUpdateFormProps) {
  const { add: addPatient } = usePatients();
  const { mutate, isError, error, isPending, data } = addPatient();

  const form = useForm<PatientUpdateFormT>({
    resolver: zodResolver(PatientUpdateFormSchema),
    defaultValues: {
      name: patient.name,
      age: patient.age,
      primaryCondition: patient.primaryCondition ?? '',
    },
  });

  function onSubmit(values: PatientUpdateFormT) {
    mutate(values);
    toast.dismiss();
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
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
                  <Input placeholder="18" {...field} />
                </FormControl>
                <FormDescription>
                  The primary condition that the patient is being treated for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      {isError && <ErrorLabel>{error?.message}</ErrorLabel>}
    </>
  );
}
