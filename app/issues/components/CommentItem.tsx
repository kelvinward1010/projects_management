import Avatar from '@/app/components/Avatar';
import { Comment, User } from '@prisma/client';
import { Col, Flex, Modal, Row, Typography } from 'antd'
import { formatDistanceToNowStrict } from 'date-fns';
import { useMemo, useState } from 'react';
import { AiFillEdit, AiOutlineDelete, AiOutlineEllipsis } from 'react-icons/ai';
import DeleteModal from './modals/DeleteModal';
import useUser from '@/app/hooks/useUser';
import BodyModalEditComment from './BodyModalEditComment';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useComments from '@/app/hooks/useComments';
import toast from 'react-hot-toast';
import Image from 'next/image';

const { Title, Text } = Typography;


interface Props {
    currentUser?: User;
    comment?: Comment;
}

function CommentItem({
    comment,
    currentUser
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false);

    const getUser = useUser(comment?.userId as string);
    const user = getUser?.data;

    const handleOpenModalDelete = () => setIsModalOpenDelete(true);

    const createdAt = useMemo(() => {
        if (!comment?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(comment?.createdAt));
    }, [comment?.createdAt])

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post(`/api/comments/${comment?.id}`, {
            ...data,
        })
            .then(() => {
                router.refresh();
                setIsModalOpenEditComment(false);
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => {
                setIsLoading(false);
                toast.success('Issues has been updated!')
            });
    }


    return (
        <>
            <DeleteModal
                commentId={comment?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
            />
            <div className='w-full border-2 border-t-teal-600 py-2'>
                <Row justify={'space-between'} className='w-full px-10'>
                    <Col span={19}>
                        <Flex justify={'flex-start'} align={'center'}>
                            {currentUser?.id === comment?.userId ? (
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
                            <div className="flex justify-center gap-2 items-center ml-4">
                                <Text className="text-xl font-semibold">{user?.name}</Text>
                                <Text className="text-xl underline underline-offset-1">@{user?.name_Id}</Text>
                                <Text className="text-xl">{createdAt}</Text>
                            </div>
                        </Flex>
                    </Col>
                    {currentUser?.id === comment?.userId ? (<Col span={2} className='flex justify-center items-center gap-2'>
                        <>
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
                                onClick={()=>setIsModalOpenEditComment(true)}
                            >
                                <AiFillEdit />
                            </button>
                            <Modal 
                                title="Issues Task" 
                                open={isModalOpenEditComment} 
                                onCancel={() => setIsModalOpenEditComment(false)}
                                className="modal-edit"
                                width={1200}
                            >
                                <BodyModalEditComment 
                                    currentUser={currentUser}
                                    onSubmit={onSubmit}
                                    comment={comment}
                                />
                            </Modal>
                        </>
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
                    </Col>) : null}
                </Row>
                <Row>
                    <Col span={24} className='px-28 py-2 text-lg'>
                        {comment?.content}
                    </Col>
                    <div className="my-2 px-28">
                        {comment?.image && <Image
                            width="200"
                            height="150"
                            className="rounded"
                            src={comment?.image}
                            alt="Image Comment"
                        />}
                    </div>
                </Row>
            </div>
        </>
    )
}

export default CommentItem