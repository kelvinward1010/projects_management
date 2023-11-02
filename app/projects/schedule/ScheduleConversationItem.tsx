import Avatar from '@/app/components/Avatar'
import useCurrentUser from '@/app/hooks/useCurrentUser';
import { DashOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Projects } from '@prisma/client'
import { Button, Col, Dropdown, Flex, Row, Typography } from 'antd'
import { useState } from 'react';

interface Props {
    project?: Projects;
}

const {Title, Text} = Typography;

function ScheduleConversationItem({
    project
}:Props) {

    const currentUser = useCurrentUser().data;
    const [openActions, setOpenActions] = useState(false);

    const items = [
        {
          label: <>
            <Button className='text-teal-600 w-full' onClick={() => console.log("Edited")} icon={<EditOutlined />}>
                Edit
            </Button>
          </>,
          key: '0',
        },
        {
          label: <>
            <Button className='text-red-600 w-full' onClick={() => console.log("Deleted")} icon={<DeleteOutlined />}>
                Delete
            </Button>
          </>,
          key: '1',
        },
    ];

    return (
        <div className='w-full h-fit my-2 border-2 border-teal-600 rounded'>
            <Row justify={'space-between'} className='bg-gray-300 rounded-t'>
                <Col span={19} className='p-2'>
                    <Flex justify={'flex-start'} align={'center'}>
                            <Avatar
                                user={currentUser}
                                image={currentUser?.profileImage || currentUser?.image}
                            />
                        <div className="flex justify-center gap-2 items-center ml-4">
                            <Text className="text-xl font-semibold">{currentUser?.name}</Text>
                            <Text className="text-md underline underline-offset-1">@{currentUser?.name_Id}</Text>
                            {/* <Text className="text-xl">{createdAt}</Text> */}
                        </div>
                    </Flex>
                </Col>
                <Col span={2} className='flex justify-center items-center'>
                    <Dropdown
                        menu={{
                        items,
                        }}
                        trigger={['click']}
                    >
                        <DashOutlined 
                            className='text-2xl cursor-pointer'
                            onClick={() => setOpenActions(!openActions)}
                        />
                    </Dropdown>
                </Col>
            </Row>
            <Row className='pl-20'>
                <Text>
                    Use overflow-auto to add scrollbars to an element 
                    in the event that its content overflows the bounds 
                    of that element. Unlike overflow-scroll, which always 
                    shows scrollbars, this utility will only show them if 
                    scrolling is necessary.
                </Text>
            </Row>
        </div>
    )
}

export default ScheduleConversationItem