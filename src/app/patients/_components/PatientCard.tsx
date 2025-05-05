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
import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar';
import { getInitialsFromName } from '@/lib/presenter.lib';

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
        <div className="flex gap-2 items-center">
          <Avatar className="size-10">
            <AvatarFallback>{getInitialsFromName(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{age} years old</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p>{primaryCondition}</p>
      </CardContent>
      {/* <CardFooter>
      </CardFooter> */}
    </Card>
  );
}
