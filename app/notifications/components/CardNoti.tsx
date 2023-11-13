"use client"

import useCurrentUser from "@/app/hooks/useCurrentUser";
import useProject from "@/app/hooks/useProject";
import { Notification } from "@prisma/client";
import { Card, Flex, Typography } from "antd";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import { AiOutlineDoubleRight } from "react-icons/ai";

interface Props {
    notification?: Notification;
}

const { Title, Text } = Typography;

function CardNoti({
    notification
}:Props) {

    const router = useRouter();
    const currentUser = useCurrentUser()?.data;
    const {data: dataProject} = useProject(notification?.projectId as string);

    const handleGoToProject = (ev: any) => {
        ev.preventDefault();
        let url = notification?.projectId ? `/projects/${notification?.projectId}` : `/storys/${notification?.storyId}`;
        const checkUserInside = dataProject?.users?.filter((user: any) => currentUser?.id?.includes(user?.id))
        
        if(notification?.projectId === null){
            return toast.error('This was deleted!')
        }else if(checkUserInside?.length === 0){
            return toast.error('You was kicked out this project!');
        }else{
            return router.push(url)
        }
    };

    const FormGotoInside = () => {
        return(
            <AiOutlineDoubleRight 
                className='
                    text-2xl
                    font-medium
                    cursor-pointer
                    text-teal-600
                '
                onClick={(e: any) => handleGoToProject(e)}
            />
        )
    }

    const createdAt = useMemo(() => {
        if (!notification?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(notification?.createdAt));
    }, [notification?.createdAt])

    const TitleCard = () =>{
        

        return (
            <Flex justify={'flex-start'} className="gap-x-2 items-center">
                <Text className="text-lg">{notification?.title}</Text>
                <Text>- {createdAt} ago.</Text>
            </Flex>
        )
    }

    return (
        <>
            <Card
                title={TitleCard()}
                extra={FormGotoInside()}
                className="w-full border-2 border-teal-600"
            >
                <Text>{notification?.descNoti}</Text>
            </Card>
        </>
    )
}

export default CardNoti