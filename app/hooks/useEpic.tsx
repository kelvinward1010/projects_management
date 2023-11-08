import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useEpic = (epicId: string) => {
  const { data, error, isLoading, mutate } = useSWR(epicId ? `/api/epics/${epicId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useEpic;