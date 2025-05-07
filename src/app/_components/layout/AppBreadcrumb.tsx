'use client';

import Link from 'next/link';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import { ROUTES } from '@/config/routes.config';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';
import { TbHomeFilled } from 'react-icons/tb';
import { cn } from '../components.utils';
import { capitalizeFirstLetterFromEachWord } from '@/lib/presenter.lib';
import { flattenRoutes } from '@/lib/routes.lib';

export type AppBreadcrumbProps = {
  className?: string;
  homeLink?: string;
  color?: boolean;
};

export default function AppBreadcrumb({
  className,
  homeLink = ROUTES.home.self.path,
  color = false,
}: AppBreadcrumbProps) {
  const path = usePathname();
  const segments = path.split('/').filter(Boolean);
  const isMobile = useIsMobile();

  const flatRoutes = flattenRoutes(ROUTES);

  const lastSegment = segments[segments.length - 1] ?? '';
  const lastSegmentRoute = flatRoutes.find(route =>
    route.path.endsWith(lastSegment)
  );
  const LastSegmentIcon = lastSegmentRoute?.icon;
  const { name } = lastSegmentRoute ?? {};
  const lastSegmentRouteDisplay =
    name ?? capitalizeFirstLetterFromEachWord(lastSegment);
  return (
    <div className={cn('', className)}>
      <Breadcrumb>
        <BreadcrumbList
          className={cn(
            'text-foreground/70',
            color && 'text-foreground/60'
          )}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link
                href={homeLink}
                className={cn(color && 'hover:text-foreground')}>
                <TbHomeFilled className="size-4" />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {isMobile ? (
            <>
              {segments.length > 1 && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1">
                        <BreadcrumbEllipsis className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {segments.slice(0, -1).map((segment, index) => {
                          const href =
                            '/' + segments.slice(0, index + 1).join('/');
                          const routeData = flatRoutes.find(route =>
                            route.path.endsWith(segment)
                          );
                          const Icon = routeData?.icon;
                          const { name } = routeData ?? {};
                          const display =
                            name ?? capitalizeFirstLetterFromEachWord(segment);

                          console.log({ href });
                          return (
                            <Fragment key={href}>
                              <DropdownMenuItem className="gap-1" asChild>
                                <BreadcrumbItem>
                                  {Icon && <Icon className="size-4" />}
                                  <BreadcrumbLink asChild>
                                    <Link href={href}>{display}</Link>
                                  </BreadcrumbLink>
                                </BreadcrumbItem>
                              </DropdownMenuItem>
                              {index < segments.length - 2 && (
                                <DropdownMenuSeparator />
                              )}
                            </Fragment>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </BreadcrumbItem>
                </>
              )}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage
                  className={cn(
                    'flex items-center gap-1 text-foreground',
                    color && 'text-foreground'
                  )}>
                  {LastSegmentIcon && <LastSegmentIcon className="size-4" />}
                  {lastSegmentRouteDisplay}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : (
            segments.map((segment, index) => {
              const href = '/' + segments.slice(0, index + 1).join('/');
              const isLast = index === segments.length - 1;
              const routeData = flatRoutes.find(route =>
                route.path.endsWith(segment)
              );
              const Icon = routeData?.icon;
              const { name } = routeData ?? {};
              const display =
                name ?? capitalizeFirstLetterFromEachWord(segment);
              console.log({ href });

              return (
                <Fragment key={href}>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage
                        className={cn(
                          'flex items-center gap-1 text-foreground',
                          color && 'text-foreground'
                        )}>
                        {Icon && <Icon className="size-4" />}
                        {display}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          href={href}
                          className={cn(
                            'flex items-center gap-1',
                            color && 'hover:text-foreground'
                          )}>
                          {Icon && <Icon className="size-4" />}
                          {display}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </Fragment>
              );
            })
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
