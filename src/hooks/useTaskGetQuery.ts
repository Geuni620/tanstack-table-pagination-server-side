import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import camelcaseKeys from 'camelcase-keys';

import { supabase } from '@/utils/supabase';

const TASK = 'tasks_rls';
const QUERYKEYS = [TASK];

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
}: QueryFunctionContext<
  [string, { page: number; size: number }]
>): Promise<TaskResponse> => {
  console.log('queryKey', queryKey);
  const [, { page, size }] = queryKey;

  const start = page * size;
  const end = start + size - 1;

  const { data, count, error } = await supabase
    .from(TASK)
    .select('*', {
      count: 'exact',
    })
    .order('id', { ascending: true })
    .range(start, end);

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
};

export const useTaskGetQuery = ({ page, size }: props) => {
  return useQuery<TaskResponse>({
    // FIXME: queryKey 이렇게 구성하는게 맞을까?
    queryKey: [...QUERYKEYS, { page, size }] as const,
    queryFn: fetchTask,
  });
};
