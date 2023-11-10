import React from 'react'
import CommentItem from './CommentItem'
import { Comment, User } from '@prisma/client';

interface Props {
    currentUser?: User;
    task?: any;
}

function CommentList({
    currentUser,
    task
}:Props) {
    const reverseArray: [] = task?.comments?.slice().reverse();
    
    return (
        <>
            {reverseArray?.map((comment: Comment) => (
                <CommentItem currentUser={currentUser} comment={comment} key={comment?.id}/>
            ))}
        </>
    )
}

export default CommentList