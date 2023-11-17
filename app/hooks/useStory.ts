import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useStory = (storyId: string) => {
  const { data, error, isLoading, mutate } = useSWR(storyId ? `/api/storys/${storyId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useStory;