import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useOtherUsers = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/otherusers`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useOtherUsers;