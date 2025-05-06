import { cn } from '@/app/_components/components.utils';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { ComponentProps, useState } from 'react';
import {
  TbDots,
  TbEdit,
  TbTrash,
  TbUser
} from 'react-icons/tb';
import { PatientT } from '../../_core/patients.definitions';
import { usePatientsContext } from '../../context';

type PatientCardActionMenuProps = ComponentProps<typeof Button> & {
  patient: PatientT;
};

const PatientCardActionMenu = ({
  patient,
  disabled,
  className,
  ...props
}: PatientCardActionMenuProps) => {
  const { setSelectedPatientAction, setSelectedPatient} = usePatientsContext();

  const title = 'Patient actions';

  const patientActions = [
    {
      label: 'Edit',
      icon: TbEdit,
      onClick: () => {
        setSelectedPatient(patient);
        setSelectedPatientAction('edit');
      },
    },
    {
      label: 'Delete',
      icon: TbTrash,
      destructive: true,
      onClick: () => {
        setSelectedPatient(patient);
        setSelectedPatientAction('delete');
      },
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            variant={'ghost'}
            size={'sm'}
            border={2}
            className={cn('', className)}
            tooltip={title}
            {...props}>
            <TbDots className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="border-2 bg-background/70 backdrop-blur-sm"
          onCloseAutoFocus={e => e.preventDefault()}
          align="end">
          <DropdownMenuLabel className="flex items-center gap-2">
            <TbUser className="size-5" />
            <span>{title}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col gap-1">
            {patientActions.map(action => {
              const { label, icon: Icon, destructive, onClick } = action;
              return (
                <DropdownMenuItem
                  onClick={e => {
                    e.preventDefault();
                    setDropdownOpen(false);
                    onClick?.();
                  }}
                  key={label}
                  variant={destructive ? 'destructive' : 'default'}>
                  <span>{label}</span>
                  <Icon className="size-5" />
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export { PatientCardActionMenu };

