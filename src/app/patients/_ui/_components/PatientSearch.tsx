import { Input } from '@/app/_components/ui/input';
import Spinner from '@/app/_components/ui/spinner';
import { PARAMS } from '@/config/params.config';
import { parseAsString, useQueryState } from 'nuqs';
import { useTransition } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export default function PatientSearch() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useQueryState(
    PARAMS.query,
    parseAsString.withDefault('').withOptions({
      startTransition,
    })
  );
  const debouncedSetQuery = useDebouncedCallback(setQuery, 300);

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        type="search"
        defaultValue={query}
        onInput={e => {
          const value = (e.target as HTMLInputElement).value;
          debouncedSetQuery(value);
        }}
        placeholder="Search patients by name, primary condition or age..."
      />
      {isPending && <Spinner className="size-6" />}
      {/* {query && (
        <Button variant="ghost" onClick={() => setQuery('')}>
          <TbX className="size-4" />
        </Button>
      )} */}
    </div>
  );
}
