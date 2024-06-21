import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/utils/supabase';

// Supabase를 통해 태스크를 추가하는 함수
const addTask = async (task) => {
  const { data, error } = await supabase.from('tasks').insert([task]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// 태스크 추가를 위한 커스텀 훅
export const useTaskPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries([]);
    },
  });
};
