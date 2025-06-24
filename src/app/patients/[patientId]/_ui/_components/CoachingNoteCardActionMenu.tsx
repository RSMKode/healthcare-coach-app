import { CoachingNoteT } from '@/_core/coaching-notes/coaching-notes.definitions';
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
import { usePatientsContext } from '@/app/patients/context';
import { ComponentProps, useState } from 'react';
import { TbDots, TbEdit, TbNote, TbTrash } from 'react-icons/tb';

type CoachingNoteCardActionMenuProps = ComponentProps<typeof Button> & {
  coachingNote: CoachingNoteT;
};

const CoachingNoteCardActionMenu = ({
  coachingNote,
  disabled,
  className,
  ...props
}: CoachingNoteCardActionMenuProps) => {
  const { setSelectedCoachingNoteAction, setSelectedCoachingNote } =
    usePatientsContext();

  const title = 'Note actions';

  const coachingNoteActions = [
    {
      label: 'Edit',
      icon: TbEdit,
      onClick: () => {
        setSelectedCoachingNote(coachingNote);
        setSelectedCoachingNoteAction('edit');
      },
    },
    {
      label: 'Delete',
      icon: TbTrash,
      destructive: true,
      onClick: () => {
        setSelectedCoachingNote(coachingNote);
        setSelectedCoachingNoteAction('delete');
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
            <TbNote className="size-5" />
            <span>{title}</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col gap-1">
            {coachingNoteActions.map(action => {
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
export { CoachingNoteCardActionMenu };

