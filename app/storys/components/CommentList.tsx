import React from 'react'
import CommentItem from './CommentItem'
import { Comment, User } from '@prisma/client';

interface Props {
    currentUser?: User;
    story?: any;
}

function CommentList({
    currentUser,
    story
}:Props) {
    const reverseArray: [] = story?.comments?.slice().reverse();
    
    return (
        <>
            {reverseArray?.map((comment: Comment) => (
                <CommentItem currentUser={currentUser} comment={comment} key={comment?.id}/>
            ))}
        </>
    )
}

export default CommentList