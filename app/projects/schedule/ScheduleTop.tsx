import { DoubleRightOutlined } from '@ant-design/icons';
import { Projects } from '@prisma/client';
import { Col, Row, Typography } from 'antd'


const {Title, Text} = Typography;

interface Props {
    project?: Projects;
}

function ScheduleTop({
    project
}:Props) {
    return (
        <div className='
            h-fit
            w-full
            border-2
            border-teal-600
            mt-7
            rounded-md
            bg-teal-600
            text-white
            p-2
        '>
            <Row justify={'space-between'}>
                <Col span={11}>
                    <Title style={{color:'white'}} level={4}>Schedule Conversation: {project?.title}</Title>
                </Col>
                <Col span={2} className='flex justify-center items-center'>
                    <DoubleRightOutlined className='text-white text-2xl pr-[18px]'/>
                </Col>
            </Row>
        </div>
    )
}

export default ScheduleTop