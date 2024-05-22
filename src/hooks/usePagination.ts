// import { type PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

export type Pagination = {
  pageIndex: number;
  pageSize: number;
};

export type OnChangeFn<T> = (updaterOrValue: T | ((prevState: T) => T)) => void;

export const usePagination = () => {
  const [pagination, setPagination] = useState<Pagination>({
    pageIndex: 0,
    pageSize: 20,
  });

  const onPageSizeChange = (pageSize: number) => {
    setPagination((prev) => {
      return {
        ...prev,
        pageSize,
      };
    });
  };

  /**
   * @reference
   * https://stackoverflow.com/questions/74721400/tanstack-table-how-can-i-use-redux-action-in-onpaginationchange-instead-of-set
   */
  //   const onPaginationChange: OnChangeFn<PaginationState> = (updaterOrValue) => {
  //     /**
  //      * @Fixme 여기 타입 검토
  //      */
  //     setPagination((prevState) => {
  //       if (typeof updaterOrValue === 'function') {
  //         return (
  //           updaterOrValue as (prevState: PaginationState) => PaginationState
  //         )(prevState);
  //       }

  //       return updaterOrValue;
  //     });
  //   };

  return {
    pagination,
    onPaginationChange: setPagination,
    onPageSizeChange: onPageSizeChange,
  };
};
