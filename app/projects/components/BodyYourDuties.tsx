import useCurrentUser from "@/app/hooks/useCurrentUser";
import { Typography } from "antd";
import TableDutiesStory from "./table/TableDutiesStory";
import TableDutiesTasks from "./table/TableDutiesTasks";

const { Title } = Typography;

interface Props {
    project?: any;
}


function BodyYourDuties({
    project
}:Props) {
    const currentUser = useCurrentUser().data;
    return (
        <div>
            <Title level={5}>1. Stories</Title>
            <TableDutiesStory project={project} currentUser={currentUser}/>

            <Title level={5}>2. Tasks</Title>
            <TableDutiesTasks project={project} currentUser={currentUser}/>
        </div>
    )
}

export default BodyYourDuties