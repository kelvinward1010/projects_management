import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useTask = (taskId: string) => {
  const { data, error, isLoading, mutate } = useSWR(taskId ? `/api/tasks/${taskId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useTask;