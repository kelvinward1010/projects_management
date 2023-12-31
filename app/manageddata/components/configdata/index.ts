

export const configDataProjects = (arr: any) => {
    const dataEnd = arr?.map((item: any) => {

        return ({
            key: item?.id,
            id: item?.id,
            name_pj: item?.title,
            status: item?.status,
            users: item?.users,
            completionTime: item?.completionTime,
            createdByWho: item?.createdByWho
        })
    }) ?? [];
    return dataEnd;
}

export const configDataEpics = (arr: any) => {
    const dataEnd = arr?.map((item: any) => {

        return ({
            key: item?.id,
            id: item?.id,
            name_ep: item?.title,
            status_ep: item?.status,
            creatorId: item?.creatorId,
            completionTime: item?.completionTime,
        })
    }) ?? [];
    return dataEnd;
}

export const configDataStorys = (arr: any) => {
    const dataEnd = arr?.map((item: any) => {

        return ({
            key: item?.id,
            id: item?.id,
            name_st: item?.title,
            status_st: item?.status,
            desc_st: item?.desc,
            userId_st: item?.userId,
            completionTime: item?.completionTime,
            image_st: item?.image,
            assignto_st: item?.assignto,
            timework_st: item?.timework,
            projectId: item?.projectId
        })
    }) ?? [];
    return dataEnd;
}

export const configDataTasks = (arr: any) => {
    const dataEnd = arr?.map((item: any) => {

        return ({
            key: item?.id,
            id: item?.id,
            name_task: item?.title,
            desc_task: item?.desc,
            status_task: item?.status,
            userId_task: item?.userId,
            completionTime: item?.completionTime,
            image_task: item?.image,
            assignto_task: item?.assignto,
            timework_task: item?.timework,
            projectId: item?.projectId
        })
    }) ?? [];
    return dataEnd;
}

export const configDataNotifications = (arr: any) => {
    const dataEnd = arr?.map((item: any) => {

        return ({
            key: item?.id,
            id: item?.id,
            descNoti: item?.descNoti,
            name_noti: item?.title,
            userId_Noti: item?.whocreatedId,
        })
    }) ?? [];
    return dataEnd;
}

export const configDataComments = (arr: any) => {
    const dataEnd = arr?.map((item: any) => {

        return ({
            key: item?.id,
            id: item?.id,
            content_cmt: item?.content,
            image_cmt: item?.image,
            userId_cmt: item?.userId,
        })
    }) ?? [];
    return dataEnd;
}

export const configDataUsers = (arr: any) => {
    const dataEnd = arr?.map((item: any) => {
        return ({
            key: item?.id,
            id: item?.id,
            name: item?.name,
            name_id: item?.name_Id,
            image: item?.image,
            email: item?.email,
            profileImage: item?.profileImage
        })
    }) ?? [];
    return dataEnd;
}