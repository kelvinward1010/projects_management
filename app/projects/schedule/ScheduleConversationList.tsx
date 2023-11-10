import ScheduleConversationItem from './ScheduleConversationItem'

interface Props {
    project?: any;
}

function ScheduleConversationList({
    project
}:Props) {

    const listScheduleCovariations = project?.scheduleConversation

    return (
        <div className='px-5 overflow-y-auto h-[700px]'>
            {listScheduleCovariations?.map((schedule: any) => (
                <ScheduleConversationItem key={schedule?.id} schedule={schedule} project={project}/>
            ))}
        </div>
    )
}

export default ScheduleConversationList