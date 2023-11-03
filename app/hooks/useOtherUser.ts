import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullProjectType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (project: FullProjectType | { users: User[] }) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session.data?.user?.email;

        const otherUser = project.users.filter((user) => user.email !== currentUserEmail);

        return otherUser;
    }, [session.data?.user?.email, project.users]);

    return otherUser;
};

export default useOtherUser;