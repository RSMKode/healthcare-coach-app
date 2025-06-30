import { PatientT } from '@/_core/patients/patients.definitions';
import { Avatar, AvatarFallback } from '@/app/_components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { getInitialsFromName } from '@/lib/presenter.lib';

type PatientDetailsProps = React.ComponentProps<typeof Card> & {
  patient: PatientT;
};
export function PatientDetails({
  className,
  patient,
  ...props
}: PatientDetailsProps) {
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
      </CardHeader>
      <CardContent>
        <p>{primaryCondition}</p>
      </CardContent>
      <CardFooter className="w-full justify-end"></CardFooter>
    </Card>
  );
}
