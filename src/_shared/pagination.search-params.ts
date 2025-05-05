import {
  SearchParamsOptionsT,
  DEFAULT_SEARCH_PARAMS_OPTIONS,
  PARAMS,
} from '@/config/params.config';
import { parseAsInteger } from 'nuqs';

export const paginationSearchParams = (options?: SearchParamsOptionsT) => {
  const newOptions = { ...DEFAULT_SEARCH_PARAMS_OPTIONS, ...options };
  return {
    [PARAMS.pagination.page]: parseAsInteger
      .withDefault(1)
      .withOptions(newOptions),
    [PARAMS.pagination.pageSize]: parseAsInteger
      .withDefault(20)
      .withOptions(newOptions),
  };
};

export const DEFAULT_PAGE_INDEX = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const PAGINATION_OPTIONS = [0, 5, 10, 20, 50];