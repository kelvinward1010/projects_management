import { Projects, Tasks, User } from "@prisma/client";


export type FullTaskType = Tasks & {
    creator: User,
    participant: User[],
}

export type FullProjectType = Projects & {
    users: User[],
    tasks: FullTaskType[]
}

// Board Type
export type Id = string | number;

export type Column = {
    id: Id;
    title: string;
    contents: Task[]
}

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
};