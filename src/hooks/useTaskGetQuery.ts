import { useQuery } from '@tanstack/react-query';
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

const fetchTask = async (): Promise<TaskResponse> => {
  const { data, count, error } = await supabase.from(TASK).select('*', {
    count: 'exact',
  });

  if (error) {
    throw new Error(error.message);
  }

  return {
    result: camelcaseKeys(data, { deep: true }),
    count,
  };
};

export const useTaskGetQuery = () => {
  return useQuery<TaskResponse>({
    queryKey: QUERYKEYS,
    queryFn: fetchTask,
  });
};
