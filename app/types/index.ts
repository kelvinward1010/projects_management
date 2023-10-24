import { Projects, Tasks, User } from "@prisma/client";


export type FullTaskType = Tasks & {
    creator: User,
    participant: User[],
}

export type FullProjectType = Projects & {
    users: User[],
    tasks: FullTaskType[]
}