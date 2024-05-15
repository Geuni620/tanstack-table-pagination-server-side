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

const fetchTask = async () => {
  const { data, error } = await supabase.from(TASK).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return camelcaseKeys(data, { deep: true });
};

export const useTaskGetQuery = () => {
  return useQuery<TaskProps[]>({
    queryKey: QUERYKEYS,
    queryFn: fetchTask,
  });
};
