import HeaderTask from "../components/HeaderTask"
import BodyTask from "../components/BodyTask"
import getCurrentUser from "@/app/actions/getCurrentUser"
import getTaskById from "@/app/actions/getTaskById"



interface Props {
    taskId: string
}

const TaskPage = async ({ params }: { params: Props }) => {
    const taskId = params.taskId
    const task = await getTaskById(taskId);
    const currentUser = await getCurrentUser();
    return (
        <div>
            <HeaderTask task={task} currentUser={currentUser} />
            <BodyTask task={task} currentUser={currentUser} />
        </div>
    )
}

export default TaskPage