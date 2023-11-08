import { Typography } from "antd";


const { Title, Text } = Typography;

interface Props {
    createdBy?: string;
    createdAt?: string | null;
    title?: string | null;
    projectId?: string | null;
}

function InfoEpic({
    createdAt,
    createdBy,
    title,
    projectId
}:Props) {
  return (
    <>
        <div className='flex gap-2'>
            <Title level={5}>Created By UserId:</Title>
            <Text>{createdBy}</Text>
        </div>
        <div className='flex gap-2'>
            <Title level={5}>Create At:</Title>
            <Text>{createdAt}</Text>
        </div>
        <div className='flex gap-2'>
            <Title level={5}>Title:</Title>
            <Text>{title}</Text>
        </div>
        <div className='flex gap-2'>
            <Title level={5}>Project Id:</Title>
            <Text>{projectId}</Text>
        </div>
    </>
  )
}

export default InfoEpic