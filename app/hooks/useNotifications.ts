import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useNotifications = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/notifications`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;