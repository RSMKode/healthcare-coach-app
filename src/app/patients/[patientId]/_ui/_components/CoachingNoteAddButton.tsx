import { Button } from '@/app/_components/ui/button';
import { usePatientsContext } from '@/app/patients/context';
import { TbPlaylistAdd } from 'react-icons/tb';

export default function CoachingNoteAddButton() {
  const { setSelectedCoachingNoteAction } = usePatientsContext();

  const coachingNoteAction = {
    label: 'Add CoachingNote',
    icon: TbPlaylistAdd,
    onClick: () => {
      setSelectedCoachingNoteAction('add');
    },
  };
  const { label, icon: Icon, onClick } = coachingNoteAction;

  return (
    <Button onClick={() => onClick()}>
      <span>{label}</span>
      <Icon className="size-4" />
    </Button>
  );
}
