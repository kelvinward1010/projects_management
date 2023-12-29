"use client"

import Avatar from "@/app/components/Avatar";
import useUser from "@/app/hooks/useUser";
import { User } from "@prisma/client";
import { Col, Dropdown, Flex, Modal, Row, Typography } from "antd";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import BodyModalEditReply from "./BodyModalEditReply";
import { useRouter } from "next/navigation";
import useTask from "@/app/hooks/useTask";
import { FieldValues, SubmitHandler } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { DashOutlined } from "@ant-design/icons";
import DeleteReply from "./modals/DeleteReply";

const { Text } = Typography;

interface Props {
    reply?: any;
    currentUser?: User;
}

function ReplyItem({
    reply,
    currentUser
}:Props) {

    const router = useRouter();
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEditReply, setIsModalOpenEditReply] = useState(false);
    const user = useUser(reply?.userId as string)?.data;
    const {mutate: mutateCmt} = useTask(reply?.commentId as string);
    const [openActions, setOpenActions] = useState(false);

    const handleOpenModalDelete = () => setIsModalOpenDelete(true);

    const createdAt = useMemo(() => {
        if (!reply?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(reply?.createdAt));
    }, [reply?.createdAt])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        axios.post(`/api/replys/${reply?.id}`, {
            ...data,
        })
            .then(() => {
                mutateCmt();
                router.refresh();
                setIsModalOpenEditReply(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                toast.success('Reply has been updated!')
            });
    }

    const items = [
        {
          label: <>
            <button 
                className='
                    w-20
                    h-9
                    bg-teal-600
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                ' 
                onClick={()=>setIsModalOpenEditReply(true)}
            >
                <AiFillEdit />
            </button>
          </>,
          key: '0',
        },
        {
          label: <>
            <button 
                className='
                    w-20
                    h-9
                    bg-red-600
                    text-white
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    shadow-lg
                ' 
                onClick={handleOpenModalDelete}
            >
                <AiOutlineDelete />
            </button>
          </>,
          key: '1',
        },
    ]

    return (
        <>
            <DeleteReply
                relyId={reply?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
            />
            <Modal
                title="Edit reply" 
                open={isModalOpenEditReply} 
                onCancel={() => setIsModalOpenEditReply(false)}
                className="modal-edit"
                width={1200}
            >
                <BodyModalEditReply
                    currentUser={currentUser}
                    onSubmit={onSubmit}
                    reply={reply}
                />
            </Modal>
            <div className="mt-2">
                <Row justify={'space-between'} className='w-full px-10'>
                    <Col span={19}>
                        <Flex justify={'flex-start'} align={'center'}>
                            {currentUser?.id === reply?.userId ? (
                                <Avatar
                                    user={currentUser as User}
                                    image={currentUser?.profileImage || currentUser?.image}
                                />
                            ) : (
                                <Avatar
                                    user={user as User}
                                    image={user?.profileImage || user?.image}
                                />
                            )}
                            <div className=" ml-4">
                                <div>
                                    <Text className="text-lg font-semibold">{user?.name}</Text>
                                    <Text className="text-lg underline underline-offset-1">@{user?.name_Id}</Text>
                                </div>
                                <Text className="text-lg">{createdAt}</Text>
                            </div>
                        </Flex>
                    </Col>
                    {currentUser?.id === reply?.userId ? (<Col span={2} className='flex justify-center items-center gap-2'>
                        <Dropdown
                            menu={{
                            items,
                            }}
                            trigger={['click']}
                        >
                            <DashOutlined
                                className='
                                    w-12
                                    h-5
                                    bg-sky-700
                                    text-white
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    rounded-md
                                    shadow-lg
                                    text-xl 
                                    cursor-pointer
                                '
                                onClick={() => setOpenActions(!openActions)}
                            />
                        </Dropdown>
                    </Col>) : null}
                </Row>
                <Row>
                    <Col span={24} className='px-28 py-2 text-lg'>
                        {reply?.content}
                    </Col>
                    <div className="my-2 px-28">
                        {reply?.image && <Image
                            width="200"
                            height="150"
                            className="rounded"
                            src={reply?.image}
                            alt="Image Comment"
                        />}
                    </div>
                </Row>   
            </div>
        </>
    )
}

export default ReplyItem