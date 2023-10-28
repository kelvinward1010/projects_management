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
    
    return (
        <>
            {reverseArray?.map((comment: Comment) => (
                <CommentItem currentUser={currentUser} comment={comment} key={comment?.id}/>
            ))}
        </>
    )
}

export default CommentList