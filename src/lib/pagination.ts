export type PaginatedDataT<T> = {
  pageData: T[];
  pageCount: number;
  pageStartIndex: number;
  pageEndIndex: number;
};

export const getPaginatedResults = <T>(
  data: T[],
  options: { pageSize: number; page: number; pageStart?: number },
): PaginatedDataT<T> => {
  if (options.pageSize === 0) {
    return {
      pageData: data,
      pageCount: 1,
      pageStartIndex: 1,
      pageEndIndex: data.length,
    };
  }
  
  const { pageSize, page, pageStart = 1 } = options;
  const length = data.length;
  const pageCount = Math.ceil(length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageData = data.slice(start, end);
  const pageStartIndex = (page - 1) * pageSize + 1;
  const pageEndIndex = Math.min(page * pageSize, length);
  return {
    pageData,
    pageCount,
    pageStartIndex,
    pageEndIndex,
  };
};
