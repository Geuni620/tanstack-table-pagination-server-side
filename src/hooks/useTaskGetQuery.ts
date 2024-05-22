import {
  keepPreviousData,
  QueryFunctionContext,
  useQuery,
} from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';

import { supabase } from '@/utils/supabase';

const TASK = 'tasks_rls';

export type TaskProps = {
  date: string;
  done: boolean;
  id: number;
  notes: string;
  statusId: number;
  statusName: string;
  task: string;
};

export type TaskResponse = {
  result: TaskProps[];
  count: number | null;
};

// 총 몇개씩 가져올 것 인지 size
// 검색 조건에 따라 총 몇개의 데이터를 가져오는지 count가 있음
const fetchTask = async ({
  queryKey,
}: QueryFunctionContext<QueryKeyFactory>): Promise<TaskResponse> => {
  const [, { page, size, search }] = queryKey;
  console.log('search', search);

  const start = page * size;
  const end = start + size - 1;

  let query = supabase
    .from(TASK)
    .select('*', {
      count: 'exact',
    })
    .order('id', { ascending: true })
    .range(start, end);

  if (search) {
    query = query.textSearch('task', search);
  }

  const { data, count, error } = await query;

  console.log('data', data);

  if (error) {
    throw new Error(error.message);
  }

  return {
    result: camelcaseKeys(data, { deep: true }),
    count,
  };
};

type props = {
  page: number;
  size: number;
  search: string;
};

type QueryKeyFactory = [string, { page: number; size: number; search: string }];

export const useTaskGetQuery = ({ page, size, search }: props) => {
  return useQuery<TaskResponse, Error, TaskResponse, QueryKeyFactory>({
    queryKey: [TASK, { page, size, search }] as const,
    queryFn: fetchTask,
    placeholderData: keepPreviousData,
  });
};
