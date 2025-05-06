import {
  Card,
  CardContent,
  CardFooter
} from '@/app/_components/ui/card';
import { CoachingNoteT } from '@/app/patients/_core/coaching-notes.definitions';
import { CoachingNoteCardActionMenu } from './CoachingNoteCardActionMenu';

type CoachingNoteCardProps = React.ComponentProps<typeof Card> & {
  coachingNote: CoachingNoteT;
};
export function CoachingNoteCard({
  className,
  coachingNote,
  ...props
}: CoachingNoteCardProps) {
  const { note, updatedAt } = coachingNote;

  return (
    <Card className={className} {...props}>
      {/* <CardHeader className="flex flex-row items-center justify-end">
        Button
      </CardHeader> */}
      <CardContent className="flex gap-2 items-start justify-between">
        <p className="grow">{note}</p>
        <CoachingNoteCardActionMenu coachingNote={coachingNote} />
      </CardContent>
      <CardFooter className="w-full justify-end">
        <p className="text-xs flex gap-2 items-center text-foreground/70">
          <span className="">{updatedAt.toLocaleDateString('en')}</span>
          <span>-</span>
          <span>{updatedAt.toLocaleTimeString('en')}</span>
        </p>
      </CardFooter>
    </Card>
  );
}
