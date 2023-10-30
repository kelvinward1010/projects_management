import IssuesItem from './IssuesItem'


interface Props {
    task?: any;
    listIssues?: any;
}

function IssuesList({
    listIssues,
    task
}:Props) {

    const reverseArray: [] = listIssues?.slice().reverse();
    
    return (
        <div className='overflow-y-auto text-md' style={{height:'600px'}}>
            {reverseArray?.map((issue: any) => (
                <IssuesItem task={task} key={issue?.id} issue={issue}/>
            ))}
        </div>
    )
}

export default IssuesList