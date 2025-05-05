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
