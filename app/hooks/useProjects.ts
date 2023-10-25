import { useParams } from "next/navigation";
import { useMemo } from "react";

const useProject = () => {
    const params = useParams();

    const projectId = useMemo(() => {
        if (!params?.projectId) {
            return '';
        }

        return params.projectId as string;
    }, [params?.projectId]);

    const isOpen = useMemo(() => !!projectId, [projectId]);

    return useMemo(() => ({
        isOpen,
        projectId
    }), [isOpen, projectId]);
};

export default useProject;