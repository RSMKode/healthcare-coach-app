'use client';


import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, PAGINATION_OPTIONS } from '@/_core/_shared/pagination.search-params';
import { cn } from '@/app/_components/components.utils';
import { Button } from '@/app/_components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select';
import Spinner from '@/app/_components/ui/spinner';
import { useQueryState, parseAsInteger } from 'nuqs';
import { useTransition } from 'react';
import {
  RxChevronLeft,
  RxChevronRight,
  RxDoubleArrowLeft,
  RxDoubleArrowRight,
} from 'react-icons/rx';

interface PatientListPaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  pageCount: number;
}

export const PatientListPagination = ({
  pageCount,
  className,
  ...props
}: PatientListPaginationProps) => {
  const [isPending, startTransition] = useTransition();

  const queryStateOptions = {
    startTransition,
  };

  const [pageIndex, setPageIndex] = useQueryState(
    'page',
    parseAsInteger
      .withDefault(DEFAULT_PAGE_INDEX)
      .withOptions(queryStateOptions)
  );

  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    parseAsInteger.withDefault(DEFAULT_PAGE_SIZE).withOptions(queryStateOptions)
  );
  const updatePageSize = (value: number) => {
    setPageSize(value);
    setPageIndex(1);
  };

  const pageSizeOptions = PAGINATION_OPTIONS;

  const canPreviousPage = pageIndex > 1;
  const canNextPage = pageIndex < pageCount;

  const firstPage = () => setPageIndex(1);
  const lastPage = () => setPageIndex(pageCount);
  const previousPage = () => {
    canPreviousPage && setPageIndex(prev => prev - 1);
  };
  const nextPage = () => {
    canNextPage && setPageIndex(prev => prev + 1);
  };

  return (
    <div
      className={cn(
        'flex w-full flex-wrap items-center justify-end gap-x-2 gap-y-1 px-2',
        className
      )}
      {...props}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 lg:gap-x-6">
        <div className="flex items-center gap-x-2">
          <p className="hidden text-sm font-medium lg:block">
            Registros por página
          </p>
          <Select
            value={`${pageSize}`}
            onValueChange={value => updatePageSize(+value)}>
            <SelectTrigger className="h-fit w-fit gap-1 border-foreground/30 px-2 py-1 transition hover:border-primary/70">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize || 'All'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* <ComboBox
          className="py-1!"
            label="Registros"
            defaultSelected={`${pageSize}`}
            onChange={(selected) => updatePageSize(+selected)}
            options={pageSizeOptions.map((option) => ({
              label: `${option}`,
              value: `${option}`,
            }))}
          /> */}
        </div>
        <div className="hidden items-center justify-center gap-2 text-sm font-medium lg:flex">
          Página {pageIndex} de {pageCount}
        </div>
        <div className="flex items-center justify-center gap-1 text-sm font-medium lg:hidden">
          {/* <span className="">P.</span> */}
          {pageIndex} <span>de</span>
          {pageCount}
        </div>
        <div className="flex items-center gap-x-2">
          {isPending && <Spinner className="size-5" />}
          <Button
            variant="default"
            size="icon"
            onClick={() => firstPage()}
            disabled={!canPreviousPage}>
            <span className="sr-only">Ir a la primera página</span>
            <RxDoubleArrowLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}>
            <span className="sr-only">Ir a la página anterior</span>
            <RxChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={() => nextPage()}
            disabled={!canNextPage}>
            <span className="sr-only">Ir a la página siguiente</span>
            <RxChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="default"
            size="icon"
            onClick={() => lastPage()}
            disabled={!canNextPage}>
            <span className="sr-only">Ir a la última página</span>
            <RxDoubleArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

PatientListPagination.displayName = 'PatientListPagination';
