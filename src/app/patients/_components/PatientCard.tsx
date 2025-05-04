import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import React from 'react';
import { PatientT } from '../_core/patients.definitions';

type PatientCardProps = React.ComponentProps<typeof Card> & {
  patient: PatientT;
};
export function PatientCard({
  className,
  patient,
  ...props
}: PatientCardProps) {
  const { name, age, primaryCondition } = patient;

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{age} years old</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{primaryCondition}</p>
      </CardContent>
      {/* <CardFooter>
      </CardFooter> */}
    </Card>
  );
}
