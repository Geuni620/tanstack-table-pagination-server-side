import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';
import { toast } from 'sonner';

import { taskKeys, TASK } from '@/hooks/queryKey';

const deleteTask = async (id: string) => {
  // console.log('id', id);
  // const { data, error } = await supabase.from(TASK).delete().eq('id', id);
  // console.log('error', error);
  // console.log('data', data);

  // if (error) {
  //   throw new Error(error.message);
  // }

  const { data, error } = await supabase.rpc('delete_task', { task_id: id });

  if (error) throw error;

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.message;
};

export const useTaskDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: taskKeys.all });
    //   toast.success('데이터를 삭제하였습니다.');
    // },

    onError: (error) => {
      toast.error(error.message);
    },
  });
};
