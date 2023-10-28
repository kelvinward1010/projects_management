import Avatar from '@/app/components/Avatar';
import { Comment, User } from '@prisma/client';
import { Col, Flex, Row, Typography } from 'antd'
import { formatDistanceToNowStrict } from 'date-fns';
import { useMemo, useState } from 'react';
import { AiFillEdit, AiOutlineDelete, AiOutlineEllipsis } from 'react-icons/ai';
import DeleteModal from './modals/DeleteModal';

const { Title, Text } = Typography;


interface Props {
    user?: User;
    currentUser?: User;
    comment?: Comment;
}

function CommentItem({
    user,
    comment,
    currentUser
}:Props) {

    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);

    const handleOpenModalDelete = () => setIsModalOpenDelete(true);

    const createdAt = useMemo(() => {
        if (!comment?.createdAt) {
            return null;
        }

        return formatDistanceToNowStrict(new Date(comment?.createdAt));
    }, [comment?.createdAt])

    console.log(user)

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
                            onClick={()=>{}}
                        >
                            <AiFillEdit />
                        </button>
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
                    <Col span={24} className='px-28 py-2'>
                        {comment?.content}
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default CommentItem