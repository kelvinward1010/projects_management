import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useGetAllProject = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/projects`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useGetAllProject;