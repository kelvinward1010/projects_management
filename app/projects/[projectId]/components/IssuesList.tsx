import IssuesItem from './IssuesItem'


interface Props {
    task?: any;
    listIssues?: any;
}

function IssuesList({
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