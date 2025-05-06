'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { toast } from 'sonner';
import { PatientAddSchema, PatientSchema } from '../_core/patients.definitions';
import { Input } from '@/app/_components/ui/input';
import { error } from 'console';
import { isError } from 'util';
import { usePatients } from '../_hooks/use-patients';
import ErrorLabel from '@/app/_components/layout/ErrorLabel';

export const PatientAddFormSchema = PatientAddSchema;
export type PatientAddFormT = z.infer<typeof PatientAddFormSchema>;

type PatientAddFormProps = {};
export default function PatientAddForm({}: PatientAddFormProps) {
  const { add: addPatient } = usePatients();
  const { mutate, isError, error, isPending, data } = addPatient();

  const form = useForm<PatientAddFormT>({
    resolver: zodResolver(PatientAddFormSchema),
    defaultValues: {
      name: '',
      age: undefined,
      primaryCondition: '',
    },
  });

  function onSubmit(values: PatientAddFormT) {
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
