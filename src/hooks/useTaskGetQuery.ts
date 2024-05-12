import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase';

const TASK = 'tasks_rls';
const QUERYKEYS = [TASK];

const fetchTask = async () => {
  const { data, error } = await supabase.from(TASK).select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const useTaskGetQuery = () => {
  return useQuery({
    queryKey: QUERYKEYS,
    queryFn: fetchTask,
  });
};
