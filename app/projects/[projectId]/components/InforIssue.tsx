import useUser from "@/app/hooks/useUser";
import { DatePicker, Flex, Row, Typography } from "antd";
import dayjs from "dayjs";


const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD HH:mm:ss';

interface Props {
    issue?: any;
}

function InforIssue({
    issue
}: Props) {

    const takeDataUserAssign = useUser(issue?.assignto)
    const userAssign = takeDataUserAssign?.data

    const takeDataUserCreate = useUser(issue?.userId)
    const userCreated = takeDataUserCreate?.data

    const createAt = dayjs(issue?.createdAt, dateFormat)

    return (
        <div className="w-full h-72">
            <Row className="w-full h-9 items-center">
                <Text className="font-medium mr-2">Create By User:</Text>
                <Text>{userCreated?.name}</Text>
            </Row>
            <Row className="w-full h-9 items-center">
                <Text className="font-medium mr-2">Create At: {}</Text>
                <DatePicker className="pick-time" showTime defaultValue={createAt} disabled />
            </Row>
            <Row className="w-full h-9 items-center">
                <Text className="font-medium mr-2">Status:</Text>
                <Text>{issue?.status}</Text>
            </Row>
            <Row className="w-full h-9 items-center">
                <Text className="font-medium mr-2">Assigned To:</Text>
                <Text>{userAssign?.name}</Text>
            </Row>
            <Flex align={'flex-start'} justify={'flex-start'} vertical className="w-full h-9">
                <Text className="font-medium">Estimated time for work to be completed:</Text>
                <RangePicker 
                    className="range-time"
                    showTime 
                    defaultValue={
                        [dayjs(issue?.timework[0], dateFormat), dayjs(issue?.timework[1], dateFormat)]
                        || null
                    }
                    format={dateFormat}
                    disabled
                />
            </Flex>
        </div>
    )
}

export default InforIssue