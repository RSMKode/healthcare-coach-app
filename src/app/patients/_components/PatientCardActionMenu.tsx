import { Button } from '@/app/_components/ui/button';
import { PatientT } from '../_core/patients.definitions';
import {
  TbDots,
  TbEdit,
  TbPrinter,
  TbTrash,
  TbUser,
  TbUserPlus,
} from 'react-icons/tb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { cn } from '@/app/_components/components.utils';
import { ComponentProps, useState } from 'react';
import { AppAlertDialog } from '@/app/_components/layout/AppAlertDialog';
import { set } from 'zod';

type PatientCardActionMenuProps = ComponentProps<typeof Button> & {
  patient: PatientT;
};

const PatientCardActionMenu = ({
  patient,
  disabled,
  className,
  ...props
}: PatientCardActionMenuProps) => {
  const [patientAction, setPatientAction] = useState<
    'edit' | 'delete' | 'add' | null
  >(null);
  console.log('PatientCardActionMenu', patientAction);
  const title = 'Patient actions';
  const userActions = [
    {
      label: 'Edit',
      icon: TbEdit,
      destructive: false,
      onClick: () => {
        setPatientAction('edit');
      },
    },
    {
      label: 'Delete',
      icon: TbTrash,
      destructive: true,
      onClick: () => {
        setPatientAction('delete');
      },
    },
    // { label: 'Add', icon: TbUserPlus, destructive: false },
  ];

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={'ghost'}
            size={'sm'}
            border={2}
            className={cn('', className)}
            tooltip={title}
            {...props}>
            <TbDots className="size-4" />
            {/* <TbDots className="size-5" /> */}
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
          <DropdownMenuGroup>
            {userActions.map(action => {
              const { label, icon: Icon, destructive, onClick } = action;
              return (
                <DropdownMenuItem
                  onClick={onClick}
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
      <AppAlertDialog
        open={patientAction === 'delete'}
        onActionClick={() => {
          alert('Delete patient action clicked');
          setPatientAction(null);
        }}
        onCancelClick={() => setPatientAction(null)}
        title="Delete Patient"
        description="Are you sure you want to delete this patient? This action cannot be undone."
        actionButtonChildren={
          <span className="flex items-center gap-2">
            Delete Patient
            <TbTrash className="size-5" />
          </span>
        }
      />
    </>
  );
};
export { PatientCardActionMenu };
