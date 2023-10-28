import useSWR from 'swr';

import fetcher from '@/app/libs/fetcher';

const useProject = (projectId: string) => {
  const { data, error, isLoading, mutate } = useSWR(projectId ? `/api/projects/${projectId}` : null, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useProject;