import React from 'react'
import CommentItem from './CommentItem'
import { Comment, Issues, User } from '@prisma/client';
import useUser from '@/app/hooks/useUser';

interface Props {
    currentUser?: User;
    issue?: any;
}

function CommentList({
    currentUser,
    issue
}:Props) {
    const reverseArray: [] = issue?.comments?.slice().reverse();
    const user = useUser(issue?.userId)
    return (
        <>
            {reverseArray?.map((comment: Comment) => (
                <CommentItem currentUser={currentUser} user={user.data as User} comment={comment} key={comment?.id}/>
            ))}
        </>
    )
}

export default CommentList