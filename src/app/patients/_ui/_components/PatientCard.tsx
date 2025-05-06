import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import React from 'react';
import { PatientT } from '../../_core/patients.definitions';
import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar';
import { getInitialsFromName } from '@/lib/presenter.lib';
import { Button } from '@/app/_components/ui/button';
import { ROUTES } from '../../../../config/routes.config';
import { TbArrowLeftFromArc, TbLink } from 'react-icons/tb';
import Link from 'next/link';
import { PatientCardActionMenu } from './PatientCardActionMenu';

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
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex gap-2 items-center">
          <Avatar className="size-10">
            <AvatarFallback>{getInitialsFromName(name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <CardTitle>{name}</CardTitle>
            <CardDescription>{age} years old</CardDescription>
          </div>
        </div>
        <PatientCardActionMenu patient={patient} className='self-start'/>
      </CardHeader>
      <CardContent>
        <p>{primaryCondition}</p>
      </CardContent>
      <CardFooter className="w-full justify-end">
        <Button variant="link" asChild>
          <Link
            href={ROUTES.patients.patientId.self.path.replace(
              ':patientId',
              patient.id
            )}>
            <span>View Details</span>
            <TbArrowLeftFromArc className="size-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
