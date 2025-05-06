import { TransitionStartFunction } from 'react';

export type SearchParamsOptionsT = {
  history?: 'push' | 'replace';
  scroll?: boolean;
  shallow?: boolean;
  throttleMs?: number;
  startTransition?: TransitionStartFunction;
  clearOnDefault?: boolean;
};

export const DEFAULT_SEARCH_PARAMS_OPTIONS = {
  shallow: false,
};

export const PARAMS = {
  query: 'query',
  pagination: {
    self: 'pagination',
    page: 'page',
    pageSize: 'pageSize',
  },
} as const;
