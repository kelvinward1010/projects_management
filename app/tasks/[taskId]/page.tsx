"use client"
import useTask from "@/app/hooks/useTask"
import HeaderTask from "../components/HeaderTask"
import BodyTask from "../components/BodyTask"
import useCurrentUser from "@/app/hooks/useCurrentUser"



interface Props {
    taskId: string
}

const StoryPage = ({ params }: { params: Props }) => {
    const taskId = params.taskId
    const task = useTask(taskId)
    const currentUser = useCurrentUser()?.data
    return (
        <div>
            <HeaderTask task={task?.data}  />
            <BodyTask task={task?.data} currentUser={currentUser} />
        </div>
    )
}

export default StoryPage