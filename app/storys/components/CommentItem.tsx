import Avatar from '@/app/components/Avatar';
import { Comment, User } from '@prisma/client';
import { Col, Dropdown, Flex, Modal, Row, Typography } from 'antd'
import { formatDistanceToNowStrict } from 'date-fns';
import { useMemo, useState } from 'react';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import DeleteModal from './modals/DeleteModal';
import useUser from '@/app/hooks/useUser';
import BodyModalEditComment from './BodyModalEditComment';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import FormReply from './FormReply';
import ReplyItem from './ReplyItem';
import { DashOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;


interface Props {
    currentUser?: User;
    comment?: any;
}

function CommentItem({
    comment,
    currentUser
}:Props) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [isModalOpenEditComment, setIsModalOpenEditComment] = useState(false);
    const [isModalOpenReplyComment, setIsModalOpenReplyComment] = useState(false);
    const [isCheckReplyComment, setIsCheckReplyComment] = useState(false);
    const [openActions, setOpenActions] = useState(false);

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
                toast.success('Story has been updated!')
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
                onClick={()=>setIsModalOpenEditComment(true)}
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
            <DeleteModal
                commentId={comment?.id}
                isOpen={isModalOpenDelete}
                onClose={() => setIsModalOpenDelete(false)}
            />
            <Modal 
                title="Edit comment" 
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
            <div className='w-full py-2'>
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
                                <Text className="text-base font-semibold">{user?.name}</Text>
                                <Text className="text-base underline underline-offset-1">@{user?.name_Id}</Text>
                                <Text className="text-base">{createdAt}</Text>
                            </div>
                        </Flex>
                    </Col>
                    {currentUser?.id === comment?.userId ? (<Col span={2} className='flex justify-center items-center gap-2'>
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
                <Row className='px-28'>
                    <div className='flex flex-start gap-x-3 items-center'>
                        <button 
                            className='
                                w-20
                                h-[25px]
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                rounded-md
                                shadow-lg
                            ' 
                            onClick={() => setIsModalOpenReplyComment(!isModalOpenReplyComment)}
                        >
                            {isModalOpenReplyComment === true ? 'Unreply' : 'Reply'}
                        </button>
                        {comment?.reply?.length !== 0 ? <button 
                            className='
                                w-20
                                h-[25px]
                                bg-sky-700
                                text-white
                                flex
                                items-center
                                justify-center
                                rounded-md
                                shadow-lg
                            ' 
                            onClick={() => setIsCheckReplyComment(!isCheckReplyComment)}
                        >
                            {isCheckReplyComment === true ? 'Uncheck' : 'Check reply'}
                        </button>: null}
                    </div>
                    {isModalOpenReplyComment && 
                        <FormReply
                            comment={comment}
                            currentUser={currentUser}
                            onClose={() => setIsModalOpenReplyComment(false)}
                        />
                    }
                </Row>
                <div className='px-20 mt-5'>
                    {comment?.reply?.length !== 0 && isCheckReplyComment == true ? (
                        <>
                            {comment?.reply?.slice().reverse()?.map((item: any) => (
                                <ReplyItem
                                    key={item?.id}
                                    reply={item}
                                    currentUser={currentUser}
                                />
                            ))}
                        </>
                    ): null}
                </div>
            </div>
        </>
    )
}

export default CommentItem