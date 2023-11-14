import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useManageddata = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/manageddata`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useManageddata;