import React, { useEffect } from 'react'
import IssuesItem from './IssuesItem'
import useIssues from '@/app/hooks/useIssues';
import { useRouter } from 'next/navigation';



interface Props {
    task?: any;
    listIssues?: any;
}

function IssuesList({
    task,
    listIssues
}:Props) {
    
    return (
        <div className='overflow-y-auto text-md mt-5' style={{height:'600px'}}>
            {listIssues?.map((issue: any) => (
                <IssuesItem key={issue?.id} issue={issue}/>
            ))}
        </div>
    )
}

export default IssuesList