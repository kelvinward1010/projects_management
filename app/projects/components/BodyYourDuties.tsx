import useCurrentUser from "@/app/hooks/useCurrentUser";
import { Typography } from "antd";
import TableDutiesStory from "./table/TableDutiesStory";
import TableDutiesTasks from "./table/TableDutiesTasks";
import useProject from "@/app/hooks/useProject";

const { Title } = Typography;

interface Props {
    project?: any;
}


function BodyYourDuties({
    project
}:Props) {
    const currentUser = useCurrentUser().data;
    const {data: dataProject, mutate: mutateProject } = useProject(project?.id);
    return (
        <div>
            <Title level={5}>1. Stories</Title>
            <TableDutiesStory mutate={mutateProject} project={dataProject} currentUser={currentUser}/>

            <Title level={5}>2. Tasks</Title>
            <TableDutiesTasks project={dataProject} currentUser={currentUser}/>
        </div>
    )
}

export default BodyYourDuties