import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useComments = (isuueId: string) => {
  const { data, error, isLoading, mutate } = useSWR(isuueId ? `/api/issues/${isuueId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useComments;