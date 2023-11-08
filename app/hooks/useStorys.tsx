import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useStory = (epicId: string) => {
  const { data, error, isLoading, mutate } = useSWR(epicId ? `/api/storys/${epicId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useStory;